import { Component, EventEmitter, Input, Output, ViewEncapsulation, Injector, inject } from '@angular/core';
import { NgFor, NgIf, NgStyle, NgComponentOutlet } from "@angular/common";
import { ConnectionStatus, LoraClientService } from '@/lora-client/src/services/lora-client.service';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9yYS1jbGllbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvY2xpZW50L2xvcmEtY2xpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLGlCQUFpQixFQUVqQixRQUFRLEVBQUUsTUFBTSxFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNuRyxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNyRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUU1RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7O0FBMENqRSxNQUFNLE9BQU8sVUFBVTtJQW1CRDtJQWxCSixLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ1YsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNULFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDUCxtQkFBbUIsR0FBcUIsSUFBSSxDQUFDO0lBRWpFLFNBQVMsR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFFckYsUUFBUSxHQUFvQixFQUFFLENBQUM7SUFDL0IsT0FBTyxHQUFXLEVBQUUsQ0FBQztJQUNyQixNQUFNLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBQ3ZDLG1CQUFtQixHQUFvQixFQUFFLENBQUM7SUFFdkIsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFFL0MsaUJBQWlCLEdBQXNCLE1BQU0sQ0FBQyxpQkFBaUIs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b3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVHlwZSxcbiAgSW5qZWN0b3IsIGluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtOZ0ZvciwgTmdJZiwgTmdTdHlsZSwgTmdDb21wb25lbnRPdXRsZXR9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7Q29ubmVjdGlvblN0YXR1cywgTG9yYUNsaWVudFNlcnZpY2V9IGZyb20gJ0AvbG9yYS1jbGllbnQvc3JjL3NlcnZpY2VzL2xvcmEtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlLWlucHV0L21lc3NhZ2UtaW5wdXQuY29tcG9uZW50XCI7XG5pbXBvcnQge01lc3NhZ2VTZW5kQ29tcG9uZW50fSBmcm9tIFwiLi4vbWVzc2FnZS1zZW5kL21lc3NhZ2Utc2VuZC5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2xpZW50TWVzc2FnZX0gZnJvbSBcIkAvbG9yYS1jbGllbnQvc3JjL3R5cGVzL0NsaWVudE1lc3NhZ2VcIjtcbmltcG9ydCB7TWVzc2FnZXNDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlcy9tZXNzYWdlcy5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbG9yYS1jbGllbnQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTmdGb3IsIENsaWVudE1lc3NhZ2VJbnB1dENvbXBvbmVudCwgTWVzc2FnZVNlbmRDb21wb25lbnQsIE1lc3NhZ2VzQ29tcG9uZW50LCBOZ1N0eWxlLCBOZ0lmLCBOZ0NvbXBvbmVudE91dGxldF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbSxcbiAgc3R5bGVVcmxzOiBbJy4vbG9yYS1jbGllbnQuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19jb250YWluZXJcIiBbbmdTdHlsZV09XCJ7aGVpZ2h0OmhlaWdodCsncHgnfVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cyA9PT0gQ29ubmVjdGlvblN0YXR1cy5DT05ORUNURURcIj5cbiAgICAgICAgPGNsaWVudC1tZXNzYWdlcyBjbGFzcz1cImNsaWVudF9fbWVzc2FnZXNcIiBbbWVzc2FnZXNdPVwibWVzc2FnZXNcIiBbcGFydHNUYWJsZUNvbXBvbmVudF09XCJwYXJ0c1RhYmxlQ29tcG9uZW50XCIvPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX2lucHV0XCI+XG4gICAgICAgICAgPGNsaWVudC1tZXNzYWdlLWlucHV0XG4gICAgICAgICAgICBjbGFzcz1cImNsaWVudF9faW5wdXQtbWVzc2FnZVwiXG4gICAgICAgICAgICBbbWVzc2FnZV09XCJtZXNzYWdlXCJcbiAgICAgICAgICAgIChvbk1lc3NhZ2VDaGFuZ2VkKT1cIm9uTWVzc2FnZUNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAob25FbnRlclByZXNzZWQpPVwib25FbnRlclByZXNzZWQoKVwiXG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxjbGllbnQtbWVzc2FnZS1zZW5kIGNsYXNzPVwiY2xpZW50X19pbnB1dC1zdWJtaXRcIiAob25DbGlja1NlbmQpPVwic2VuZE1lc3NhZ2UoKVwiLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXM9PT1Db25uZWN0aW9uU3RhdHVzLkRJU0NPTk5FQ1RFRFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19zdGF0dXNcIj5EaXNjb25uZWN0ZWQ8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cz09PUNvbm5lY3Rpb25TdGF0dXMuQ09OTkVDVElOR1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19zdGF0dXNcIj5Db25uZWN0aW5nLi4uPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXM9PT1Db25uZWN0aW9uU3RhdHVzLkVSUk9SXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPlxuICAgICAgICAgIDxkaXY+Q29ubmVjdGlvbiBGYWlsZWQ8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJvbkNsaWNrUmVjb25uZWN0KClcIj5UcnkgYWdhaW48L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxsaW5rICpuZ0lmPVwic2FuaXRpemVkU3R5bGVzRmlsZVwiIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBbaHJlZl09XCJzYW5pdGl6ZWRTdHlsZXNGaWxlXCIvPlxuICAgIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgTG9yYUNsaWVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCd0b2tlbicpIHRva2VuID0gJyc7XG4gIEBJbnB1dCgnaGVpZ2h0JykgaGVpZ2h0ID0gNTAwO1xuICBASW5wdXQoJ3N0eWxlc0ZpbGUnKSBzdHlsZXNGaWxlID0gJyc7XG4gIEBJbnB1dCgncGFydHNUYWJsZUNvbXBvbmVudCcpIHBhcnRzVGFibGVDb21wb25lbnQ6IFR5cGU8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSBvbk1lc3NhZ2U6IEV2ZW50RW1pdHRlcjxDbGllbnRNZXNzYWdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xpZW50TWVzc2FnZT4oKTtcblxuICBtZXNzYWdlczogQ2xpZW50TWVzc2FnZVtdID0gW107XG4gIG1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuICBzdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLkRJU0NPTk5FQ1RFRDtcbiAgc2FuaXRpemVkU3R5bGVzRmlsZTogU2FmZVJlc291cmNlVXJsID0gJyc7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IENvbm5lY3Rpb25TdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzO1xuXG4gIHByaXZhdGUgbG9yYUNsaWVudFNlcnZpY2U6IExvcmFDbGllbnRTZXJ2aWNlID0gaW5qZWN0KExvcmFDbGllbnRTZXJ2aWNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBvbk1lc3NhZ2VMaXN0ZW5lcjogT21pdFRoaXNQYXJhbWV0ZXI8KG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpID0+IHZvaWQ+O1xuICBwcml2YXRlIHJlYWRvbmx5IG9uU3RhdHVzTGlzdGVuZXI6IE9taXRUaGlzUGFyYW1ldGVyPChzdGF0dXM6IENvbm5lY3Rpb25TdGF0dXMpID0+IHZvaWQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgICB0aGlzLm9uTWVzc2FnZUxpc3RlbmVyID0gdGhpcy5vbk1lc3NhZ2VSZWNlaXZlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25TdGF0dXNMaXN0ZW5lciA9IHRoaXMub25TdGF0dXMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9uKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5vbignc3RhdHVzJywgdGhpcy5vblN0YXR1c0xpc3RlbmVyKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29ubmVjdCgpLnRoZW4oKTtcbiAgICBpZiAodGhpcy5zdHlsZXNGaWxlKSB7XG4gICAgICB0aGlzLnNhbml0aXplZFN0eWxlc0ZpbGUgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodGhpcy5zdHlsZXNGaWxlKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjb25uZWN0KCkge1xuICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5DT05ORUNUSU5HO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZXNzaW9uSWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTE9SQV9DTElFTlRfU0VTU0lPTl9JRCcpIHx8IGF3YWl0IHRoaXMubG9yYUNsaWVudFNlcnZpY2UuY3JlYXRlU2Vzc2lvbih0aGlzLnRva2VuKTtcblxuICAgICAgaWYgKCFzZXNzaW9uSWQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZWNlaXZlIHNlc3Npb24gaWRcIik7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5FUlJPUjtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmNvbm5lY3Qoe3Nlc3Npb25JZCwgbG9hZEhpc3Rvcnk6IGZhbHNlfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5FUlJPUjtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVJbmplY3RvcigpIHtcbiAgICByZXR1cm4gSW5qZWN0b3IuY3JlYXRlKHtwcm92aWRlcnM6IFt7cHJvdmlkZTogJ3BhcnRzVGFibGVDb21wb25lbnQnLCB1c2VWYWx1ZTogdGhpcy5wYXJ0c1RhYmxlQ29tcG9uZW50fV19KTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKCkge1xuICAgIGlmICh0aGlzLm1lc3NhZ2UudHJpbSgpKSB7XG4gICAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLnNlbmRNZXNzYWdlKHRoaXMubWVzc2FnZSk7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICB9XG4gIH1cblxuICBvbk1lc3NhZ2VDaGFuZ2VkKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cblxuICBvbkVudGVyUHJlc3NlZCgpIHtcbiAgICB0aGlzLnNlbmRNZXNzYWdlKCk7XG4gIH1cblxuICBvbkNsaWNrUmVjb25uZWN0KCkge1xuICAgIHRoaXMuY29ubmVjdCgpLnRoZW4oKTtcbiAgfVxuXG4gIG9uTWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2VzID0gdGhpcy5sb3JhQ2xpZW50U2VydmljZS5nZXRNZXNzYWdlcygpO1xuXG4gICAgaWYgKG1lc3NhZ2UudXNlciAhPT0gJ21lJykge1xuICAgICAgdGhpcy5vbk1lc3NhZ2UuZW1pdChtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBvblN0YXR1cyhzdGF0dXM6IENvbm5lY3Rpb25TdGF0dXMpIHtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2UuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub2ZmKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5vZmYoJ3N0YXR1cycsIHRoaXMub25TdGF0dXNMaXN0ZW5lcik7XG4gIH1cbn1cbiJdfQ==