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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9yYS1jbGllbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvY2xpZW50L2xvcmEtY2xpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLGlCQUFpQixFQUVqQixRQUFRLEVBQUUsTUFBTSxFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RixPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNyRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUM1RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7O0FBMkNqRSxNQUFNLE9BQU8sVUFBVTtJQW1CRDtJQWxCSixLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ1YsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNULFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDUCxtQkFBbUIsR0FBcUIsSUFBSSxDQUFDO0lBRWpFLFNBQVMsR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFFckYsUUFBUSxHQUFvQixFQUFFLENBQUM7SUFDL0IsT0FBTyxHQUFXLEVBQUUsQ0FBQztJQUNyQixNQUFNLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBQ3ZDLG1CQUFtQixHQUFvQixFQUFFLENBQUM7SUFFdkIsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFFL0MsaUJBQWlCLEdBQXNCLE1BQU0sQ0FBQyxpQkFBaUIs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b3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVHlwZSxcbiAgSW5qZWN0b3IsIGluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtOZ0ZvciwgTmdJZiwgTmdTdHlsZSwgTmdDb21wb25lbnRPdXRsZXR9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7Q29ubmVjdGlvblN0YXR1cywgTG9yYUNsaWVudFNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xvcmEtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlLWlucHV0L21lc3NhZ2UtaW5wdXQuY29tcG9uZW50XCI7XG5pbXBvcnQge01lc3NhZ2VTZW5kQ29tcG9uZW50fSBmcm9tIFwiLi4vbWVzc2FnZS1zZW5kL21lc3NhZ2Utc2VuZC5jb21wb25lbnRcIjtcbmltcG9ydCB7TWVzc2FnZXNDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlcy9tZXNzYWdlcy5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2xpZW50TWVzc2FnZX0gZnJvbSAnLi4vLi4vdHlwZXMvQ2xpZW50TWVzc2FnZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xvcmEtY2xpZW50JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW05nRm9yLCBDbGllbnRNZXNzYWdlSW5wdXRDb21wb25lbnQsIE1lc3NhZ2VTZW5kQ29tcG9uZW50LCBNZXNzYWdlc0NvbXBvbmVudCwgTmdTdHlsZSwgTmdJZiwgTmdDb21wb25lbnRPdXRsZXRdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb20sXG4gIHN0eWxlVXJsczogWycuL2xvcmEtY2xpZW50LmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNsaWVudF9fY29udGFpbmVyXCIgW25nU3R5bGVdPVwie2hlaWdodDpoZWlnaHQrJ3B4J31cIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXMgPT09IENvbm5lY3Rpb25TdGF0dXMuQ09OTkVDVEVEXCI+XG4gICAgICAgIDxjbGllbnQtbWVzc2FnZXMgY2xhc3M9XCJjbGllbnRfX21lc3NhZ2VzXCIgW21lc3NhZ2VzXT1cIm1lc3NhZ2VzXCIgW3BhcnRzVGFibGVDb21wb25lbnRdPVwicGFydHNUYWJsZUNvbXBvbmVudFwiLz5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19pbnB1dFwiPlxuICAgICAgICAgIDxjbGllbnQtbWVzc2FnZS1pbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJjbGllbnRfX2lucHV0LW1lc3NhZ2VcIlxuICAgICAgICAgICAgW21lc3NhZ2VdPVwibWVzc2FnZVwiXG4gICAgICAgICAgICAob25NZXNzYWdlQ2hhbmdlZCk9XCJvbk1lc3NhZ2VDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgKG9uRW50ZXJQcmVzc2VkKT1cIm9uRW50ZXJQcmVzc2VkKClcIlxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8Y2xpZW50LW1lc3NhZ2Utc2VuZCBjbGFzcz1cImNsaWVudF9faW5wdXQtc3VibWl0XCIgKG9uQ2xpY2tTZW5kKT1cInNlbmRNZXNzYWdlKClcIi8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdHVzPT09Q29ubmVjdGlvblN0YXR1cy5ESVNDT05ORUNURURcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9fc3RhdHVzXCI+RGlzY29ubmVjdGVkPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXM9PT1Db25uZWN0aW9uU3RhdHVzLkNPTk5FQ1RJTkdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9fc3RhdHVzXCI+Q29ubmVjdGluZy4uLjwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdHVzPT09Q29ubmVjdGlvblN0YXR1cy5FUlJPUlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19zdGF0dXNcIj5cbiAgICAgICAgICA8ZGl2PkNvbm5lY3Rpb24gRmFpbGVkPC9kaXY+XG4gICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwib25DbGlja1JlY29ubmVjdCgpXCI+VHJ5IGFnYWluPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bGluayAqbmdJZj1cInNhbml0aXplZFN0eWxlc0ZpbGVcIiByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgW2hyZWZdPVwic2FuaXRpemVkU3R5bGVzRmlsZVwiLz5cbiAgICA8L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIExvcmFDbGllbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgndG9rZW4nKSB0b2tlbiA9ICcnO1xuICBASW5wdXQoJ2hlaWdodCcpIGhlaWdodCA9IDUwMDtcbiAgQElucHV0KCdzdHlsZXNGaWxlJykgc3R5bGVzRmlsZSA9ICcnO1xuICBASW5wdXQoJ3BhcnRzVGFibGVDb21wb25lbnQnKSBwYXJ0c1RhYmxlQ29tcG9uZW50OiBUeXBlPGFueT4gfCBudWxsID0gbnVsbDtcblxuICBAT3V0cHV0KCkgb25NZXNzYWdlOiBFdmVudEVtaXR0ZXI8Q2xpZW50TWVzc2FnZT4gPSBuZXcgRXZlbnRFbWl0dGVyPENsaWVudE1lc3NhZ2U+KCk7XG5cbiAgbWVzc2FnZXM6IENsaWVudE1lc3NhZ2VbXSA9IFtdO1xuICBtZXNzYWdlOiBzdHJpbmcgPSAnJztcbiAgc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5ESVNDT05ORUNURUQ7XG4gIHNhbml0aXplZFN0eWxlc0ZpbGU6IFNhZmVSZXNvdXJjZVVybCA9ICcnO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBDb25uZWN0aW9uU3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cztcblxuICBwcml2YXRlIGxvcmFDbGllbnRTZXJ2aWNlOiBMb3JhQ2xpZW50U2VydmljZSA9IGluamVjdChMb3JhQ2xpZW50U2VydmljZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgb25NZXNzYWdlTGlzdGVuZXI6IE9taXRUaGlzUGFyYW1ldGVyPChtZXNzYWdlOiBDbGllbnRNZXNzYWdlKSA9PiB2b2lkPjtcbiAgcHJpdmF0ZSByZWFkb25seSBvblN0YXR1c0xpc3RlbmVyOiBPbWl0VGhpc1BhcmFtZXRlcjwoc3RhdHVzOiBDb25uZWN0aW9uU3RhdHVzKSA9PiB2b2lkPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gICAgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lciA9IHRoaXMub25NZXNzYWdlUmVjZWl2ZWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uU3RhdHVzTGlzdGVuZXIgPSB0aGlzLm9uU3RhdHVzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5vbignbWVzc2FnZScsIHRoaXMub25NZXNzYWdlTGlzdGVuZXIpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub24oJ3N0YXR1cycsIHRoaXMub25TdGF0dXNMaXN0ZW5lcik7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbm5lY3QoKS50aGVuKCk7XG4gICAgaWYgKHRoaXMuc3R5bGVzRmlsZSkge1xuICAgICAgdGhpcy5zYW5pdGl6ZWRTdHlsZXNGaWxlID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHRoaXMuc3R5bGVzRmlsZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY29ubmVjdCgpIHtcbiAgICB0aGlzLnN0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXMuQ09OTkVDVElORztcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2Vzc2lvbklkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0xPUkFfQ0xJRU5UX1NFU1NJT05fSUQnKSB8fCBhd2FpdCB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmNyZWF0ZVNlc3Npb24odGhpcy50b2tlbik7XG5cbiAgICAgIGlmICghc2Vzc2lvbklkKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcmVjZWl2ZSBzZXNzaW9uIGlkXCIpO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXMuRVJST1I7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5jb25uZWN0KHtzZXNzaW9uSWQsIGxvYWRIaXN0b3J5OiBmYWxzZX0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICB0aGlzLnN0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXMuRVJST1I7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlSW5qZWN0b3IoKSB7XG4gICAgcmV0dXJuIEluamVjdG9yLmNyZWF0ZSh7cHJvdmlkZXJzOiBbe3Byb3ZpZGU6ICdwYXJ0c1RhYmxlQ29tcG9uZW50JywgdXNlVmFsdWU6IHRoaXMucGFydHNUYWJsZUNvbXBvbmVudH1dfSk7XG4gIH1cblxuICBzZW5kTWVzc2FnZSgpIHtcbiAgICBpZiAodGhpcy5tZXNzYWdlLnRyaW0oKSkge1xuICAgICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5zZW5kTWVzc2FnZSh0aGlzLm1lc3NhZ2UpO1xuICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgb25NZXNzYWdlQ2hhbmdlZChtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB9XG5cbiAgb25FbnRlclByZXNzZWQoKSB7XG4gICAgdGhpcy5zZW5kTWVzc2FnZSgpO1xuICB9XG5cbiAgb25DbGlja1JlY29ubmVjdCgpIHtcbiAgICB0aGlzLmNvbm5lY3QoKS50aGVuKCk7XG4gIH1cblxuICBvbk1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlOiBDbGllbnRNZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IHRoaXMubG9yYUNsaWVudFNlcnZpY2UuZ2V0TWVzc2FnZXMoKTtcblxuICAgIGlmIChtZXNzYWdlLnVzZXIgIT09ICdtZScpIHtcbiAgICAgIHRoaXMub25NZXNzYWdlLmVtaXQobWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgb25TdGF0dXMoc3RhdHVzOiBDb25uZWN0aW9uU3RhdHVzKSB7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9mZignbWVzc2FnZScsIHRoaXMub25NZXNzYWdlTGlzdGVuZXIpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub2ZmKCdzdGF0dXMnLCB0aGlzLm9uU3RhdHVzTGlzdGVuZXIpO1xuICB9XG59XG4iXX0=