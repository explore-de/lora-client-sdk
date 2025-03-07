import { Component, EventEmitter, Input, Output, ViewEncapsulation, Injector } from '@angular/core';
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
    partsTableComponent = null;
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
            await this.loraClientService.connect({ sessionId, loadHistory: false });
        }
        catch (e) {
            console.error(e);
            this.status = ConnectionStatus.ERROR;
        }
    }
    createInjector() {
        return Injector.create({ providers: [{ provide: 'partsTableComponent', useValue: this.partsTableComponent }] });
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: LoraClient, isStandalone: true, selector: "lora-client", inputs: { token: "token", height: "height", stylesFile: "stylesFile", partsTableComponent: "partsTableComponent" }, outputs: { onMessage: "onMessage" }, ngImport: i0, template: `
    <div class="client__container" [ngStyle]="{height:height+'px'}">
      <ng-container *ngIf="status === ConnectionStatus.CONNECTED">
        <client-messages class="client__messages" [messages]="messages" [partsTableComponent]="partsTableComponent"/>

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
    </div>`, isInline: true, styles: [":host{--background: var(--lora-client__background, transparent);--button-main-color: var(--lora-client__button-main-color, #000000);--button-text-color: var(--lora-client__button-text-color, #fff);--button-hover-color: var(--lora-client__button-hover-color, #3f3f3f);--button-active-color: var(--lora-client__button-active-color, #5b5b5b);--message-border-radius: var(--lora-client__message-border-radius, 16px);--message-color-1: var(--lora-client__message-color-1, #efefef);--message-color-2: var(--lora-client__message-color-2, #a6e4e7)}.client__container{display:flex;flex-direction:column;background:var(--background)}.client__container *{box-sizing:border-box}.client__status{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.client__status button{background:var(--button-main-color);color:var(--button-text-color);margin-top:8px;padding:8px;border:none;cursor:pointer}.client__status button:hover{background:var(--button-hover-color)}.client__status button:active{background:var(--button-active-color)}.client__messages{display:block;border:1px solid #dcdcdc;border-bottom:none;height:100%;flex-grow:1;flex-shrink:1;overflow:hidden}.client__input{border:1px solid #dcdcdc;border-top:none;display:flex;flex-direction:row;flex-grow:0;flex-shrink:0}.client__input-message{flex-grow:1;padding:4px}.client::-webkit-scrollbar{background-color:#fff;width:16px}.client::-webkit-scrollbar-track{background-color:#fff}.client::-webkit-scrollbar-track:hover{background-color:#f4f4f4}.client::-webkit-scrollbar-thumb{background-color:#babac0;border-radius:16px;border:5px solid #fff}.client::-webkit-scrollbar-thumb:hover{background-color:#a0a0a5;border:4px solid #f4f4f4}.client::-webkit-scrollbar-button{display:none}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "component", type: ClientMessageInputComponent, selector: "client-message-input", inputs: ["message"], outputs: ["onMessageChanged", "onEnterPressed"] }, { kind: "component", type: MessageSendComponent, selector: "client-message-send", outputs: ["onClickSend"] }, { kind: "component", type: MessagesComponent, selector: "client-messages", inputs: ["messages", "partsTableComponent"] }, { kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.ShadowDom });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClient, decorators: [{
            type: Component,
            args: [{ selector: 'lora-client', standalone: true, imports: [FormsModule, NgFor, MessageComponent, ClientMessageInputComponent, MessageSendComponent, MessagesComponent, NgStyle, NgIf, NgComponentOutlet], template: `
    <div class="client__container" [ngStyle]="{height:height+'px'}">
      <ng-container *ngIf="status === ConnectionStatus.CONNECTED">
        <client-messages class="client__messages" [messages]="messages" [partsTableComponent]="partsTableComponent"/>

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
            }], partsTableComponent: [{
                type: Input,
                args: ['partsTableComponent']
            }], onMessage: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9yYS1jbGllbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvY2xpZW50L2xvcmEtY2xpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLGlCQUFpQixFQUdqQixRQUFRLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBRTVFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDOzs7QUEwQ2pFLE1BQU0sT0FBTyxVQUFVO0lBb0JEO0lBQXdCO0lBbkI1QixLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ1YsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNULFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDUCxtQkFBbUIsR0FBcUIsSUFBSSxDQUFDO0lBRWpFLFNBQVMsR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFFckYsUUFBUSxHQUFvQixFQUFFLENBQUM7SUFDL0IsT0FBTyxHQUFXLEVBQUUsQ0FBQztJQUNyQixNQUFNLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBQ3ZDLG1CQUFt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c0JBQXBCLEtBQUs7dUJBQUMsT0FBTztnQkFDRyxNQUFNO3NCQUF0QixLQUFLO3VCQUFDLFFBQVE7Z0JBQ00sVUFBVTtzQkFBOUIsS0FBSzt1QkFBQyxZQUFZO2dCQUNXLG1CQUFtQjtzQkFBaEQsS0FBSzt1QkFBQyxxQkFBcUI7Z0JBRWxCLFNBQVM7c0JBQWxCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBFbGVtZW50UmVmLFxuICBUeXBlLFxuICBJbmplY3RvciwgY29tcHV0ZWRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtOZ0ZvciwgTmdJZiwgTmdTdHlsZSwgTmdDb21wb25lbnRPdXRsZXR9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7Q29ubmVjdGlvblN0YXR1cywgTG9yYUNsaWVudFNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xvcmEtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHtNZXNzYWdlQ29tcG9uZW50fSBmcm9tIFwiLi4vbWVzc2FnZS9tZXNzYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlLWlucHV0L21lc3NhZ2UtaW5wdXQuY29tcG9uZW50XCI7XG5pbXBvcnQge01lc3NhZ2VTZW5kQ29tcG9uZW50fSBmcm9tIFwiLi4vbWVzc2FnZS1zZW5kL21lc3NhZ2Utc2VuZC5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2xpZW50TWVzc2FnZX0gZnJvbSBcIi4uLy4uL3R5cGVzL0NsaWVudE1lc3NhZ2VcIjtcbmltcG9ydCB7TWVzc2FnZXNDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlcy9tZXNzYWdlcy5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbG9yYS1jbGllbnQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbRm9ybXNNb2R1bGUsIE5nRm9yLCBNZXNzYWdlQ29tcG9uZW50LCBDbGllbnRNZXNzYWdlSW5wdXRDb21wb25lbnQsIE1lc3NhZ2VTZW5kQ29tcG9uZW50LCBNZXNzYWdlc0NvbXBvbmVudCwgTmdTdHlsZSwgTmdJZiwgTmdDb21wb25lbnRPdXRsZXRdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX2NvbnRhaW5lclwiIFtuZ1N0eWxlXT1cIntoZWlnaHQ6aGVpZ2h0KydweCd9XCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdHVzID09PSBDb25uZWN0aW9uU3RhdHVzLkNPTk5FQ1RFRFwiPlxuICAgICAgICA8Y2xpZW50LW1lc3NhZ2VzIGNsYXNzPVwiY2xpZW50X19tZXNzYWdlc1wiIFttZXNzYWdlc109XCJtZXNzYWdlc1wiIFtwYXJ0c1RhYmxlQ29tcG9uZW50XT1cInBhcnRzVGFibGVDb21wb25lbnRcIi8+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9faW5wdXRcIj5cbiAgICAgICAgICA8Y2xpZW50LW1lc3NhZ2UtaW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwiY2xpZW50X19pbnB1dC1tZXNzYWdlXCJcbiAgICAgICAgICAgIFttZXNzYWdlXT1cIm1lc3NhZ2VcIlxuICAgICAgICAgICAgKG9uTWVzc2FnZUNoYW5nZWQpPVwib25NZXNzYWdlQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChvbkVudGVyUHJlc3NlZCk9XCJvbkVudGVyUHJlc3NlZCgpXCJcbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPGNsaWVudC1tZXNzYWdlLXNlbmQgY2xhc3M9XCJjbGllbnRfX2lucHV0LXN1Ym1pdFwiIChvbkNsaWNrU2VuZCk9XCJzZW5kTWVzc2FnZSgpXCIvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cz09PUNvbm5lY3Rpb25TdGF0dXMuRElTQ09OTkVDVEVEXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPkRpc2Nvbm5lY3RlZDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdHVzPT09Q29ubmVjdGlvblN0YXR1cy5DT05ORUNUSU5HXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPkNvbm5lY3RpbmcuLi48L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cz09PUNvbm5lY3Rpb25TdGF0dXMuRVJST1JcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9fc3RhdHVzXCI+XG4gICAgICAgICAgPGRpdj5Db25uZWN0aW9uIEZhaWxlZDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cIm9uQ2xpY2tSZWNvbm5lY3QoKVwiPlRyeSBhZ2FpbjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPGxpbmsgKm5nSWY9XCJzYW5pdGl6ZWRTdHlsZXNGaWxlXCIgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIFtocmVmXT1cInNhbml0aXplZFN0eWxlc0ZpbGVcIi8+XG4gICAgPC9kaXY+YCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tLFxuICBzdHlsZVVybHM6IFsnLi9sb3JhLWNsaWVudC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIExvcmFDbGllbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgndG9rZW4nKSB0b2tlbiA9ICcnO1xuICBASW5wdXQoJ2hlaWdodCcpIGhlaWdodCA9IDUwMDtcbiAgQElucHV0KCdzdHlsZXNGaWxlJykgc3R5bGVzRmlsZSA9ICcnO1xuICBASW5wdXQoJ3BhcnRzVGFibGVDb21wb25lbnQnKSBwYXJ0c1RhYmxlQ29tcG9uZW50OiBUeXBlPGFueT4gfCBudWxsID0gbnVsbDtcblxuICBAT3V0cHV0KCkgb25NZXNzYWdlOiBFdmVudEVtaXR0ZXI8Q2xpZW50TWVzc2FnZT4gPSBuZXcgRXZlbnRFbWl0dGVyPENsaWVudE1lc3NhZ2U+KCk7XG5cbiAgbWVzc2FnZXM6IENsaWVudE1lc3NhZ2VbXSA9IFtdO1xuICBtZXNzYWdlOiBzdHJpbmcgPSAnJztcbiAgc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5ESVNDT05ORUNURUQ7XG4gIHNhbml0aXplZFN0eWxlc0ZpbGU6IFNhZmVSZXNvdXJjZVVybCA9ICcnO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBDb25uZWN0aW9uU3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cztcblxuICBwcml2YXRlIG9uTWVzc2FnZUxpc3RlbmVyOiBPbWl0VGhpc1BhcmFtZXRlcjwobWVzc2FnZTogQ2xpZW50TWVzc2FnZSkgPT4gdm9pZD47XG4gIHByaXZhdGUgb25TdGF0dXNMaXN0ZW5lcjogT21pdFRoaXNQYXJhbWV0ZXI8KHN0YXR1czogQ29ubmVjdGlvblN0YXR1cykgPT4gdm9pZD47XG4gIHByaXZhdGUgbG9yYUNsaWVudFNlcnZpY2U6IExvcmFDbGllbnRTZXJ2aWNlO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2UgPSBuZXcgTG9yYUNsaWVudFNlcnZpY2UoKTtcbiAgICB0aGlzLm9uTWVzc2FnZUxpc3RlbmVyID0gdGhpcy5vbk1lc3NhZ2VSZWNlaXZlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25TdGF0dXNMaXN0ZW5lciA9IHRoaXMub25TdGF0dXMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9uKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5vbignc3RhdHVzJywgdGhpcy5vblN0YXR1c0xpc3RlbmVyKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29ubmVjdCgpLnRoZW4oKTtcbiAgICBpZiAodGhpcy5zdHlsZXNGaWxlKSB7XG4gICAgICB0aGlzLnNhbml0aXplZFN0eWxlc0ZpbGUgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodGhpcy5zdHlsZXNGaWxlKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjb25uZWN0KCkge1xuICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5DT05ORUNUSU5HO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZXNzaW9uSWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTE9SQV9DTElFTlRfU0VTU0lPTl9JRCcpIHx8IGF3YWl0IHRoaXMubG9yYUNsaWVudFNlcnZpY2UuY3JlYXRlU2Vzc2lvbih0aGlzLnRva2VuKTtcblxuICAgICAgaWYgKCFzZXNzaW9uSWQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZWNlaXZlIHNlc3Npb24gaWRcIik7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5FUlJPUjtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmNvbm5lY3Qoe3Nlc3Npb25JZCwgbG9hZEhpc3Rvcnk6IGZhbHNlfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5FUlJPUjtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVJbmplY3RvcigpIHtcbiAgICByZXR1cm4gSW5qZWN0b3IuY3JlYXRlKHtwcm92aWRlcnM6IFt7cHJvdmlkZTogJ3BhcnRzVGFibGVDb21wb25lbnQnLCB1c2VWYWx1ZTogdGhpcy5wYXJ0c1RhYmxlQ29tcG9uZW50fV19KTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKCkge1xuICAgIGlmICh0aGlzLm1lc3NhZ2UudHJpbSgpKSB7XG4gICAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLnNlbmRNZXNzYWdlKHRoaXMubWVzc2FnZSk7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICB9XG4gIH1cblxuICBvbk1lc3NhZ2VDaGFuZ2VkKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cblxuICBvbkVudGVyUHJlc3NlZCgpIHtcbiAgICB0aGlzLnNlbmRNZXNzYWdlKCk7XG4gIH1cblxuICBvbkNsaWNrUmVjb25uZWN0KCkge1xuICAgIHRoaXMuY29ubmVjdCgpLnRoZW4oKTtcbiAgfVxuXG4gIG9uTWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2VzID0gdGhpcy5sb3JhQ2xpZW50U2VydmljZS5nZXRNZXNzYWdlcygpO1xuXG4gICAgaWYgKG1lc3NhZ2UudXNlciAhPT0gJ21lJykge1xuICAgICAgdGhpcy5vbk1lc3NhZ2UuZW1pdChtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBvblN0YXR1cyhzdGF0dXM6IENvbm5lY3Rpb25TdGF0dXMpIHtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2UuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub2ZmKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5vZmYoJ3N0YXR1cycsIHRoaXMub25TdGF0dXNMaXN0ZW5lcik7XG4gIH1cbn1cbiJdfQ==