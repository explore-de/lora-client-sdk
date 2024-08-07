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
    sessionUrl = '';
    socketUrl = '';
    height = 500;
    onMessage = new EventEmitter();
    messages = [];
    message = '';
    status = ConnectionStatus.DISCONNECTED;
    onMessageListener;
    onStatusListener;
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
            const response = await window.fetch(this.sessionUrl);
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: LoraClient, isStandalone: true, selector: "lora-client", inputs: { sessionUrl: "sessionUrl", socketUrl: "socketUrl", height: "height" }, outputs: { onMessage: "onMessage" }, ngImport: i0, template: `
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
    </div>`, isInline: true, styles: [":host{--background: var(--lora-client__background, #ffffff);--button-main-color: var(--lora-client__button-main-color, #000000);--button-text-color: var(--lora-client__button-text-color,#fff);--button-hover-color: var(--lora-client__button-hover-color,#3f3f3f);--button-active-color: var(--lora-client__button-active-color,#5b5b5b);--message-border-radius: var(--lora-client__message-border-radius, 16px);--message-color-1: var(--lora-client__message-color-1, #efefef);--message-color-2: var(--lora-client__message-color-2, #a6e4e7)}.client__container{display:flex;flex-direction:column;background:var(--background)}.client__container *{box-sizing:border-box}.client__status{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.client__status button{background:var(--button-main-color);color:var(--button-text-color);margin-top:8px;padding:8px;border:none;cursor:pointer}.client__status button:hover{background:var(--button-hover-color)}.client__status button:active{background:var(--button-active-color)}.client__messages{display:block;border:1px solid #dcdcdc;border-bottom:none;height:100%;flex-grow:1;flex-shrink:1;overflow:hidden}.client__input{border:1px solid #dcdcdc;border-top:none;display:flex;flex-direction:row;flex-grow:0;flex-shrink:0}.client__input-message{flex-grow:1;padding:4px}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "component", type: ClientMessageInputComponent, selector: "client-message-input", inputs: ["message"], outputs: ["onMessageChanged", "onEnterPressed"] }, { kind: "component", type: MessageSendComponent, selector: "client-message-send", outputs: ["onClickSend"] }, { kind: "component", type: MessagesComponent, selector: "client-messages", inputs: ["messages"] }, { kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.ShadowDom });
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
    </div>`, encapsulation: ViewEncapsulation.ShadowDom, styles: [":host{--background: var(--lora-client__background, #ffffff);--button-main-color: var(--lora-client__button-main-color, #000000);--button-text-color: var(--lora-client__button-text-color,#fff);--button-hover-color: var(--lora-client__button-hover-color,#3f3f3f);--button-active-color: var(--lora-client__button-active-color,#5b5b5b);--message-border-radius: var(--lora-client__message-border-radius, 16px);--message-color-1: var(--lora-client__message-color-1, #efefef);--message-color-2: var(--lora-client__message-color-2, #a6e4e7)}.client__container{display:flex;flex-direction:column;background:var(--background)}.client__container *{box-sizing:border-box}.client__status{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.client__status button{background:var(--button-main-color);color:var(--button-text-color);margin-top:8px;padding:8px;border:none;cursor:pointer}.client__status button:hover{background:var(--button-hover-color)}.client__status button:active{background:var(--button-active-color)}.client__messages{display:block;border:1px solid #dcdcdc;border-bottom:none;height:100%;flex-grow:1;flex-shrink:1;overflow:hidden}.client__input{border:1px solid #dcdcdc;border-top:none;display:flex;flex-direction:row;flex-grow:0;flex-shrink:0}.client__input-message{flex-grow:1;padding:4px}\n"] }]
        }], ctorParameters: () => [{ type: i1.LoraClientService }], propDecorators: { sessionUrl: [{
                type: Input,
                args: ['sessionUrl']
            }], socketUrl: [{
                type: Input,
                args: ['socketUrl']
            }], height: [{
                type: Input,
                args: ['height']
            }], onMessage: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9yYS1jbGllbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvY2xpZW50L2xvcmEtY2xpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDckQsT0FBTyxFQUFDLGdCQUFnQixFQUFvQixNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBRTVFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDOzs7QUEwQ2pFLE1BQU0sT0FBTyxVQUFVO0lBY0Q7SUFiQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDakIsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUVyQixTQUFTLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDO0lBRXJGLFFBQVEsR0FBb0IsRUFBRSxDQUFDO0lBQy9CLE9BQU8sR0FBVyxFQUFFLENBQUM7SUFDckIsTUFBTSxHQUFHLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUUvQixpQkFBaUIsQ0FBc0Q7SUFDdkUsZ0JBQWdCLENBQXdEO0lBRWhGLFlBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3RELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztRQUMxQyxJQUFJLENBQUM7WUFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBRTlFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDZixPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO2dCQUNyQyxPQUFPO1lBQ1QsQ0FBQztZQUVELE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQztRQUN2QyxDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNwQixDQUFDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQixDQUFDLE9BQWU7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsT0FBc0I7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFckQsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQXdCO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFa0IsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7dUdBakY1QyxVQUFVOzJGQUFWLFVBQVUsNExBcENYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWdDRCxnNENBakNDLFdBQVcsK0JBQTJCLDJCQUEyQix1SUFBRSxvQkFBb0IsMEZBQUUsaUJBQWlCLGtGQUFFLE9BQU8sMkVBQUUsSUFBSTs7MkZBcUN4SCxVQUFVO2tCQXhDdEIsU0FBUzsrQkFDRSxhQUFhLGNBQ1gsSUFBSSxXQUNQLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSwyQkFBMkIsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQzFIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWdDRCxpQkFDTSxpQkFBaUIsQ0FBQyxTQUFTO3NGQUlyQixVQUFVO3NCQUE5QixLQUFLO3VCQUFDLFlBQVk7Z0JBQ0MsU0FBUztzQkFBNUIsS0FBSzt1QkFBQyxXQUFXO2dCQUNBLE1BQU07c0JBQXZCLEtBQUs7dUJBQUMsUUFBUTtnQkFFTCxTQUFTO3NCQUFsQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtOZ0ZvciwgTmdJZiwgTmdTdHlsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtDb25uZWN0aW9uU3RhdHVzLCBMb3JhQ2xpZW50U2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvbG9yYS1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQge01lc3NhZ2VDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2VJbnB1dENvbXBvbmVudH0gZnJvbSBcIi4uL21lc3NhZ2UtaW5wdXQvbWVzc2FnZS1pbnB1dC5jb21wb25lbnRcIjtcbmltcG9ydCB7TWVzc2FnZVNlbmRDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlLXNlbmQvbWVzc2FnZS1zZW5kLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlfSBmcm9tIFwiLi4vLi4vdHlwZXMvQ2xpZW50TWVzc2FnZVwiO1xuaW1wb3J0IHtNZXNzYWdlc0NvbXBvbmVudH0gZnJvbSBcIi4uL21lc3NhZ2VzL21lc3NhZ2VzLmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsb3JhLWNsaWVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtGb3Jtc01vZHVsZSwgTmdGb3IsIE1lc3NhZ2VDb21wb25lbnQsIENsaWVudE1lc3NhZ2VJbnB1dENvbXBvbmVudCwgTWVzc2FnZVNlbmRDb21wb25lbnQsIE1lc3NhZ2VzQ29tcG9uZW50LCBOZ1N0eWxlLCBOZ0lmXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19jb250YWluZXJcIiBbbmdTdHlsZV09XCJ7aGVpZ2h0OmhlaWdodCsncHgnfVwiPlxuXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdHVzID09PSBDb25uZWN0aW9uU3RhdHVzLkNPTk5FQ1RFRFwiPlxuICAgICAgICA8Y2xpZW50LW1lc3NhZ2VzIGNsYXNzPVwiY2xpZW50X19tZXNzYWdlc1wiIFttZXNzYWdlc109XCJtZXNzYWdlc1wiLz5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19pbnB1dFwiPlxuICAgICAgICAgIDxjbGllbnQtbWVzc2FnZS1pbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJjbGllbnRfX2lucHV0LW1lc3NhZ2VcIlxuICAgICAgICAgICAgW21lc3NhZ2VdPVwibWVzc2FnZVwiXG4gICAgICAgICAgICAob25NZXNzYWdlQ2hhbmdlZCk9XCJvbk1lc3NhZ2VDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgKG9uRW50ZXJQcmVzc2VkKT1cIm9uRW50ZXJQcmVzc2VkKClcIlxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8Y2xpZW50LW1lc3NhZ2Utc2VuZCBjbGFzcz1cImNsaWVudF9faW5wdXQtc3VibWl0XCIgKG9uQ2xpY2tTZW5kKT1cInNlbmRNZXNzYWdlKClcIi8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdHVzPT09Q29ubmVjdGlvblN0YXR1cy5ESVNDT05ORUNURURcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9fc3RhdHVzXCI+RGlzY29ubmVjdGVkPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXM9PT1Db25uZWN0aW9uU3RhdHVzLkNPTk5FQ1RJTkdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9fc3RhdHVzXCI+Q29ubmVjdGluZy4uLjwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdHVzPT09Q29ubmVjdGlvblN0YXR1cy5FUlJPUlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19zdGF0dXNcIj5cbiAgICAgICAgICA8ZGl2PkNvbm5lY3Rpb24gRmFpbGVkPC9kaXY+XG4gICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwib25DbGlja1JlY29ubmVjdCgpXCI+VHJ5IGFnYWluPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+YCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tLFxuICBzdHlsZVVybHM6IFsnLi9sb3JhLWNsaWVudC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIExvcmFDbGllbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgnc2Vzc2lvblVybCcpIHNlc3Npb25VcmwgPSAnJztcbiAgQElucHV0KCdzb2NrZXRVcmwnKSBzb2NrZXRVcmwgPSAnJztcbiAgQElucHV0KCdoZWlnaHQnLCkgaGVpZ2h0ID0gNTAwO1xuXG4gIEBPdXRwdXQoKSBvbk1lc3NhZ2U6IEV2ZW50RW1pdHRlcjxDbGllbnRNZXNzYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xpZW50TWVzc2FnZT4oKTtcblxuICBtZXNzYWdlczogQ2xpZW50TWVzc2FnZVtdID0gW107XG4gIG1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuICBzdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLkRJU0NPTk5FQ1RFRDtcblxuICBwcml2YXRlIG9uTWVzc2FnZUxpc3RlbmVyOiBPbWl0VGhpc1BhcmFtZXRlcjwobWVzc2FnZTogQ2xpZW50TWVzc2FnZSkgPT4gdm9pZD47XG4gIHByaXZhdGUgb25TdGF0dXNMaXN0ZW5lcjogT21pdFRoaXNQYXJhbWV0ZXI8KHN0YXR1czogQ29ubmVjdGlvblN0YXR1cykgPT4gdm9pZD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsb3JhQ2xpZW50U2VydmljZTogTG9yYUNsaWVudFNlcnZpY2UpIHtcbiAgICB0aGlzLm9uTWVzc2FnZUxpc3RlbmVyID0gdGhpcy5vbk1lc3NhZ2VSZWNlaXZlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25TdGF0dXNMaXN0ZW5lciA9IHRoaXMub25TdGF0dXMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9uKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5vbignc3RhdHVzJywgdGhpcy5vblN0YXR1c0xpc3RlbmVyKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29ubmVjdCgpLnRoZW4oKTtcbiAgfVxuXG4gIGFzeW5jIGNvbm5lY3QoKSB7XG4gICAgdGhpcy5zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLkNPTk5FQ1RJTkc7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgd2luZG93LmZldGNoKHRoaXMuc2Vzc2lvblVybCk7XG4gICAgICBjb25zdCBzZXNzaW9uSWQgPSByZXNwb25zZS5zdGF0dXMgPT09IDIwMCA/IGF3YWl0IHJlc3BvbnNlLnRleHQoKSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKCFzZXNzaW9uSWQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZWNlaXZlIHNlc3Npb24gaWRcIik7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5FUlJPUjtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmNvbm5lY3QodGhpcy5zb2NrZXRVcmwsIHNlc3Npb25JZCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5FUlJPUjtcbiAgICB9XG4gIH1cblxuICBzZW5kTWVzc2FnZSgpIHtcbiAgICBpZiAodGhpcy5tZXNzYWdlLnRyaW0oKSkge1xuICAgICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5zZW5kTWVzc2FnZSh0aGlzLm1lc3NhZ2UpO1xuICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgb25NZXNzYWdlQ2hhbmdlZChtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB9XG5cbiAgb25FbnRlclByZXNzZWQoKSB7XG4gICAgdGhpcy5zZW5kTWVzc2FnZSgpO1xuICB9XG5cbiAgb25DbGlja1JlY29ubmVjdCgpIHtcbiAgICB0aGlzLmNvbm5lY3QoKS50aGVuKCk7XG4gIH1cblxuICBvbk1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlOiBDbGllbnRNZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IHRoaXMubG9yYUNsaWVudFNlcnZpY2UuZ2V0TWVzc2FnZXMoKTtcblxuICAgIGlmIChtZXNzYWdlLnVzZXIgIT09ICdtZScpIHtcbiAgICAgIHRoaXMub25NZXNzYWdlLmVtaXQobWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgb25TdGF0dXMoc3RhdHVzOiBDb25uZWN0aW9uU3RhdHVzKSB7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9mZignbWVzc2FnZScsIHRoaXMub25NZXNzYWdlTGlzdGVuZXIpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub2ZmKCdzdGF0dXMnLCB0aGlzLm9uU3RhdHVzTGlzdGVuZXIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IENvbm5lY3Rpb25TdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzO1xufVxuIl19