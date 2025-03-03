import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf, NgStyle, NgComponentOutlet } from "@angular/common";
import { ConnectionStatus, LoraClientService } from '../../services/lora-client.service';
import { MessageComponent } from "../message/message.component";
import { ClientMessageInputComponent } from "../message-input/message-input.component";
import { MessageSendComponent } from "../message-send/message-send.component";
import { MessagesComponent } from "../messages/messages.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class LoraClient {
    el;
    sanitizer;
    token = '';
    height = 500;
    stylesFile = '';
    customMessageComponent = null;
    onMessage = new EventEmitter();
    messages = [];
    message = '';
    status = ConnectionStatus.DISCONNECTED;
    sanitizedStylesFile = '';
    ConnectionStatus = ConnectionStatus;
    onMessageListener;
    onStatusListener;
    loraClientService;
    constructor(el, sanitizer) {
        this.el = el;
        this.sanitizer = sanitizer;
        this.loraClientService = new LoraClientService();
        this.onMessageListener = this.onMessageReceived.bind(this);
        this.onStatusListener = this.onStatus.bind(this);
        this.loraClientService.on('message', this.onMessageListener);
        this.loraClientService.on('status', this.onStatusListener);
    }
    ngOnInit() {
        this.connect().then();
        if (this.stylesFile) {
            this.sanitizedStylesFile = this.sanitizer.bypassSecurityTrustResourceUrl(this.stylesFile);
        }
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClient, deps: [{ token: i0.ElementRef }, { token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: LoraClient, isStandalone: true, selector: "lora-client", inputs: { token: "token", height: "height", stylesFile: "stylesFile", customMessageComponent: "customMessageComponent" }, outputs: { onMessage: "onMessage" }, ngImport: i0, template: `
    <div class="client__container" [ngStyle]="{height:height+'px'}">

      <ng-container *ngIf="status === ConnectionStatus.CONNECTED">
        <client-messages class="client__messages" [messages]="messages" [customComponent]="customMessageComponent"/>

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
      <link *ngIf="sanitizedStylesFile" rel="stylesheet" type="text/css" [href]="sanitizedStylesFile"/>
    </div>`, isInline: true, styles: [":host{--background: var(--lora-client__background, transparent);--button-main-color: var(--lora-client__button-main-color, #000000);--button-text-color: var(--lora-client__button-text-color, #fff);--button-hover-color: var(--lora-client__button-hover-color, #3f3f3f);--button-active-color: var(--lora-client__button-active-color, #5b5b5b);--message-border-radius: var(--lora-client__message-border-radius, 16px);--message-color-1: var(--lora-client__message-color-1, #efefef);--message-color-2: var(--lora-client__message-color-2, #a6e4e7)}.client__container{display:flex;flex-direction:column;background:var(--background)}.client__container *{box-sizing:border-box}.client__status{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.client__status button{background:var(--button-main-color);color:var(--button-text-color);margin-top:8px;padding:8px;border:none;cursor:pointer}.client__status button:hover{background:var(--button-hover-color)}.client__status button:active{background:var(--button-active-color)}.client__messages{display:block;border:1px solid #dcdcdc;border-bottom:none;height:100%;flex-grow:1;flex-shrink:1;overflow:hidden}.client__input{border:1px solid #dcdcdc;border-top:none;display:flex;flex-direction:row;flex-grow:0;flex-shrink:0}.client__input-message{flex-grow:1;padding:4px}.client::-webkit-scrollbar{background-color:#fff;width:16px}.client::-webkit-scrollbar-track{background-color:#fff}.client::-webkit-scrollbar-track:hover{background-color:#f4f4f4}.client::-webkit-scrollbar-thumb{background-color:#babac0;border-radius:16px;border:5px solid #fff}.client::-webkit-scrollbar-thumb:hover{background-color:#a0a0a5;border:4px solid #f4f4f4}.client::-webkit-scrollbar-button{display:none}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "component", type: ClientMessageInputComponent, selector: "client-message-input", inputs: ["message"], outputs: ["onMessageChanged", "onEnterPressed"] }, { kind: "component", type: MessageSendComponent, selector: "client-message-send", outputs: ["onClickSend"] }, { kind: "component", type: MessagesComponent, selector: "client-messages", inputs: ["messages", "customComponent"] }, { kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.ShadowDom });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClient, decorators: [{
            type: Component,
            args: [{ selector: 'lora-client', standalone: true, imports: [FormsModule, NgFor, MessageComponent, ClientMessageInputComponent, MessageSendComponent, MessagesComponent, NgStyle, NgIf, NgComponentOutlet], template: `
    <div class="client__container" [ngStyle]="{height:height+'px'}">

      <ng-container *ngIf="status === ConnectionStatus.CONNECTED">
        <client-messages class="client__messages" [messages]="messages" [customComponent]="customMessageComponent"/>

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
      <link *ngIf="sanitizedStylesFile" rel="stylesheet" type="text/css" [href]="sanitizedStylesFile"/>
    </div>`, encapsulation: ViewEncapsulation.ShadowDom, styles: [":host{--background: var(--lora-client__background, transparent);--button-main-color: var(--lora-client__button-main-color, #000000);--button-text-color: var(--lora-client__button-text-color, #fff);--button-hover-color: var(--lora-client__button-hover-color, #3f3f3f);--button-active-color: var(--lora-client__button-active-color, #5b5b5b);--message-border-radius: var(--lora-client__message-border-radius, 16px);--message-color-1: var(--lora-client__message-color-1, #efefef);--message-color-2: var(--lora-client__message-color-2, #a6e4e7)}.client__container{display:flex;flex-direction:column;background:var(--background)}.client__container *{box-sizing:border-box}.client__status{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.client__status button{background:var(--button-main-color);color:var(--button-text-color);margin-top:8px;padding:8px;border:none;cursor:pointer}.client__status button:hover{background:var(--button-hover-color)}.client__status button:active{background:var(--button-active-color)}.client__messages{display:block;border:1px solid #dcdcdc;border-bottom:none;height:100%;flex-grow:1;flex-shrink:1;overflow:hidden}.client__input{border:1px solid #dcdcdc;border-top:none;display:flex;flex-direction:row;flex-grow:0;flex-shrink:0}.client__input-message{flex-grow:1;padding:4px}.client::-webkit-scrollbar{background-color:#fff;width:16px}.client::-webkit-scrollbar-track{background-color:#fff}.client::-webkit-scrollbar-track:hover{background-color:#f4f4f4}.client::-webkit-scrollbar-thumb{background-color:#babac0;border-radius:16px;border:5px solid #fff}.client::-webkit-scrollbar-thumb:hover{background-color:#a0a0a5;border:4px solid #f4f4f4}.client::-webkit-scrollbar-button{display:none}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.DomSanitizer }], propDecorators: { token: [{
                type: Input,
                args: ['token']
            }], height: [{
                type: Input,
                args: ['height']
            }], stylesFile: [{
                type: Input,
                args: ['stylesFile']
            }], customMessageComponent: [{
                type: Input,
                args: ['customMessageComponent']
            }], onMessage: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9yYS1jbGllbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvY2xpZW50L2xvcmEtY2xpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLGlCQUFpQixFQUdsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDdkYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDckYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFFNUUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7OztBQTJDakUsTUFBTSxPQUFPLFVBQVU7SUFvQkQ7SUFBd0I7SUFuQjVCLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDVixNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQ1QsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNKLHNCQUFzQixHQUFxQixJQUFJLENBQUM7SUFFdkUsU0FBUyxHQUFnQyxJQUFJLFlBQVksRUFBaUIsQ0FBQztJQUVyRixRQUFRLEdBQW9CLEVBQUUsQ0FBQztJQUMvQixPQUFPLEdBQVcsRUFBRSxDQUFDO0lBQ3JCLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdkMsbUJBQW1CLEdBQW9CLEVB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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgRWxlbWVudFJlZixcbiAgVHlwZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge05nRm9yLCBOZ0lmLCBOZ1N0eWxlLCBOZ0NvbXBvbmVudE91dGxldH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtDb25uZWN0aW9uU3RhdHVzLCBMb3JhQ2xpZW50U2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvbG9yYS1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQge01lc3NhZ2VDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2VJbnB1dENvbXBvbmVudH0gZnJvbSBcIi4uL21lc3NhZ2UtaW5wdXQvbWVzc2FnZS1pbnB1dC5jb21wb25lbnRcIjtcbmltcG9ydCB7TWVzc2FnZVNlbmRDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlLXNlbmQvbWVzc2FnZS1zZW5kLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlfSBmcm9tIFwiLi4vLi4vdHlwZXMvQ2xpZW50TWVzc2FnZVwiO1xuaW1wb3J0IHtNZXNzYWdlc0NvbXBvbmVudH0gZnJvbSBcIi4uL21lc3NhZ2VzL21lc3NhZ2VzLmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsb3JhLWNsaWVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtGb3Jtc01vZHVsZSwgTmdGb3IsIE1lc3NhZ2VDb21wb25lbnQsIENsaWVudE1lc3NhZ2VJbnB1dENvbXBvbmVudCwgTWVzc2FnZVNlbmRDb21wb25lbnQsIE1lc3NhZ2VzQ29tcG9uZW50LCBOZ1N0eWxlLCBOZ0lmLCBOZ0NvbXBvbmVudE91dGxldF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNsaWVudF9fY29udGFpbmVyXCIgW25nU3R5bGVdPVwie2hlaWdodDpoZWlnaHQrJ3B4J31cIj5cblxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cyA9PT0gQ29ubmVjdGlvblN0YXR1cy5DT05ORUNURURcIj5cbiAgICAgICAgPGNsaWVudC1tZXNzYWdlcyBjbGFzcz1cImNsaWVudF9fbWVzc2FnZXNcIiBbbWVzc2FnZXNdPVwibWVzc2FnZXNcIiBbY3VzdG9tQ29tcG9uZW50XT1cImN1c3RvbU1lc3NhZ2VDb21wb25lbnRcIi8+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9faW5wdXRcIj5cbiAgICAgICAgICA8Y2xpZW50LW1lc3NhZ2UtaW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwiY2xpZW50X19pbnB1dC1tZXNzYWdlXCJcbiAgICAgICAgICAgIFttZXNzYWdlXT1cIm1lc3NhZ2VcIlxuICAgICAgICAgICAgKG9uTWVzc2FnZUNoYW5nZWQpPVwib25NZXNzYWdlQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChvbkVudGVyUHJlc3NlZCk9XCJvbkVudGVyUHJlc3NlZCgpXCJcbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPGNsaWVudC1tZXNzYWdlLXNlbmQgY2xhc3M9XCJjbGllbnRfX2lucHV0LXN1Ym1pdFwiIChvbkNsaWNrU2VuZCk9XCJzZW5kTWVzc2FnZSgpXCIvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cz09PUNvbm5lY3Rpb25TdGF0dXMuRElTQ09OTkVDVEVEXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPkRpc2Nvbm5lY3RlZDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdHVzPT09Q29ubmVjdGlvblN0YXR1cy5DT05ORUNUSU5HXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPkNvbm5lY3RpbmcuLi48L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cz09PUNvbm5lY3Rpb25TdGF0dXMuRVJST1JcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9fc3RhdHVzXCI+XG4gICAgICAgICAgPGRpdj5Db25uZWN0aW9uIEZhaWxlZDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cIm9uQ2xpY2tSZWNvbm5lY3QoKVwiPlRyeSBhZ2FpbjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPGxpbmsgKm5nSWY9XCJzYW5pdGl6ZWRTdHlsZXNGaWxlXCIgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIFtocmVmXT1cInNhbml0aXplZFN0eWxlc0ZpbGVcIi8+XG4gICAgPC9kaXY+YCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tLFxuICBzdHlsZVVybHM6IFsnLi9sb3JhLWNsaWVudC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIExvcmFDbGllbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgndG9rZW4nKSB0b2tlbiA9ICcnO1xuICBASW5wdXQoJ2hlaWdodCcpIGhlaWdodCA9IDUwMDtcbiAgQElucHV0KCdzdHlsZXNGaWxlJykgc3R5bGVzRmlsZSA9ICcnO1xuICBASW5wdXQoJ2N1c3RvbU1lc3NhZ2VDb21wb25lbnQnKSBjdXN0b21NZXNzYWdlQ29tcG9uZW50OiBUeXBlPGFueT4gfCBudWxsID0gbnVsbDtcblxuICBAT3V0cHV0KCkgb25NZXNzYWdlOiBFdmVudEVtaXR0ZXI8Q2xpZW50TWVzc2FnZT4gPSBuZXcgRXZlbnRFbWl0dGVyPENsaWVudE1lc3NhZ2U+KCk7XG5cbiAgbWVzc2FnZXM6IENsaWVudE1lc3NhZ2VbXSA9IFtdO1xuICBtZXNzYWdlOiBzdHJpbmcgPSAnJztcbiAgc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5ESVNDT05ORUNURUQ7XG4gIHNhbml0aXplZFN0eWxlc0ZpbGU6IFNhZmVSZXNvdXJjZVVybCA9ICcnO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBDb25uZWN0aW9uU3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cztcblxuICBwcml2YXRlIG9uTWVzc2FnZUxpc3RlbmVyOiBPbWl0VGhpc1BhcmFtZXRlcjwobWVzc2FnZTogQ2xpZW50TWVzc2FnZSkgPT4gdm9pZD47XG4gIHByaXZhdGUgb25TdGF0dXNMaXN0ZW5lcjogT21pdFRoaXNQYXJhbWV0ZXI8KHN0YXR1czogQ29ubmVjdGlvblN0YXR1cykgPT4gdm9pZD47XG4gIHByaXZhdGUgbG9yYUNsaWVudFNlcnZpY2U6IExvcmFDbGllbnRTZXJ2aWNlO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2UgPSBuZXcgTG9yYUNsaWVudFNlcnZpY2UoKTtcbiAgICB0aGlzLm9uTWVzc2FnZUxpc3RlbmVyID0gdGhpcy5vbk1lc3NhZ2VSZWNlaXZlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25TdGF0dXNMaXN0ZW5lciA9IHRoaXMub25TdGF0dXMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9uKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5vbignc3RhdHVzJywgdGhpcy5vblN0YXR1c0xpc3RlbmVyKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29ubmVjdCgpLnRoZW4oKTtcbiAgICBpZiAodGhpcy5zdHlsZXNGaWxlKSB7XG4gICAgICB0aGlzLnNhbml0aXplZFN0eWxlc0ZpbGUgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodGhpcy5zdHlsZXNGaWxlKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjb25uZWN0KCkge1xuICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5DT05ORUNUSU5HO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZXNzaW9uSWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTE9SQV9DTElFTlRfU0VTU0lPTl9JRCcpIHx8IGF3YWl0IHRoaXMubG9yYUNsaWVudFNlcnZpY2UuY3JlYXRlU2Vzc2lvbih0aGlzLnRva2VuKTtcblxuICAgICAgaWYgKCFzZXNzaW9uSWQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZWNlaXZlIHNlc3Npb24gaWRcIik7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5FUlJPUjtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmNvbm5lY3Qoe3Nlc3Npb25JZCwgbG9hZEhpc3Rvcnk6IHRydWV9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgdGhpcy5zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLkVSUk9SO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRNZXNzYWdlKCkge1xuICAgIGlmICh0aGlzLm1lc3NhZ2UudHJpbSgpKSB7XG4gICAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLnNlbmRNZXNzYWdlKHRoaXMubWVzc2FnZSk7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICB9XG4gIH1cblxuICBvbk1lc3NhZ2VDaGFuZ2VkKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cblxuICBvbkVudGVyUHJlc3NlZCgpIHtcbiAgICB0aGlzLnNlbmRNZXNzYWdlKCk7XG4gIH1cblxuICBvbkNsaWNrUmVjb25uZWN0KCkge1xuICAgIHRoaXMuY29ubmVjdCgpLnRoZW4oKTtcbiAgfVxuXG4gIG9uTWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2VzID0gdGhpcy5sb3JhQ2xpZW50U2VydmljZS5nZXRNZXNzYWdlcygpO1xuXG4gICAgaWYgKG1lc3NhZ2UudXNlciAhPT0gJ21lJykge1xuICAgICAgdGhpcy5vbk1lc3NhZ2UuZW1pdChtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBvblN0YXR1cyhzdGF0dXM6IENvbm5lY3Rpb25TdGF0dXMpIHtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2UuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub2ZmKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5vZmYoJ3N0YXR1cycsIHRoaXMub25TdGF0dXNMaXN0ZW5lcik7XG4gIH1cbn1cbiJdfQ==