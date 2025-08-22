import { Component, EventEmitter, Input, Output, ViewEncapsulation, Injector, inject, } from '@angular/core';
import { NgFor, NgIf, NgStyle, NgComponentOutlet } from '@angular/common';
import { ConnectionStatus, LoraClientService, } from '../../services/lora-client.service';
import { ClientMessageInputComponent } from '../message-input/message-input.component';
import { MessageSendComponent } from '../message-send/message-send.component';
import { MessagesComponent } from '../messages/messages.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class LoraClient {
    sanitizer;
    height = 500;
    stylesFile = '';
    partsTableComponent = null;
    set serviceUrl(value) {
        this.loraClientService.setServiceUrl(value);
    }
    set authHeaderSupplier(value) {
        this.loraClientService.setAuthHeaderSupplier(value);
    }
    ;
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
    async ngOnInit() {
        if (this.status === ConnectionStatus.DISCONNECTED) {
            this.connect();
        }
        if (this.stylesFile) {
            this.sanitizedStylesFile = this.sanitizer.bypassSecurityTrustResourceUrl(this.stylesFile);
        }
    }
    async connect() {
        this.status = ConnectionStatus.CONNECTING;
        try {
            const sessionId = localStorage.getItem('LORA_CLIENT_SESSION_ID') ||
                (await this.loraClientService.createSession());
            if (!sessionId) {
                throw Error('Failed to receive session id');
            }
            await this.loraClientService.connect({ sessionId, loadHistory: false });
        }
        catch (e) {
            console.error('Connection error:', e);
            this.status = ConnectionStatus.ERROR;
        }
    }
    createInjector() {
        return Injector.create({
            providers: [
                { provide: 'partsTableComponent', useValue: this.partsTableComponent },
            ],
        });
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
        this.connect();
    }
    onMessageReceived(message) {
        this.messages = this.loraClientService.getMessages();
        if (message.user !== 'me') {
            this.onMessage.emit(message);
        }
        if (message.widget?.widgetName === 'Ticket' &&
            message.widget.widgetProps.ticket) {
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: LoraClient, isStandalone: true, selector: "lora-client", inputs: { height: "height", stylesFile: "stylesFile", partsTableComponent: "partsTableComponent", serviceUrl: "serviceUrl", authHeaderSupplier: "authHeaderSupplier" }, outputs: { onMessage: "onMessage", onTicketCreated: "onTicketCreated" }, ngImport: i0, template: `<div
    class="client__container"
    [ngStyle]="{ height: height + 'px' }"
  >
    <ng-container *ngIf="status === ConnectionStatus.CONNECTED">
      <client-messages
        class="client__messages"
        [messages]="messages"
        [partsTableComponent]="partsTableComponent"
      />

      <div class="client__input">
        <client-message-input
          class="client__input-message"
          [message]="message"
          (onMessageChanged)="onMessageChanged($event)"
          (onEnterPressed)="onEnterPressed()"
        />

        <client-message-send
          class="client__input-submit"
          (onClickSend)="sendMessage()"
        />
      </div>
    </ng-container>
    <ng-container *ngIf="status === ConnectionStatus.DISCONNECTED">
      <div class="client__status">Disconnected</div>
    </ng-container>
    <ng-container *ngIf="status === ConnectionStatus.CONNECTING">
      <div class="client__status">Connecting...</div>
    </ng-container>
    <ng-container *ngIf="status === ConnectionStatus.ERROR">
      <div class="client__status">
        <div class="client__error">
          <div class="client__error-message">Connection failed. Please try again.</div>
          <div class="client__error-actions">
            <button (click)="onClickReconnect()">Try again</button>
          </div>
        </div>
      </div>
    </ng-container>
    <link
      *ngIf="sanitizedStylesFile"
      rel="stylesheet"
      type="text/css"
      [href]="sanitizedStylesFile"
    />
  </div>`, isInline: true, styles: [":host{--background: var(--lora-client__background, transparent);--button-main-color: var(--lora-client__button-main-color, #000000);--button-text-color: var(--lora-client__button-text-color, #fff);--button-hover-color: var(--lora-client__button-hover-color, #3f3f3f);--button-active-color: var(--lora-client__button-active-color, #5b5b5b);--message-border-radius: var(--lora-client__message-border-radius, 16px);--message-color-1: var(--lora-client__message-color-1, #efefef);--message-color-2: var(--lora-client__message-color-2, #a6e4e7)}.client__container{display:flex;flex-direction:column;background:var(--background)}.client__container *{box-sizing:border-box}.client__status{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.client__status button{background:var(--button-main-color);color:var(--button-text-color);margin-top:8px;padding:8px;border:none;cursor:pointer}.client__status button:hover{background:var(--button-hover-color)}.client__status button:active{background:var(--button-active-color)}.client__messages{display:block;border:1px solid #dcdcdc;border-bottom:none;height:100%;flex-grow:1;flex-shrink:1;overflow:hidden}.client__input{border:1px solid #dcdcdc;border-top:none;display:flex;flex-direction:row;flex-grow:0;flex-shrink:0}.client__input-message{flex-grow:1;padding:4px}.client::-webkit-scrollbar{background-color:#fff;width:16px}.client::-webkit-scrollbar-track{background-color:#fff}.client::-webkit-scrollbar-track:hover{background-color:#f4f4f4}.client::-webkit-scrollbar-thumb{background-color:#babac0;border-radius:16px;border:5px solid #fff}.client::-webkit-scrollbar-thumb:hover{background-color:#a0a0a5;border:4px solid #f4f4f4}.client::-webkit-scrollbar-button{display:none}.client__error{max-width:360px;text-align:center;font-family:Arial,sans-serif}.client__error-message{font-size:14px;margin-bottom:12px}.client__error-actions button+button{margin-left:8px}\n"], dependencies: [{ kind: "component", type: ClientMessageInputComponent, selector: "client-message-input", inputs: ["message"], outputs: ["onMessageChanged", "onEnterPressed"] }, { kind: "component", type: MessageSendComponent, selector: "client-message-send", outputs: ["onClickSend"] }, { kind: "component", type: MessagesComponent, selector: "client-messages", inputs: ["messages", "partsTableComponent"] }, { kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.ShadowDom });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClient, decorators: [{
            type: Component,
            args: [{ selector: 'lora-client', standalone: true, imports: [
                        NgFor,
                        ClientMessageInputComponent,
                        MessageSendComponent,
                        MessagesComponent,
                        NgStyle,
                        NgIf,
                        NgComponentOutlet,
                    ], encapsulation: ViewEncapsulation.ShadowDom, template: `<div
    class="client__container"
    [ngStyle]="{ height: height + 'px' }"
  >
    <ng-container *ngIf="status === ConnectionStatus.CONNECTED">
      <client-messages
        class="client__messages"
        [messages]="messages"
        [partsTableComponent]="partsTableComponent"
      />

      <div class="client__input">
        <client-message-input
          class="client__input-message"
          [message]="message"
          (onMessageChanged)="onMessageChanged($event)"
          (onEnterPressed)="onEnterPressed()"
        />

        <client-message-send
          class="client__input-submit"
          (onClickSend)="sendMessage()"
        />
      </div>
    </ng-container>
    <ng-container *ngIf="status === ConnectionStatus.DISCONNECTED">
      <div class="client__status">Disconnected</div>
    </ng-container>
    <ng-container *ngIf="status === ConnectionStatus.CONNECTING">
      <div class="client__status">Connecting...</div>
    </ng-container>
    <ng-container *ngIf="status === ConnectionStatus.ERROR">
      <div class="client__status">
        <div class="client__error">
          <div class="client__error-message">Connection failed. Please try again.</div>
          <div class="client__error-actions">
            <button (click)="onClickReconnect()">Try again</button>
          </div>
        </div>
      </div>
    </ng-container>
    <link
      *ngIf="sanitizedStylesFile"
      rel="stylesheet"
      type="text/css"
      [href]="sanitizedStylesFile"
    />
  </div>`, styles: [":host{--background: var(--lora-client__background, transparent);--button-main-color: var(--lora-client__button-main-color, #000000);--button-text-color: var(--lora-client__button-text-color, #fff);--button-hover-color: var(--lora-client__button-hover-color, #3f3f3f);--button-active-color: var(--lora-client__button-active-color, #5b5b5b);--message-border-radius: var(--lora-client__message-border-radius, 16px);--message-color-1: var(--lora-client__message-color-1, #efefef);--message-color-2: var(--lora-client__message-color-2, #a6e4e7)}.client__container{display:flex;flex-direction:column;background:var(--background)}.client__container *{box-sizing:border-box}.client__status{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.client__status button{background:var(--button-main-color);color:var(--button-text-color);margin-top:8px;padding:8px;border:none;cursor:pointer}.client__status button:hover{background:var(--button-hover-color)}.client__status button:active{background:var(--button-active-color)}.client__messages{display:block;border:1px solid #dcdcdc;border-bottom:none;height:100%;flex-grow:1;flex-shrink:1;overflow:hidden}.client__input{border:1px solid #dcdcdc;border-top:none;display:flex;flex-direction:row;flex-grow:0;flex-shrink:0}.client__input-message{flex-grow:1;padding:4px}.client::-webkit-scrollbar{background-color:#fff;width:16px}.client::-webkit-scrollbar-track{background-color:#fff}.client::-webkit-scrollbar-track:hover{background-color:#f4f4f4}.client::-webkit-scrollbar-thumb{background-color:#babac0;border-radius:16px;border:5px solid #fff}.client::-webkit-scrollbar-thumb:hover{background-color:#a0a0a5;border:4px solid #f4f4f4}.client::-webkit-scrollbar-button{display:none}.client__error{max-width:360px;text-align:center;font-family:Arial,sans-serif}.client__error-message{font-size:14px;margin-bottom:12px}.client__error-actions button+button{margin-left:8px}\n"] }]
        }], ctorParameters: () => [{ type: i1.DomSanitizer }], propDecorators: { height: [{
                type: Input,
                args: ['height']
            }], stylesFile: [{
                type: Input,
                args: ['stylesFile']
            }], partsTableComponent: [{
                type: Input,
                args: ['partsTableComponent']
            }], serviceUrl: [{
                type: Input,
                args: [{ required: true, alias: 'serviceUrl' }]
            }], authHeaderSupplier: [{
                type: Input,
                args: [{ required: true, alias: 'authHeaderSupplier' }]
            }], onMessage: [{
                type: Output
            }], onTicketCreated: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9yYS1jbGllbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvY2xpZW50L2xvcmEtY2xpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLGlCQUFpQixFQUVqQixRQUFRLEVBQ1IsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFFLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sb0NBQW9DLENBQUM7QUFDNUMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDdkYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7OztBQW1FbkUsTUFBTSxPQUFPLFVBQVU7SUErQkQ7SUE5QkgsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNULFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDUCxtQkFBbUIsR0FBcUIsSUFBSSxDQUFDO0lBQzNFLElBQW9ELFVBQVUsQ0FBQyxLQUFhO1FBQzFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNELElBQTRELGtCQUFrQixDQUFDLEtBQW1CO1FBQ2hHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQUEsQ0FBQztJQUVRLFNBQVMsR0FDakIsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFDMUIsZUFBZSxHQUN2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TywyRUFDUCxJQUFJOzs0RkFzREssVUFBVTtrQkEvRHRCLFNBQVM7K0JBQ0UsYUFBYSxjQUNYLElBQUksV0FDUDt3QkFDUCxLQUFLO3dCQUNMLDJCQUEyQjt3QkFDM0Isb0JBQW9CO3dCQUNwQixpQkFBaUI7d0JBQ2pCLE9BQU87d0JBQ1AsSUFBSTt3QkFDSixpQkFBaUI7cUJBQ2xCLGlCQUNjLGlCQUFpQixDQUFDLFNBQVMsWUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBK0NIO2lGQUdVLE1BQU07c0JBQXRCLEtBQUs7dUJBQUMsUUFBUTtnQkFDTSxVQUFVO3NCQUE5QixLQUFLO3VCQUFDLFlBQVk7Z0JBQ1csbUJBQW1CO3NCQUFoRCxLQUFLO3VCQUFDLHFCQUFxQjtnQkFDd0IsVUFBVTtzQkFBN0QsS0FBSzt1QkFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtnQkFHYyxrQkFBa0I7c0JBQTdFLEtBQUs7dUJBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRTtnQkFJNUMsU0FBUztzQkFBbEIsTUFBTTtnQkFFRyxlQUFlO3NCQUF4QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVHlwZSxcbiAgSW5qZWN0b3IsXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgTmdGb3IsIE5nSWYsIE5nU3R5bGUsIE5nQ29tcG9uZW50T3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENvbm5lY3Rpb25TdGF0dXMsXG4gIExvcmFDbGllbnRTZXJ2aWNlLFxufSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9sb3JhLWNsaWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IENsaWVudE1lc3NhZ2VJbnB1dENvbXBvbmVudCB9IGZyb20gJy4uL21lc3NhZ2UtaW5wdXQvbWVzc2FnZS1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZVNlbmRDb21wb25lbnQgfSBmcm9tICcuLi9tZXNzYWdlLXNlbmQvbWVzc2FnZS1zZW5kLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXNzYWdlc0NvbXBvbmVudCB9IGZyb20gJy4uL21lc3NhZ2VzL21lc3NhZ2VzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDbGllbnRNZXNzYWdlIH0gZnJvbSAnLi4vLi4vdHlwZXMvQ2xpZW50TWVzc2FnZSc7XG5pbXBvcnQgeyBUaWNrZXRJbmZvcm1hdGlvbiB9IGZyb20gJ0AvbG9yYS1jbGllbnQvc3JjL3R5cGVzL1RpY2tldEluZm9ybWF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbG9yYS1jbGllbnQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgTmdGb3IsXG4gICAgQ2xpZW50TWVzc2FnZUlucHV0Q29tcG9uZW50LFxuICAgIE1lc3NhZ2VTZW5kQ29tcG9uZW50LFxuICAgIE1lc3NhZ2VzQ29tcG9uZW50LFxuICAgIE5nU3R5bGUsXG4gICAgTmdJZixcbiAgICBOZ0NvbXBvbmVudE91dGxldCxcbiAgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tLFxuICBzdHlsZVVybHM6IFsnLi9sb3JhLWNsaWVudC5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZTogYDxkaXZcbiAgICBjbGFzcz1cImNsaWVudF9fY29udGFpbmVyXCJcbiAgICBbbmdTdHlsZV09XCJ7IGhlaWdodDogaGVpZ2h0ICsgJ3B4JyB9XCJcbiAgPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXMgPT09IENvbm5lY3Rpb25TdGF0dXMuQ09OTkVDVEVEXCI+XG4gICAgICA8Y2xpZW50LW1lc3NhZ2VzXG4gICAgICAgIGNsYXNzPVwiY2xpZW50X19tZXNzYWdlc1wiXG4gICAgICAgIFttZXNzYWdlc109XCJtZXNzYWdlc1wiXG4gICAgICAgIFtwYXJ0c1RhYmxlQ29tcG9uZW50XT1cInBhcnRzVGFibGVDb21wb25lbnRcIlxuICAgICAgLz5cblxuICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9faW5wdXRcIj5cbiAgICAgICAgPGNsaWVudC1tZXNzYWdlLWlucHV0XG4gICAgICAgICAgY2xhc3M9XCJjbGllbnRfX2lucHV0LW1lc3NhZ2VcIlxuICAgICAgICAgIFttZXNzYWdlXT1cIm1lc3NhZ2VcIlxuICAgICAgICAgIChvbk1lc3NhZ2VDaGFuZ2VkKT1cIm9uTWVzc2FnZUNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgICAgKG9uRW50ZXJQcmVzc2VkKT1cIm9uRW50ZXJQcmVzc2VkKClcIlxuICAgICAgICAvPlxuXG4gICAgICAgIDxjbGllbnQtbWVzc2FnZS1zZW5kXG4gICAgICAgICAgY2xhc3M9XCJjbGllbnRfX2lucHV0LXN1Ym1pdFwiXG4gICAgICAgICAgKG9uQ2xpY2tTZW5kKT1cInNlbmRNZXNzYWdlKClcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cyA9PT0gQ29ubmVjdGlvblN0YXR1cy5ESVNDT05ORUNURURcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPkRpc2Nvbm5lY3RlZDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXMgPT09IENvbm5lY3Rpb25TdGF0dXMuQ09OTkVDVElOR1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9fc3RhdHVzXCI+Q29ubmVjdGluZy4uLjwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXMgPT09IENvbm5lY3Rpb25TdGF0dXMuRVJST1JcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19lcnJvclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX2Vycm9yLW1lc3NhZ2VcIj5Db25uZWN0aW9uIGZhaWxlZC4gUGxlYXNlIHRyeSBhZ2Fpbi48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19lcnJvci1hY3Rpb25zXCI+XG4gICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJvbkNsaWNrUmVjb25uZWN0KClcIj5UcnkgYWdhaW48L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bGlua1xuICAgICAgKm5nSWY9XCJzYW5pdGl6ZWRTdHlsZXNGaWxlXCJcbiAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgdHlwZT1cInRleHQvY3NzXCJcbiAgICAgIFtocmVmXT1cInNhbml0aXplZFN0eWxlc0ZpbGVcIlxuICAgIC8+XG4gIDwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIExvcmFDbGllbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgnaGVpZ2h0JykgaGVpZ2h0ID0gNTAwO1xuICBASW5wdXQoJ3N0eWxlc0ZpbGUnKSBzdHlsZXNGaWxlID0gJyc7XG4gIEBJbnB1dCgncGFydHNUYWJsZUNvbXBvbmVudCcpIHBhcnRzVGFibGVDb21wb25lbnQ6IFR5cGU8YW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoeyByZXF1aXJlZDogdHJ1ZSwgYWxpYXM6ICdzZXJ2aWNlVXJsJyB9KSBzZXQgc2VydmljZVVybCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5zZXRTZXJ2aWNlVXJsKHZhbHVlKTtcbiAgfVxuICBASW5wdXQoeyByZXF1aXJlZDogdHJ1ZSwgYWxpYXM6ICdhdXRoSGVhZGVyU3VwcGxpZXInIH0pIHNldCBhdXRoSGVhZGVyU3VwcGxpZXIodmFsdWU6ICgpID0+IHN0cmluZykge1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uuc2V0QXV0aEhlYWRlclN1cHBsaWVyKHZhbHVlKTtcbiAgfTtcblxuICBAT3V0cHV0KCkgb25NZXNzYWdlOiBFdmVudEVtaXR0ZXI8Q2xpZW50TWVzc2FnZT4gPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8Q2xpZW50TWVzc2FnZT4oKTtcbiAgQE91dHB1dCgpIG9uVGlja2V0Q3JlYXRlZDogRXZlbnRFbWl0dGVyPFRpY2tldEluZm9ybWF0aW9uPiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxUaWNrZXRJbmZvcm1hdGlvbj4oKTtcblxuICBtZXNzYWdlczogQ2xpZW50TWVzc2FnZVtdID0gW107XG4gIG1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuICBzdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLkRJU0NPTk5FQ1RFRDtcbiAgc2FuaXRpemVkU3R5bGVzRmlsZTogU2FmZVJlc291cmNlVXJsID0gJyc7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IENvbm5lY3Rpb25TdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzO1xuXG4gIHByaXZhdGUgbG9yYUNsaWVudFNlcnZpY2U6IExvcmFDbGllbnRTZXJ2aWNlID0gaW5qZWN0KExvcmFDbGllbnRTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBvbk1lc3NhZ2VMaXN0ZW5lcjogT21pdFRoaXNQYXJhbWV0ZXI8XG4gICAgKG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpID0+IHZvaWRcbiAgPjtcbiAgcHJpdmF0ZSByZWFkb25seSBvblN0YXR1c0xpc3RlbmVyOiBPbWl0VGhpc1BhcmFtZXRlcjxcbiAgICAoc3RhdHVzOiBDb25uZWN0aW9uU3RhdHVzKSA9PiB2b2lkXG4gID47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIHRoaXMub25NZXNzYWdlTGlzdGVuZXIgPSB0aGlzLm9uTWVzc2FnZVJlY2VpdmVkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblN0YXR1c0xpc3RlbmVyID0gdGhpcy5vblN0YXR1cy5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub24oJ21lc3NhZ2UnLCB0aGlzLm9uTWVzc2FnZUxpc3RlbmVyKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9uKCdzdGF0dXMnLCB0aGlzLm9uU3RhdHVzTGlzdGVuZXIpO1xuICB9XG5cbiAgYXN5bmMgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuc3RhdHVzID09PSBDb25uZWN0aW9uU3RhdHVzLkRJU0NPTk5FQ1RFRCkge1xuICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN0eWxlc0ZpbGUpIHtcbiAgICAgIHRoaXMuc2FuaXRpemVkU3R5bGVzRmlsZSA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChcbiAgICAgICAgdGhpcy5zdHlsZXNGaWxlXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNvbm5lY3QoKSB7XG4gICAgdGhpcy5zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLkNPTk5FQ1RJTkc7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNlc3Npb25JZCA9XG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdMT1JBX0NMSUVOVF9TRVNTSU9OX0lEJykgfHxcbiAgICAgICAgKGF3YWl0IHRoaXMubG9yYUNsaWVudFNlcnZpY2UuY3JlYXRlU2Vzc2lvbigpKTtcblxuICAgICAgaWYgKCFzZXNzaW9uSWQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0ZhaWxlZCB0byByZWNlaXZlIHNlc3Npb24gaWQnKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5jb25uZWN0KHsgc2Vzc2lvbklkLCBsb2FkSGlzdG9yeTogZmFsc2UgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcignQ29ubmVjdGlvbiBlcnJvcjonLCBlKTtcbiAgICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5FUlJPUjtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVJbmplY3RvcigpIHtcbiAgICByZXR1cm4gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6ICdwYXJ0c1RhYmxlQ29tcG9uZW50JywgdXNlVmFsdWU6IHRoaXMucGFydHNUYWJsZUNvbXBvbmVudCB9LFxuICAgICAgXSxcbiAgICB9KTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKCkge1xuICAgIGlmICh0aGlzLm1lc3NhZ2UudHJpbSgpKSB7XG4gICAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLnNlbmRNZXNzYWdlKHRoaXMubWVzc2FnZSk7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICB9XG4gIH1cblxuICBvbk1lc3NhZ2VDaGFuZ2VkKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cblxuICBvbkVudGVyUHJlc3NlZCgpIHtcbiAgICB0aGlzLnNlbmRNZXNzYWdlKCk7XG4gIH1cblxuICBvbkNsaWNrUmVjb25uZWN0KCkge1xuICAgIHRoaXMuY29ubmVjdCgpO1xuICB9XG5cbiAgb25NZXNzYWdlUmVjZWl2ZWQobWVzc2FnZTogQ2xpZW50TWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZXMgPSB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmdldE1lc3NhZ2VzKCk7XG5cbiAgICBpZiAobWVzc2FnZS51c2VyICE9PSAnbWUnKSB7XG4gICAgICB0aGlzLm9uTWVzc2FnZS5lbWl0KG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIG1lc3NhZ2Uud2lkZ2V0Py53aWRnZXROYW1lID09PSAnVGlja2V0JyAmJlxuICAgICAgbWVzc2FnZS53aWRnZXQud2lkZ2V0UHJvcHMudGlja2V0XG4gICAgKSB7XG4gICAgICB0aGlzLm9uVGlja2V0Q3JlYXRlZC5lbWl0KG1lc3NhZ2Uud2lkZ2V0LndpZGdldFByb3BzLnRpY2tldCk7XG4gICAgfVxuICB9XG5cbiAgb25TdGF0dXMoc3RhdHVzOiBDb25uZWN0aW9uU3RhdHVzKSB7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9mZignbWVzc2FnZScsIHRoaXMub25NZXNzYWdlTGlzdGVuZXIpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub2ZmKCdzdGF0dXMnLCB0aGlzLm9uU3RhdHVzTGlzdGVuZXIpO1xuICB9XG5cbn1cbiJdfQ==