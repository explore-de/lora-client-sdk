import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf, NgStyle } from "@angular/common";
import { ConnectionStatus, LoraClientService } from '../../services/lora-client.service';
import { MessageComponent } from "../message/message.component";
import { ClientMessageInputComponent } from "../message-input/message-input.component";
import { MessageSendComponent } from "../message-send/message-send.component";
import { MessagesComponent } from "../messages/messages.component";
import * as i0 from "@angular/core";
export class LoraClient {
    token = '';
    height = 500;
    onMessage = new EventEmitter();
    messages = [];
    message = '';
    status = ConnectionStatus.DISCONNECTED;
    onMessageListener;
    onStatusListener;
    loraClientService;
    constructor() {
        this.loraClientService = new LoraClientService();
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
            const sessionId = localStorage.getItem('LORA_CLIENT_SESSION_ID') || await this.loraClientService.createSession(this.token);
            if (!sessionId) {
                console.error("Failed to receive session id");
                this.status = ConnectionStatus.ERROR;
                return;
            }
            await this.loraClientService.connect({ sessionId, loadHistory: true });
            localStorage.setItem('LORA_CLIENT_SESSION_ID', sessionId);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: LoraClient, deps: [], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: () => [], propDecorators: { token: [{
                type: Input,
                args: ['token']
            }], height: [{
                type: Input,
                args: ['height']
            }], onMessage: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9yYS1jbGllbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvY2xpZW50L2xvcmEtY2xpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDckQsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDdkYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDckYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFFNUUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7O0FBMENqRSxNQUFNLE9BQU8sVUFBVTtJQUNMLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDVixNQUFNLEdBQUcsR0FBRyxDQUFDO0lBRXBCLFNBQVMsR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFFckYsUUFBUSxHQUFvQixFQUFFLENBQUM7SUFDL0IsT0FBTyxHQUFXLEVBQUUsQ0FBQztJQUNyQixNQUFNLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBRS9CLGlCQUFpQixDQUFzRDtJQUN2RSxnQkFBZ0IsQ0FBd0Q7SUFDeEUsaUJBQWlCLENBQW9CO0lBRTdDO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksaUJBQWlC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LGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVrQixnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQzt1R0FuRjVDLFVBQVU7MkZBQVYsVUFBVSwwSkFwQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBZ0NELG80Q0FqQ0MsV0FBVywrQkFBMkIsMkJBQTJCLHVJQUFFLG9CQUFvQiwwRkFBRSxpQkFBaUIsa0ZBQUUsT0FBTywyRUFBRSxJQUFJOzsyRkFxQ3hILFVBQVU7a0JBeEN0QixTQUFTOytCQUNFLGFBQWEsY0FDWCxJQUFJLFdBQ1AsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLDJCQUEyQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFDMUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBZ0NELGlCQUNNLGlCQUFpQixDQUFDLFNBQVM7d0RBSTFCLEtBQUs7c0JBQXBCLEtBQUs7dUJBQUMsT0FBTztnQkFDRyxNQUFNO3NCQUF0QixLQUFLO3VCQUFDLFFBQVE7Z0JBRUwsU0FBUztzQkFBbEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7TmdGb3IsIE5nSWYsIE5nU3R5bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7Q29ubmVjdGlvblN0YXR1cywgTG9yYUNsaWVudFNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xvcmEtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHtNZXNzYWdlQ29tcG9uZW50fSBmcm9tIFwiLi4vbWVzc2FnZS9tZXNzYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlLWlucHV0L21lc3NhZ2UtaW5wdXQuY29tcG9uZW50XCI7XG5pbXBvcnQge01lc3NhZ2VTZW5kQ29tcG9uZW50fSBmcm9tIFwiLi4vbWVzc2FnZS1zZW5kL21lc3NhZ2Utc2VuZC5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2xpZW50TWVzc2FnZX0gZnJvbSBcIi4uLy4uL3R5cGVzL0NsaWVudE1lc3NhZ2VcIjtcbmltcG9ydCB7TWVzc2FnZXNDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlcy9tZXNzYWdlcy5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbG9yYS1jbGllbnQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbRm9ybXNNb2R1bGUsIE5nRm9yLCBNZXNzYWdlQ29tcG9uZW50LCBDbGllbnRNZXNzYWdlSW5wdXRDb21wb25lbnQsIE1lc3NhZ2VTZW5kQ29tcG9uZW50LCBNZXNzYWdlc0NvbXBvbmVudCwgTmdTdHlsZSwgTmdJZl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNsaWVudF9fY29udGFpbmVyXCIgW25nU3R5bGVdPVwie2hlaWdodDpoZWlnaHQrJ3B4J31cIj5cblxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cyA9PT0gQ29ubmVjdGlvblN0YXR1cy5DT05ORUNURURcIj5cbiAgICAgICAgPGNsaWVudC1tZXNzYWdlcyBjbGFzcz1cImNsaWVudF9fbWVzc2FnZXNcIiBbbWVzc2FnZXNdPVwibWVzc2FnZXNcIi8+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9faW5wdXRcIj5cbiAgICAgICAgICA8Y2xpZW50LW1lc3NhZ2UtaW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwiY2xpZW50X19pbnB1dC1tZXNzYWdlXCJcbiAgICAgICAgICAgIFttZXNzYWdlXT1cIm1lc3NhZ2VcIlxuICAgICAgICAgICAgKG9uTWVzc2FnZUNoYW5nZWQpPVwib25NZXNzYWdlQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChvbkVudGVyUHJlc3NlZCk9XCJvbkVudGVyUHJlc3NlZCgpXCJcbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPGNsaWVudC1tZXNzYWdlLXNlbmQgY2xhc3M9XCJjbGllbnRfX2lucHV0LXN1Ym1pdFwiIChvbkNsaWNrU2VuZCk9XCJzZW5kTWVzc2FnZSgpXCIvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cz09PUNvbm5lY3Rpb25TdGF0dXMuRElTQ09OTkVDVEVEXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPkRpc2Nvbm5lY3RlZDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdHVzPT09Q29ubmVjdGlvblN0YXR1cy5DT05ORUNUSU5HXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPkNvbm5lY3RpbmcuLi48L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cz09PUNvbm5lY3Rpb25TdGF0dXMuRVJST1JcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9fc3RhdHVzXCI+XG4gICAgICAgICAgPGRpdj5Db25uZWN0aW9uIEZhaWxlZDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cIm9uQ2xpY2tSZWNvbm5lY3QoKVwiPlRyeSBhZ2FpbjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PmAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbSxcbiAgc3R5bGVVcmxzOiBbJy4vbG9yYS1jbGllbnQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMb3JhQ2xpZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ3Rva2VuJykgdG9rZW4gPSAnJztcbiAgQElucHV0KCdoZWlnaHQnKSBoZWlnaHQgPSA1MDA7XG5cbiAgQE91dHB1dCgpIG9uTWVzc2FnZTogRXZlbnRFbWl0dGVyPENsaWVudE1lc3NhZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxDbGllbnRNZXNzYWdlPigpO1xuXG4gIG1lc3NhZ2VzOiBDbGllbnRNZXNzYWdlW10gPSBbXTtcbiAgbWVzc2FnZTogc3RyaW5nID0gJyc7XG4gIHN0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXMuRElTQ09OTkVDVEVEO1xuXG4gIHByaXZhdGUgb25NZXNzYWdlTGlzdGVuZXI6IE9taXRUaGlzUGFyYW1ldGVyPChtZXNzYWdlOiBDbGllbnRNZXNzYWdlKSA9PiB2b2lkPjtcbiAgcHJpdmF0ZSBvblN0YXR1c0xpc3RlbmVyOiBPbWl0VGhpc1BhcmFtZXRlcjwoc3RhdHVzOiBDb25uZWN0aW9uU3RhdHVzKSA9PiB2b2lkPjtcbiAgcHJpdmF0ZSBsb3JhQ2xpZW50U2VydmljZTogTG9yYUNsaWVudFNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZSA9IG5ldyBMb3JhQ2xpZW50U2VydmljZSgpO1xuICAgIHRoaXMub25NZXNzYWdlTGlzdGVuZXIgPSB0aGlzLm9uTWVzc2FnZVJlY2VpdmVkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblN0YXR1c0xpc3RlbmVyID0gdGhpcy5vblN0YXR1cy5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub24oJ21lc3NhZ2UnLCB0aGlzLm9uTWVzc2FnZUxpc3RlbmVyKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9uKCdzdGF0dXMnLCB0aGlzLm9uU3RhdHVzTGlzdGVuZXIpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb25uZWN0KCkudGhlbigpO1xuICB9XG5cbiAgYXN5bmMgY29ubmVjdCgpIHtcbiAgICB0aGlzLnN0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXMuQ09OTkVDVElORztcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2Vzc2lvbklkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0xPUkFfQ0xJRU5UX1NFU1NJT05fSUQnKSB8fCBhd2FpdCB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmNyZWF0ZVNlc3Npb24odGhpcy50b2tlbik7XG5cbiAgICAgIGlmICghc2Vzc2lvbklkKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcmVjZWl2ZSBzZXNzaW9uIGlkXCIpO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXMuRVJST1I7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5jb25uZWN0KHtzZXNzaW9uSWQsIGxvYWRIaXN0b3J5OiB0cnVlfSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTE9SQV9DTElFTlRfU0VTU0lPTl9JRCcsIHNlc3Npb25JZCk7XG5cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgdGhpcy5zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLkVSUk9SO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRNZXNzYWdlKCkge1xuICAgIGlmICh0aGlzLm1lc3NhZ2UudHJpbSgpKSB7XG4gICAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLnNlbmRNZXNzYWdlKHRoaXMubWVzc2FnZSk7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICB9XG4gIH1cblxuICBvbk1lc3NhZ2VDaGFuZ2VkKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cblxuICBvbkVudGVyUHJlc3NlZCgpIHtcbiAgICB0aGlzLnNlbmRNZXNzYWdlKCk7XG4gIH1cblxuICBvbkNsaWNrUmVjb25uZWN0KCkge1xuICAgIHRoaXMuY29ubmVjdCgpLnRoZW4oKTtcbiAgfVxuXG4gIG9uTWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2VzID0gdGhpcy5sb3JhQ2xpZW50U2VydmljZS5nZXRNZXNzYWdlcygpO1xuXG4gICAgaWYgKG1lc3NhZ2UudXNlciAhPT0gJ21lJykge1xuICAgICAgdGhpcy5vbk1lc3NhZ2UuZW1pdChtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBvblN0YXR1cyhzdGF0dXM6IENvbm5lY3Rpb25TdGF0dXMpIHtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2UuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub2ZmKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5vZmYoJ3N0YXR1cycsIHRoaXMub25TdGF0dXNMaXN0ZW5lcik7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgQ29ubmVjdGlvblN0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXM7XG59XG4iXX0=