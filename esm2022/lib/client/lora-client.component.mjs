import { Component, EventEmitter, Input, Output, ViewEncapsulation, Injector, inject } from '@angular/core';
import { NgFor, NgIf, NgStyle, NgComponentOutlet } from "@angular/common";
import { ConnectionStatus, LoraClientService } from '../../services/lora-client.service';
import { ClientMessageInputComponent } from "../message-input/message-input.component";
import { MessageSendComponent } from "../message-send/message-send.component";
import { MessagesComponent } from "../messages/messages.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class LoraClient {
    sanitizer;
    token = '';
    height = 500;
    stylesFile = '';
    partsTableComponent = null;
    onMessage = new EventEmitter();
    onTicketCreated = new EventEmitter();
    messages = [];
    message = '';
    status = ConnectionStatus.DISCONNECTED;
    sanitizedStylesFile = '';
    ConnectionStatus = ConnectionStatus;
    loraClientService = inject(LoraClientService);
    onMessageListener;
    onStatusListener;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
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
        if (message.widget?.widgetName === "Ticket" && message.widget.widgetProps.ticket) {
            this.onTicketCreated.emit(message.widget.widgetProps.ticket);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClient, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: LoraClient, isStandalone: true, selector: "lora-client", inputs: { token: "token", height: "height", stylesFile: "stylesFile", partsTableComponent: "partsTableComponent" }, outputs: { onMessage: "onMessage", onTicketCreated: "onTicketCreated" }, ngImport: i0, template: `
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
    </div>`, isInline: true, styles: [":host{--background: var(--lora-client__background, transparent);--button-main-color: var(--lora-client__button-main-color, #000000);--button-text-color: var(--lora-client__button-text-color, #fff);--button-hover-color: var(--lora-client__button-hover-color, #3f3f3f);--button-active-color: var(--lora-client__button-active-color, #5b5b5b);--message-border-radius: var(--lora-client__message-border-radius, 16px);--message-color-1: var(--lora-client__message-color-1, #efefef);--message-color-2: var(--lora-client__message-color-2, #a6e4e7)}.client__container{display:flex;flex-direction:column;background:var(--background)}.client__container *{box-sizing:border-box}.client__status{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.client__status button{background:var(--button-main-color);color:var(--button-text-color);margin-top:8px;padding:8px;border:none;cursor:pointer}.client__status button:hover{background:var(--button-hover-color)}.client__status button:active{background:var(--button-active-color)}.client__messages{display:block;border:1px solid #dcdcdc;border-bottom:none;height:100%;flex-grow:1;flex-shrink:1;overflow:hidden}.client__input{border:1px solid #dcdcdc;border-top:none;display:flex;flex-direction:row;flex-grow:0;flex-shrink:0}.client__input-message{flex-grow:1;padding:4px}.client::-webkit-scrollbar{background-color:#fff;width:16px}.client::-webkit-scrollbar-track{background-color:#fff}.client::-webkit-scrollbar-track:hover{background-color:#f4f4f4}.client::-webkit-scrollbar-thumb{background-color:#babac0;border-radius:16px;border:5px solid #fff}.client::-webkit-scrollbar-thumb:hover{background-color:#a0a0a5;border:4px solid #f4f4f4}.client::-webkit-scrollbar-button{display:none}\n"], dependencies: [{ kind: "component", type: ClientMessageInputComponent, selector: "client-message-input", inputs: ["message"], outputs: ["onMessageChanged", "onEnterPressed"] }, { kind: "component", type: MessageSendComponent, selector: "client-message-send", outputs: ["onClickSend"] }, { kind: "component", type: MessagesComponent, selector: "client-messages", inputs: ["messages", "partsTableComponent"] }, { kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.ShadowDom });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClient, decorators: [{
            type: Component,
            args: [{ selector: 'lora-client', standalone: true, imports: [NgFor, ClientMessageInputComponent, MessageSendComponent, MessagesComponent, NgStyle, NgIf, NgComponentOutlet], encapsulation: ViewEncapsulation.ShadowDom, template: `
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
    </div>`, styles: [":host{--background: var(--lora-client__background, transparent);--button-main-color: var(--lora-client__button-main-color, #000000);--button-text-color: var(--lora-client__button-text-color, #fff);--button-hover-color: var(--lora-client__button-hover-color, #3f3f3f);--button-active-color: var(--lora-client__button-active-color, #5b5b5b);--message-border-radius: var(--lora-client__message-border-radius, 16px);--message-color-1: var(--lora-client__message-color-1, #efefef);--message-color-2: var(--lora-client__message-color-2, #a6e4e7)}.client__container{display:flex;flex-direction:column;background:var(--background)}.client__container *{box-sizing:border-box}.client__status{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.client__status button{background:var(--button-main-color);color:var(--button-text-color);margin-top:8px;padding:8px;border:none;cursor:pointer}.client__status button:hover{background:var(--button-hover-color)}.client__status button:active{background:var(--button-active-color)}.client__messages{display:block;border:1px solid #dcdcdc;border-bottom:none;height:100%;flex-grow:1;flex-shrink:1;overflow:hidden}.client__input{border:1px solid #dcdcdc;border-top:none;display:flex;flex-direction:row;flex-grow:0;flex-shrink:0}.client__input-message{flex-grow:1;padding:4px}.client::-webkit-scrollbar{background-color:#fff;width:16px}.client::-webkit-scrollbar-track{background-color:#fff}.client::-webkit-scrollbar-track:hover{background-color:#f4f4f4}.client::-webkit-scrollbar-thumb{background-color:#babac0;border-radius:16px;border:5px solid #fff}.client::-webkit-scrollbar-thumb:hover{background-color:#a0a0a5;border:4px solid #f4f4f4}.client::-webkit-scrollbar-button{display:none}\n"] }]
        }], ctorParameters: () => [{ type: i1.DomSanitizer }], propDecorators: { token: [{
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
            }], onTicketCreated: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9yYS1jbGllbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvY2xpZW50L2xvcmEtY2xpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLGlCQUFpQixFQUVqQixRQUFRLEVBQUUsTUFBTSxFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RixPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNyRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUM1RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7O0FBNENqRSxNQUFNLE9BQU8sVUFBVTtJQW9CRDtJQW5CSixLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ1YsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNULFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDUCxtQkFBbUIsR0FBcUIsSUFBSSxDQUFDO0lBRWpFLFNBQVMsR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFDM0UsZUFBZSxHQUFvQyxJQUFJLFlBQVksRUFBcUIsQ0FBQztJQUVuRyxRQUFRLEdBQW9CLEVBQUUsQ0FBQztJQUMvQixPQUFPLEdBQVcsRUFBRSxDQUFDO0lBQ3JCLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdkMsbUJBQW1CLEdBQW9CLEVBQUUsQ0FBQztJQUV2QixnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWdDRDtpRkFHTyxLQUFLO3NCQUFwQixLQUFLO3VCQUFDLE9BQU87Z0JBQ0csTUFBTTtzQkFBdEIsS0FBSzt1QkFBQyxRQUFRO2dCQUNNLFVBQVU7c0JBQTlCLEtBQUs7dUJBQUMsWUFBWTtnQkFDVyxtQkFBbUI7c0JBQWhELEtBQUs7dUJBQUMscUJBQXFCO2dCQUVsQixTQUFTO3NCQUFsQixNQUFNO2dCQUNHLGVBQWU7c0JBQXhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBUeXBlLFxuICBJbmplY3RvciwgaW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge05nRm9yLCBOZ0lmLCBOZ1N0eWxlLCBOZ0NvbXBvbmVudE91dGxldH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtDb25uZWN0aW9uU3RhdHVzLCBMb3JhQ2xpZW50U2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvbG9yYS1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2VJbnB1dENvbXBvbmVudH0gZnJvbSBcIi4uL21lc3NhZ2UtaW5wdXQvbWVzc2FnZS1pbnB1dC5jb21wb25lbnRcIjtcbmltcG9ydCB7TWVzc2FnZVNlbmRDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlLXNlbmQvbWVzc2FnZS1zZW5kLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNZXNzYWdlc0NvbXBvbmVudH0gZnJvbSBcIi4uL21lc3NhZ2VzL21lc3NhZ2VzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlfSBmcm9tICcuLi8uLi90eXBlcy9DbGllbnRNZXNzYWdlJztcbmltcG9ydCB7VGlja2V0SW5mb3JtYXRpb259IGZyb20gXCJAL2xvcmEtY2xpZW50L3NyYy90eXBlcy9UaWNrZXRJbmZvcm1hdGlvblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsb3JhLWNsaWVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtOZ0ZvciwgQ2xpZW50TWVzc2FnZUlucHV0Q29tcG9uZW50LCBNZXNzYWdlU2VuZENvbXBvbmVudCwgTWVzc2FnZXNDb21wb25lbnQsIE5nU3R5bGUsIE5nSWYsIE5nQ29tcG9uZW50T3V0bGV0XSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tLFxuICBzdHlsZVVybHM6IFsnLi9sb3JhLWNsaWVudC5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX2NvbnRhaW5lclwiIFtuZ1N0eWxlXT1cIntoZWlnaHQ6aGVpZ2h0KydweCd9XCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdHVzID09PSBDb25uZWN0aW9uU3RhdHVzLkNPTk5FQ1RFRFwiPlxuICAgICAgICA8Y2xpZW50LW1lc3NhZ2VzIGNsYXNzPVwiY2xpZW50X19tZXNzYWdlc1wiIFttZXNzYWdlc109XCJtZXNzYWdlc1wiIFtwYXJ0c1RhYmxlQ29tcG9uZW50XT1cInBhcnRzVGFibGVDb21wb25lbnRcIi8+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9faW5wdXRcIj5cbiAgICAgICAgICA8Y2xpZW50LW1lc3NhZ2UtaW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwiY2xpZW50X19pbnB1dC1tZXNzYWdlXCJcbiAgICAgICAgICAgIFttZXNzYWdlXT1cIm1lc3NhZ2VcIlxuICAgICAgICAgICAgKG9uTWVzc2FnZUNoYW5nZWQpPVwib25NZXNzYWdlQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChvbkVudGVyUHJlc3NlZCk9XCJvbkVudGVyUHJlc3NlZCgpXCJcbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPGNsaWVudC1tZXNzYWdlLXNlbmQgY2xhc3M9XCJjbGllbnRfX2lucHV0LXN1Ym1pdFwiIChvbkNsaWNrU2VuZCk9XCJzZW5kTWVzc2FnZSgpXCIvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cz09PUNvbm5lY3Rpb25TdGF0dXMuRElTQ09OTkVDVEVEXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPkRpc2Nvbm5lY3RlZDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdHVzPT09Q29ubmVjdGlvblN0YXR1cy5DT05ORUNUSU5HXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPkNvbm5lY3RpbmcuLi48L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cz09PUNvbm5lY3Rpb25TdGF0dXMuRVJST1JcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9fc3RhdHVzXCI+XG4gICAgICAgICAgPGRpdj5Db25uZWN0aW9uIEZhaWxlZDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cIm9uQ2xpY2tSZWNvbm5lY3QoKVwiPlRyeSBhZ2FpbjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPGxpbmsgKm5nSWY9XCJzYW5pdGl6ZWRTdHlsZXNGaWxlXCIgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIFtocmVmXT1cInNhbml0aXplZFN0eWxlc0ZpbGVcIi8+XG4gICAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBMb3JhQ2xpZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ3Rva2VuJykgdG9rZW4gPSAnJztcbiAgQElucHV0KCdoZWlnaHQnKSBoZWlnaHQgPSA1MDA7XG4gIEBJbnB1dCgnc3R5bGVzRmlsZScpIHN0eWxlc0ZpbGUgPSAnJztcbiAgQElucHV0KCdwYXJ0c1RhYmxlQ29tcG9uZW50JykgcGFydHNUYWJsZUNvbXBvbmVudDogVHlwZTxhbnk+IHwgbnVsbCA9IG51bGw7XG5cbiAgQE91dHB1dCgpIG9uTWVzc2FnZTogRXZlbnRFbWl0dGVyPENsaWVudE1lc3NhZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxDbGllbnRNZXNzYWdlPigpO1xuICBAT3V0cHV0KCkgb25UaWNrZXRDcmVhdGVkOiBFdmVudEVtaXR0ZXI8VGlja2V0SW5mb3JtYXRpb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxUaWNrZXRJbmZvcm1hdGlvbj4oKTtcblxuICBtZXNzYWdlczogQ2xpZW50TWVzc2FnZVtdID0gW107XG4gIG1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuICBzdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLkRJU0NPTk5FQ1RFRDtcbiAgc2FuaXRpemVkU3R5bGVzRmlsZTogU2FmZVJlc291cmNlVXJsID0gJyc7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IENvbm5lY3Rpb25TdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzO1xuXG4gIHByaXZhdGUgbG9yYUNsaWVudFNlcnZpY2U6IExvcmFDbGllbnRTZXJ2aWNlID0gaW5qZWN0KExvcmFDbGllbnRTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBvbk1lc3NhZ2VMaXN0ZW5lcjogT21pdFRoaXNQYXJhbWV0ZXI8KG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpID0+IHZvaWQ+O1xuICBwcml2YXRlIHJlYWRvbmx5IG9uU3RhdHVzTGlzdGVuZXI6IE9taXRUaGlzUGFyYW1ldGVyPChzdGF0dXM6IENvbm5lY3Rpb25TdGF0dXMpID0+IHZvaWQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgICB0aGlzLm9uTWVzc2FnZUxpc3RlbmVyID0gdGhpcy5vbk1lc3NhZ2VSZWNlaXZlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25TdGF0dXNMaXN0ZW5lciA9IHRoaXMub25TdGF0dXMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9uKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5vbignc3RhdHVzJywgdGhpcy5vblN0YXR1c0xpc3RlbmVyKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29ubmVjdCgpLnRoZW4oKTtcbiAgICBpZiAodGhpcy5zdHlsZXNGaWxlKSB7XG4gICAgICB0aGlzLnNhbml0aXplZFN0eWxlc0ZpbGUgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodGhpcy5zdHlsZXNGaWxlKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjb25uZWN0KCkge1xuICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5DT05ORUNUSU5HO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZXNzaW9uSWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTE9SQV9DTElFTlRfU0VTU0lPTl9JRCcpIHx8IGF3YWl0IHRoaXMubG9yYUNsaWVudFNlcnZpY2UuY3JlYXRlU2Vzc2lvbih0aGlzLnRva2VuKTtcblxuICAgICAgaWYgKCFzZXNzaW9uSWQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZWNlaXZlIHNlc3Npb24gaWRcIik7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5FUlJPUjtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmNvbm5lY3Qoe3Nlc3Npb25JZCwgbG9hZEhpc3Rvcnk6IGZhbHNlfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5FUlJPUjtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVJbmplY3RvcigpIHtcbiAgICByZXR1cm4gSW5qZWN0b3IuY3JlYXRlKHtwcm92aWRlcnM6IFt7cHJvdmlkZTogJ3BhcnRzVGFibGVDb21wb25lbnQnLCB1c2VWYWx1ZTogdGhpcy5wYXJ0c1RhYmxlQ29tcG9uZW50fV19KTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKCkge1xuICAgIGlmICh0aGlzLm1lc3NhZ2UudHJpbSgpKSB7XG4gICAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLnNlbmRNZXNzYWdlKHRoaXMubWVzc2FnZSk7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICB9XG4gIH1cblxuICBvbk1lc3NhZ2VDaGFuZ2VkKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cblxuICBvbkVudGVyUHJlc3NlZCgpIHtcbiAgICB0aGlzLnNlbmRNZXNzYWdlKCk7XG4gIH1cblxuICBvbkNsaWNrUmVjb25uZWN0KCkge1xuICAgIHRoaXMuY29ubmVjdCgpLnRoZW4oKTtcbiAgfVxuXG4gIG9uTWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2VzID0gdGhpcy5sb3JhQ2xpZW50U2VydmljZS5nZXRNZXNzYWdlcygpO1xuXG4gICAgaWYgKG1lc3NhZ2UudXNlciAhPT0gJ21lJykge1xuICAgICAgdGhpcy5vbk1lc3NhZ2UuZW1pdChtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZS53aWRnZXQ/LndpZGdldE5hbWUgPT09IFwiVGlja2V0XCIgJiYgbWVzc2FnZS53aWRnZXQud2lkZ2V0UHJvcHMudGlja2V0KSB7XG4gICAgICB0aGlzLm9uVGlja2V0Q3JlYXRlZC5lbWl0KG1lc3NhZ2Uud2lkZ2V0LndpZGdldFByb3BzLnRpY2tldCk7XG4gICAgfVxuICB9XG5cbiAgb25TdGF0dXMoc3RhdHVzOiBDb25uZWN0aW9uU3RhdHVzKSB7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9mZignbWVzc2FnZScsIHRoaXMub25NZXNzYWdlTGlzdGVuZXIpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub2ZmKCdzdGF0dXMnLCB0aGlzLm9uU3RhdHVzTGlzdGVuZXIpO1xuICB9XG59XG4iXX0=