import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf, NgStyle } from "@angular/common";
import { ConnectionStatus } from '../../services/lora-client.service';
import { MessageComponent } from "../message/message.component";
import { ClientMessageInputComponent } from "../message-input/message-input.component";
import { MessageSendComponent } from "../message-send/message-send.component";
import { MessagesComponent } from "../messages/messages.component";
import * as i0 from "@angular/core";
import * as i1 from "../../services/lora-client.service";
export class LoraClient {
    loraClientService;
    token = '';
    height = 500;
    onMessage = new EventEmitter();
    messages = [];
    message = '';
    status = ConnectionStatus.DISCONNECTED;
    onMessageListener;
    onStatusListener;
    sessionUrl = 'https://feynsinn.explore.de/lora-minirag/session';
    socketUrl = 'wss://feynsinn.explore.de/lora-minirag/ws';
    constructor(loraClientService) {
        this.loraClientService = loraClientService;
        this.onMessageListener = this.onMessageReceived.bind(this);
        this.onStatusListener = this.onStatus.bind(this);
        this.loraClientService.on('message', this.onMessageListener);
        this.loraClientService.on('status', this.onStatusListener);
    }
    ngOnInit() {
        this.connect().then();
    }
    async connect() {
        this.status = ConnectionStatus.CONNECTING;
        try {
            const response = await window.fetch(this.sessionUrl, {
                headers: {
                    'x-api-token': this.token
                }
            });
            const sessionId = response.status === 200 ? await response.text() : undefined;
            if (!sessionId) {
                console.error("Failed to receive session id");
                this.status = ConnectionStatus.ERROR;
                return;
            }
            await this.loraClientService.connect(this.socketUrl, sessionId);
        }
        catch (e) {
            console.error(e);
            this.status = ConnectionStatus.ERROR;
        }
    }
    sendMessage() {
        if (this.message.trim()) {
            this.loraClientService.sendMessage(this.message);
            this.message = '';
        }
    }
    onMessageChanged(message) {
        this.message = message;
    }
    onEnterPressed() {
        this.sendMessage();
    }
    onClickReconnect() {
        this.connect().then();
    }
    onMessageReceived(message) {
        this.messages = this.loraClientService.getMessages();
        if (message.user !== 'me') {
            this.onMessage.emit(message);
        }
    }
    onStatus(status) {
        this.status = status;
    }
    ngOnDestroy() {
        this.loraClientService.disconnect();
        this.loraClientService.off('message', this.onMessageListener);
        this.loraClientService.off('status', this.onStatusListener);
    }
    ConnectionStatus = ConnectionStatus;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: LoraClient, deps: [{ token: i1.LoraClientService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: LoraClient, isStandalone: true, selector: "lora-client", inputs: { token: "token", height: "height" }, outputs: { onMessage: "onMessage" }, ngImport: i0, template: `
    <div class="client__container" [ngStyle]="{height:height+'px'}">

      <ng-container *ngIf="status === ConnectionStatus.CONNECTED">
        <client-messages class="client__messages" [messages]="messages"/>

        <div class="client__input">
          <client-message-input
            class="client__input-message"
            [message]="message"
            (onMessageChanged)="onMessageChanged($event)"
            (onEnterPressed)="onEnterPressed()"
          />

          <client-message-send class="client__input-submit" (onClickSend)="sendMessage()"/>
        </div>
      </ng-container>
      <ng-container *ngIf="status===ConnectionStatus.DISCONNECTED">
        <div class="client__status">Disconnected</div>
      </ng-container>
      <ng-container *ngIf="status===ConnectionStatus.CONNECTING">
        <div class="client__status">Connecting...</div>
      </ng-container>
      <ng-container *ngIf="status===ConnectionStatus.ERROR">
        <div class="client__status">
          <div>Connection Failed</div>
          <div>

            <button (click)="onClickReconnect()">Try again</button>
          </div>
        </div>
      </ng-container>
    </div>`, isInline: true, styles: [":host{--background: var(--lora-client__background, transparent);--button-main-color: var(--lora-client__button-main-color, #000000);--button-text-color: var(--lora-client__button-text-color,#fff);--button-hover-color: var(--lora-client__button-hover-color,#3f3f3f);--button-active-color: var(--lora-client__button-active-color,#5b5b5b);--message-border-radius: var(--lora-client__message-border-radius, 16px);--message-color-1: var(--lora-client__message-color-1, #efefef);--message-color-2: var(--lora-client__message-color-2, #a6e4e7)}.client__container{display:flex;flex-direction:column;background:var(--background)}.client__container *{box-sizing:border-box}.client__status{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.client__status button{background:var(--button-main-color);color:var(--button-text-color);margin-top:8px;padding:8px;border:none;cursor:pointer}.client__status button:hover{background:var(--button-hover-color)}.client__status button:active{background:var(--button-active-color)}.client__messages{display:block;border:1px solid #dcdcdc;border-bottom:none;height:100%;flex-grow:1;flex-shrink:1;overflow:hidden}.client__input{border:1px solid #dcdcdc;border-top:none;display:flex;flex-direction:row;flex-grow:0;flex-shrink:0}.client__input-message{flex-grow:1;padding:4px}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "component", type: ClientMessageInputComponent, selector: "client-message-input", inputs: ["message"], outputs: ["onMessageChanged", "onEnterPressed"] }, { kind: "component", type: MessageSendComponent, selector: "client-message-send", outputs: ["onClickSend"] }, { kind: "component", type: MessagesComponent, selector: "client-messages", inputs: ["messages"] }, { kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.ShadowDom });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: LoraClient, decorators: [{
            type: Component,
            args: [{ selector: 'lora-client', standalone: true, imports: [FormsModule, NgFor, MessageComponent, ClientMessageInputComponent, MessageSendComponent, MessagesComponent, NgStyle, NgIf], template: `
    <div class="client__container" [ngStyle]="{height:height+'px'}">

      <ng-container *ngIf="status === ConnectionStatus.CONNECTED">
        <client-messages class="client__messages" [messages]="messages"/>

        <div class="client__input">
          <client-message-input
            class="client__input-message"
            [message]="message"
            (onMessageChanged)="onMessageChanged($event)"
            (onEnterPressed)="onEnterPressed()"
          />

          <client-message-send class="client__input-submit" (onClickSend)="sendMessage()"/>
        </div>
      </ng-container>
      <ng-container *ngIf="status===ConnectionStatus.DISCONNECTED">
        <div class="client__status">Disconnected</div>
      </ng-container>
      <ng-container *ngIf="status===ConnectionStatus.CONNECTING">
        <div class="client__status">Connecting...</div>
      </ng-container>
      <ng-container *ngIf="status===ConnectionStatus.ERROR">
        <div class="client__status">
          <div>Connection Failed</div>
          <div>

            <button (click)="onClickReconnect()">Try again</button>
          </div>
        </div>
      </ng-container>
    </div>`, encapsulation: ViewEncapsulation.ShadowDom, styles: [":host{--background: var(--lora-client__background, transparent);--button-main-color: var(--lora-client__button-main-color, #000000);--button-text-color: var(--lora-client__button-text-color,#fff);--button-hover-color: var(--lora-client__button-hover-color,#3f3f3f);--button-active-color: var(--lora-client__button-active-color,#5b5b5b);--message-border-radius: var(--lora-client__message-border-radius, 16px);--message-color-1: var(--lora-client__message-color-1, #efefef);--message-color-2: var(--lora-client__message-color-2, #a6e4e7)}.client__container{display:flex;flex-direction:column;background:var(--background)}.client__container *{box-sizing:border-box}.client__status{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.client__status button{background:var(--button-main-color);color:var(--button-text-color);margin-top:8px;padding:8px;border:none;cursor:pointer}.client__status button:hover{background:var(--button-hover-color)}.client__status button:active{background:var(--button-active-color)}.client__messages{display:block;border:1px solid #dcdcdc;border-bottom:none;height:100%;flex-grow:1;flex-shrink:1;overflow:hidden}.client__input{border:1px solid #dcdcdc;border-top:none;display:flex;flex-direction:row;flex-grow:0;flex-shrink:0}.client__input-message{flex-grow:1;padding:4px}\n"] }]
        }], ctorParameters: () => [{ type: i1.LoraClientService }], propDecorators: { token: [{
                type: Input,
                args: ['token']
            }], height: [{
                type: Input,
                args: ['height']
            }], onMessage: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9yYS1jbGllbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvY2xpZW50L2xvcmEtY2xpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDckQsT0FBTyxFQUFDLGdCQUFnQixFQUFvQixNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBRTVFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDOzs7QUEwQ2pFLE1BQU0sT0FBTyxVQUFVO0lBZUQ7SUFkSixLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ1QsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUVyQixTQUFTLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDO0lBRXJGLFFBQVEsR0FBb0IsRUFBRSxDQUFDO0lBQy9CLE9BQU8sR0FBVyxFQUFFLENBQUM7SUFDckIsTUFBTSxHQUFHLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUUvQixpQkFBaUIsQ0FBc0Q7SUFDdkUsZ0JBQWdCLENBQXdEO0lBQ3hFLFVBQVUsR0FBRyxrREFBa0QsQ0FBQztJQUNoRSxTQUFTLEdBQUcsMkNBQTJDLENBQUM7SUFFaEUsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDdEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTztRQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO1FBQzFDLElBQUksQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNuRCxPQUFPLEVBQUU7b0JBQ1AsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLO2lCQUMxQjthQUNGLENBQUMsQ0FBQztZQUNILE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBRTlFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDZixPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO2dCQUNyQyxPQUFPO1lBQ1QsQ0FBQztZQUVELE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQztRQUN2QyxDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNwQixDQUFDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQixDQUFDLE9BQWU7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsT0FBc0I7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFckQsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQXdCO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFa0IsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7dUdBdEY1QyxVQUFVOzJGQUFWLFVBQVUsMEpBcENYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWdDRCxvNENBakNDLFdBQVcsK0JBQTJCLDJCQUEyQix1SUFBRSxvQkFBb0IsMEZBQUUsaUJBQWlCLGtGQUFFLE9BQU8sMkVBQUUsSUFBSTs7MkZBcUN4SCxVQUFVO2tCQXhDdEIsU0FBUzsrQkFDRSxhQUFhLGNBQ1gsSUFBSSxXQUNQLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSwyQkFBMkIsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQzFIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWdDRCxpQkFDTSxpQkFBaUIsQ0FBQyxTQUFTO3NGQUkxQixLQUFLO3NCQUFwQixLQUFLO3VCQUFDLE9BQU87Z0JBQ0ksTUFBTTtzQkFBdkIsS0FBSzt1QkFBQyxRQUFRO2dCQUVMLFNBQVM7c0JBQWxCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge05nRm9yLCBOZ0lmLCBOZ1N0eWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0Nvbm5lY3Rpb25TdGF0dXMsIExvcmFDbGllbnRTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9sb3JhLWNsaWVudC5zZXJ2aWNlJztcbmltcG9ydCB7TWVzc2FnZUNvbXBvbmVudH0gZnJvbSBcIi4uL21lc3NhZ2UvbWVzc2FnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2xpZW50TWVzc2FnZUlucHV0Q29tcG9uZW50fSBmcm9tIFwiLi4vbWVzc2FnZS1pbnB1dC9tZXNzYWdlLWlucHV0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNZXNzYWdlU2VuZENvbXBvbmVudH0gZnJvbSBcIi4uL21lc3NhZ2Utc2VuZC9tZXNzYWdlLXNlbmQuY29tcG9uZW50XCI7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2V9IGZyb20gXCIuLi8uLi90eXBlcy9DbGllbnRNZXNzYWdlXCI7XG5pbXBvcnQge01lc3NhZ2VzQ29tcG9uZW50fSBmcm9tIFwiLi4vbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xvcmEtY2xpZW50JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0Zvcm1zTW9kdWxlLCBOZ0ZvciwgTWVzc2FnZUNvbXBvbmVudCwgQ2xpZW50TWVzc2FnZUlucHV0Q29tcG9uZW50LCBNZXNzYWdlU2VuZENvbXBvbmVudCwgTWVzc2FnZXNDb21wb25lbnQsIE5nU3R5bGUsIE5nSWZdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX2NvbnRhaW5lclwiIFtuZ1N0eWxlXT1cIntoZWlnaHQ6aGVpZ2h0KydweCd9XCI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXMgPT09IENvbm5lY3Rpb25TdGF0dXMuQ09OTkVDVEVEXCI+XG4gICAgICAgIDxjbGllbnQtbWVzc2FnZXMgY2xhc3M9XCJjbGllbnRfX21lc3NhZ2VzXCIgW21lc3NhZ2VzXT1cIm1lc3NhZ2VzXCIvPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX2lucHV0XCI+XG4gICAgICAgICAgPGNsaWVudC1tZXNzYWdlLWlucHV0XG4gICAgICAgICAgICBjbGFzcz1cImNsaWVudF9faW5wdXQtbWVzc2FnZVwiXG4gICAgICAgICAgICBbbWVzc2FnZV09XCJtZXNzYWdlXCJcbiAgICAgICAgICAgIChvbk1lc3NhZ2VDaGFuZ2VkKT1cIm9uTWVzc2FnZUNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAob25FbnRlclByZXNzZWQpPVwib25FbnRlclByZXNzZWQoKVwiXG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxjbGllbnQtbWVzc2FnZS1zZW5kIGNsYXNzPVwiY2xpZW50X19pbnB1dC1zdWJtaXRcIiAob25DbGlja1NlbmQpPVwic2VuZE1lc3NhZ2UoKVwiLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXM9PT1Db25uZWN0aW9uU3RhdHVzLkRJU0NPTk5FQ1RFRFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19zdGF0dXNcIj5EaXNjb25uZWN0ZWQ8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cz09PUNvbm5lY3Rpb25TdGF0dXMuQ09OTkVDVElOR1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19zdGF0dXNcIj5Db25uZWN0aW5nLi4uPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXM9PT1Db25uZWN0aW9uU3RhdHVzLkVSUk9SXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPlxuICAgICAgICAgIDxkaXY+Q29ubmVjdGlvbiBGYWlsZWQ8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJvbkNsaWNrUmVjb25uZWN0KClcIj5UcnkgYWdhaW48L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5gLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb20sXG4gIHN0eWxlVXJsczogWycuL2xvcmEtY2xpZW50LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTG9yYUNsaWVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCd0b2tlbicpIHRva2VuID0gJyc7XG4gIEBJbnB1dCgnaGVpZ2h0JywpIGhlaWdodCA9IDUwMDtcblxuICBAT3V0cHV0KCkgb25NZXNzYWdlOiBFdmVudEVtaXR0ZXI8Q2xpZW50TWVzc2FnZT4gPSBuZXcgRXZlbnRFbWl0dGVyPENsaWVudE1lc3NhZ2U+KCk7XG5cbiAgbWVzc2FnZXM6IENsaWVudE1lc3NhZ2VbXSA9IFtdO1xuICBtZXNzYWdlOiBzdHJpbmcgPSAnJztcbiAgc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5ESVNDT05ORUNURUQ7XG5cbiAgcHJpdmF0ZSBvbk1lc3NhZ2VMaXN0ZW5lcjogT21pdFRoaXNQYXJhbWV0ZXI8KG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpID0+IHZvaWQ+O1xuICBwcml2YXRlIG9uU3RhdHVzTGlzdGVuZXI6IE9taXRUaGlzUGFyYW1ldGVyPChzdGF0dXM6IENvbm5lY3Rpb25TdGF0dXMpID0+IHZvaWQ+O1xuICBwcml2YXRlIHNlc3Npb25VcmwgPSAnaHR0cHM6Ly9mZXluc2lubi5leHBsb3JlLmRlL2xvcmEtbWluaXJhZy9zZXNzaW9uJztcbiAgcHJpdmF0ZSBzb2NrZXRVcmwgPSAnd3NzOi8vZmV5bnNpbm4uZXhwbG9yZS5kZS9sb3JhLW1pbmlyYWcvd3MnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9yYUNsaWVudFNlcnZpY2U6IExvcmFDbGllbnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lciA9IHRoaXMub25NZXNzYWdlUmVjZWl2ZWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uU3RhdHVzTGlzdGVuZXIgPSB0aGlzLm9uU3RhdHVzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5vbignbWVzc2FnZScsIHRoaXMub25NZXNzYWdlTGlzdGVuZXIpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub24oJ3N0YXR1cycsIHRoaXMub25TdGF0dXNMaXN0ZW5lcik7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbm5lY3QoKS50aGVuKCk7XG4gIH1cblxuICBhc3luYyBjb25uZWN0KCkge1xuICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5DT05ORUNUSU5HO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHdpbmRvdy5mZXRjaCh0aGlzLnNlc3Npb25VcmwsIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICd4LWFwaS10b2tlbic6IHRoaXMudG9rZW5cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb25zdCBzZXNzaW9uSWQgPSByZXNwb25zZS5zdGF0dXMgPT09IDIwMCA/IGF3YWl0IHJlc3BvbnNlLnRleHQoKSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKCFzZXNzaW9uSWQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZWNlaXZlIHNlc3Npb24gaWRcIik7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5FUlJPUjtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmNvbm5lY3QodGhpcy5zb2NrZXRVcmwsIHNlc3Npb25JZCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5FUlJPUjtcbiAgICB9XG4gIH1cblxuICBzZW5kTWVzc2FnZSgpIHtcbiAgICBpZiAodGhpcy5tZXNzYWdlLnRyaW0oKSkge1xuICAgICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5zZW5kTWVzc2FnZSh0aGlzLm1lc3NhZ2UpO1xuICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgb25NZXNzYWdlQ2hhbmdlZChtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB9XG5cbiAgb25FbnRlclByZXNzZWQoKSB7XG4gICAgdGhpcy5zZW5kTWVzc2FnZSgpO1xuICB9XG5cbiAgb25DbGlja1JlY29ubmVjdCgpIHtcbiAgICB0aGlzLmNvbm5lY3QoKS50aGVuKCk7XG4gIH1cblxuICBvbk1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlOiBDbGllbnRNZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IHRoaXMubG9yYUNsaWVudFNlcnZpY2UuZ2V0TWVzc2FnZXMoKTtcblxuICAgIGlmIChtZXNzYWdlLnVzZXIgIT09ICdtZScpIHtcbiAgICAgIHRoaXMub25NZXNzYWdlLmVtaXQobWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgb25TdGF0dXMoc3RhdHVzOiBDb25uZWN0aW9uU3RhdHVzKSB7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9mZignbWVzc2FnZScsIHRoaXMub25NZXNzYWdlTGlzdGVuZXIpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub2ZmKCdzdGF0dXMnLCB0aGlzLm9uU3RhdHVzTGlzdGVuZXIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IENvbm5lY3Rpb25TdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzO1xufVxuIl19