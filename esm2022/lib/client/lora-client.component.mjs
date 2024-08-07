import { Component, Input, ViewEncapsulation } from '@angular/core';
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
    messages = [];
    message = '';
    status = ConnectionStatus.DISCONNECTED;
    onMessageListener;
    onStatusListener;
    constructor(loraClientService) {
        this.loraClientService = loraClientService;
        this.onMessageListener = this.onMessage.bind(this);
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
    onMessage(message) {
        this.messages = this.loraClientService.getMessages();
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: LoraClient, isStandalone: true, selector: "lora-client", inputs: { sessionUrl: "sessionUrl", socketUrl: "socketUrl", height: "height" }, ngImport: i0, template: `
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
    </div>`, isInline: true, styles: [":host{--lora-client-background: transparent;--lora-client-button-main-color: #000;--lora-client-button-text-color: #fff;--lora-client-button-hover-color: #3f3f3f;--lora-client-button-active-color: #5b5b5b}.client{background:var(--lora-client-background)}.client__container{display:flex;flex-direction:column}.client__container *{box-sizing:border-box}.client__status{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.client__status button{background:var(--lora-client-button-main-color);color:var(--lora-client-button-text-color);margin-top:8px;padding:8px;border:none;cursor:pointer}.client__status button:hover{background:var(--lora-client-button-hover-color)}.client__status button:active{background:var(--lora-client-button-active-color)}.client__messages{display:block;border:1px solid #dcdcdc;border-bottom:none;height:100%;flex-grow:1;flex-shrink:1;overflow:hidden}.client__input{border:1px solid #dcdcdc;border-top:none;display:flex;flex-direction:row;flex-grow:0;flex-shrink:0}.client__input-message{flex-grow:1;padding:4px}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "component", type: ClientMessageInputComponent, selector: "client-message-input", inputs: ["message"], outputs: ["onMessageChanged", "onEnterPressed"] }, { kind: "component", type: MessageSendComponent, selector: "client-message-send", outputs: ["onClickSend"] }, { kind: "component", type: MessagesComponent, selector: "client-messages", inputs: ["messages"] }, { kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.ShadowDom });
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
    </div>`, encapsulation: ViewEncapsulation.ShadowDom, styles: [":host{--lora-client-background: transparent;--lora-client-button-main-color: #000;--lora-client-button-text-color: #fff;--lora-client-button-hover-color: #3f3f3f;--lora-client-button-active-color: #5b5b5b}.client{background:var(--lora-client-background)}.client__container{display:flex;flex-direction:column}.client__container *{box-sizing:border-box}.client__status{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.client__status button{background:var(--lora-client-button-main-color);color:var(--lora-client-button-text-color);margin-top:8px;padding:8px;border:none;cursor:pointer}.client__status button:hover{background:var(--lora-client-button-hover-color)}.client__status button:active{background:var(--lora-client-button-active-color)}.client__messages{display:block;border:1px solid #dcdcdc;border-bottom:none;height:100%;flex-grow:1;flex-shrink:1;overflow:hidden}.client__input{border:1px solid #dcdcdc;border-top:none;display:flex;flex-direction:row;flex-grow:0;flex-shrink:0}.client__input-message{flex-grow:1;padding:4px}\n"] }]
        }], ctorParameters: () => [{ type: i1.LoraClientService }], propDecorators: { sessionUrl: [{
                type: Input,
                args: ['sessionUrl']
            }], socketUrl: [{
                type: Input,
                args: ['socketUrl']
            }], height: [{
                type: Input,
                args: ['height']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9yYS1jbGllbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvY2xpZW50L2xvcmEtY2xpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBcUIsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxnQkFBZ0IsRUFBb0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNyRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUU1RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7O0FBMENqRSxNQUFNLE9BQU8sVUFBVTtJQVlEO0lBWEMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNqQixTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFFL0IsUUFBUSxHQUFvQixFQUFFLENBQUM7SUFDL0IsT0FBTyxHQUFXLEVBQUUsQ0FBQztJQUNyQixNQUFNLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBRS9CLGlCQUFpQixDQUFzRDtJQUN2RSxnQkFBZ0IsQ0FBd0Q7SUFFaEYsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDdEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMs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Q0FqQ0MsV0FBVywrQkFBMkIsMkJBQTJCLHVJQUFFLG9CQUFvQiwwRkFBRSxpQkFBaUIsa0ZBQUUsT0FBTywyRUFBRSxJQUFJOzsyRkFxQ3hILFVBQVU7a0JBeEN0QixTQUFTOytCQUNFLGFBQWEsY0FDWCxJQUFJLFdBQ1AsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLDJCQUEyQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFDMUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBZ0NELGlCQUNNLGlCQUFpQixDQUFDLFNBQVM7c0ZBSXJCLFVBQVU7c0JBQTlCLEtBQUs7dUJBQUMsWUFBWTtnQkFDQyxTQUFTO3NCQUE1QixLQUFLO3VCQUFDLFdBQVc7Z0JBQ0EsTUFBTTtzQkFBdkIsS0FBSzt1QkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge05nRm9yLCBOZ0lmLCBOZ1N0eWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0Nvbm5lY3Rpb25TdGF0dXMsIExvcmFDbGllbnRTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9sb3JhLWNsaWVudC5zZXJ2aWNlJztcbmltcG9ydCB7TWVzc2FnZUNvbXBvbmVudH0gZnJvbSBcIi4uL21lc3NhZ2UvbWVzc2FnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2xpZW50TWVzc2FnZUlucHV0Q29tcG9uZW50fSBmcm9tIFwiLi4vbWVzc2FnZS1pbnB1dC9tZXNzYWdlLWlucHV0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNZXNzYWdlU2VuZENvbXBvbmVudH0gZnJvbSBcIi4uL21lc3NhZ2Utc2VuZC9tZXNzYWdlLXNlbmQuY29tcG9uZW50XCI7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2V9IGZyb20gXCIuLi8uLi90eXBlcy9DbGllbnRNZXNzYWdlXCI7XG5pbXBvcnQge01lc3NhZ2VzQ29tcG9uZW50fSBmcm9tIFwiLi4vbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xvcmEtY2xpZW50JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0Zvcm1zTW9kdWxlLCBOZ0ZvciwgTWVzc2FnZUNvbXBvbmVudCwgQ2xpZW50TWVzc2FnZUlucHV0Q29tcG9uZW50LCBNZXNzYWdlU2VuZENvbXBvbmVudCwgTWVzc2FnZXNDb21wb25lbnQsIE5nU3R5bGUsIE5nSWZdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX2NvbnRhaW5lclwiIFtuZ1N0eWxlXT1cIntoZWlnaHQ6aGVpZ2h0KydweCd9XCI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXMgPT09IENvbm5lY3Rpb25TdGF0dXMuQ09OTkVDVEVEXCI+XG4gICAgICAgIDxjbGllbnQtbWVzc2FnZXMgY2xhc3M9XCJjbGllbnRfX21lc3NhZ2VzXCIgW21lc3NhZ2VzXT1cIm1lc3NhZ2VzXCIvPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX2lucHV0XCI+XG4gICAgICAgICAgPGNsaWVudC1tZXNzYWdlLWlucHV0XG4gICAgICAgICAgICBjbGFzcz1cImNsaWVudF9faW5wdXQtbWVzc2FnZVwiXG4gICAgICAgICAgICBbbWVzc2FnZV09XCJtZXNzYWdlXCJcbiAgICAgICAgICAgIChvbk1lc3NhZ2VDaGFuZ2VkKT1cIm9uTWVzc2FnZUNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAob25FbnRlclByZXNzZWQpPVwib25FbnRlclByZXNzZWQoKVwiXG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxjbGllbnQtbWVzc2FnZS1zZW5kIGNsYXNzPVwiY2xpZW50X19pbnB1dC1zdWJtaXRcIiAob25DbGlja1NlbmQpPVwic2VuZE1lc3NhZ2UoKVwiLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXM9PT1Db25uZWN0aW9uU3RhdHVzLkRJU0NPTk5FQ1RFRFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19zdGF0dXNcIj5EaXNjb25uZWN0ZWQ8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cz09PUNvbm5lY3Rpb25TdGF0dXMuQ09OTkVDVElOR1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50X19zdGF0dXNcIj5Db25uZWN0aW5nLi4uPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0dXM9PT1Db25uZWN0aW9uU3RhdHVzLkVSUk9SXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPlxuICAgICAgICAgIDxkaXY+Q29ubmVjdGlvbiBGYWlsZWQ8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJvbkNsaWNrUmVjb25uZWN0KClcIj5UcnkgYWdhaW48L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5gLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb20sXG4gIHN0eWxlVXJsczogWycuL2xvcmEtY2xpZW50LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTG9yYUNsaWVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCdzZXNzaW9uVXJsJykgc2Vzc2lvblVybCA9ICcnO1xuICBASW5wdXQoJ3NvY2tldFVybCcpIHNvY2tldFVybCA9ICcnO1xuICBASW5wdXQoJ2hlaWdodCcsKSBoZWlnaHQgPSA1MDA7XG5cbiAgbWVzc2FnZXM6IENsaWVudE1lc3NhZ2VbXSA9IFtdO1xuICBtZXNzYWdlOiBzdHJpbmcgPSAnJztcbiAgc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5ESVNDT05ORUNURUQ7XG5cbiAgcHJpdmF0ZSBvbk1lc3NhZ2VMaXN0ZW5lcjogT21pdFRoaXNQYXJhbWV0ZXI8KG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpID0+IHZvaWQ+O1xuICBwcml2YXRlIG9uU3RhdHVzTGlzdGVuZXI6IE9taXRUaGlzUGFyYW1ldGVyPChzdGF0dXM6IENvbm5lY3Rpb25TdGF0dXMpID0+IHZvaWQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9yYUNsaWVudFNlcnZpY2U6IExvcmFDbGllbnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lciA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblN0YXR1c0xpc3RlbmVyID0gdGhpcy5vblN0YXR1cy5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub24oJ21lc3NhZ2UnLCB0aGlzLm9uTWVzc2FnZUxpc3RlbmVyKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9uKCdzdGF0dXMnLCB0aGlzLm9uU3RhdHVzTGlzdGVuZXIpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb25uZWN0KCkudGhlbigpO1xuICB9XG5cblxuICBhc3luYyBjb25uZWN0KCkge1xuICAgIHRoaXMuc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5DT05ORUNUSU5HO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHdpbmRvdy5mZXRjaCh0aGlzLnNlc3Npb25VcmwpO1xuICAgICAgY29uc3Qgc2Vzc2lvbklkID0gcmVzcG9uc2Uuc3RhdHVzID09PSAyMDAgPyBhd2FpdCByZXNwb25zZS50ZXh0KCkgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmKCFzZXNzaW9uSWQpe1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlY2VpdmUgc2Vzc2lvbiBpZFwiKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLkVSUk9SO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMubG9yYUNsaWVudFNlcnZpY2UuY29ubmVjdCh0aGlzLnNvY2tldFVybCwgc2Vzc2lvbklkKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgdGhpcy5zdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLkVSUk9SO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRNZXNzYWdlKCkge1xuICAgIGlmICh0aGlzLm1lc3NhZ2UudHJpbSgpKSB7XG4gICAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLnNlbmRNZXNzYWdlKHRoaXMubWVzc2FnZSk7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICB9XG4gIH1cblxuICBvbk1lc3NhZ2VDaGFuZ2VkKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cblxuICBvbkVudGVyUHJlc3NlZCgpIHtcbiAgICB0aGlzLnNlbmRNZXNzYWdlKCk7XG4gIH1cblxuICBvbkNsaWNrUmVjb25uZWN0KCkge1xuICAgIHRoaXMuY29ubmVjdCgpLnRoZW4oKTtcbiAgfVxuXG4gIG9uTWVzc2FnZShtZXNzYWdlOiBDbGllbnRNZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IHRoaXMubG9yYUNsaWVudFNlcnZpY2UuZ2V0TWVzc2FnZXMoKTtcbiAgfVxuXG4gIG9uU3RhdHVzKHN0YXR1czogQ29ubmVjdGlvblN0YXR1cykge1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5vZmYoJ21lc3NhZ2UnLCB0aGlzLm9uTWVzc2FnZUxpc3RlbmVyKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9mZignc3RhdHVzJywgdGhpcy5vblN0YXR1c0xpc3RlbmVyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZWFkb25seSBDb25uZWN0aW9uU3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cztcbn1cbiJdfQ==