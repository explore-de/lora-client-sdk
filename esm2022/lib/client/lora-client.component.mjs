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
    url = '';
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
        try {
            await this.loraClientService.connect(this.url);
        }
        catch (e) {
            console.error('Component error:', e);
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: LoraClient, isStandalone: true, selector: "lora-client", inputs: { url: "url", height: "height" }, ngImport: i0, template: `
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
        }], ctorParameters: () => [{ type: i1.LoraClientService }], propDecorators: { url: [{
                type: Input,
                args: ['url']
            }], height: [{
                type: Input,
                args: ['height']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9yYS1jbGllbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvY2xpZW50L2xvcmEtY2xpZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBcUIsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxnQkFBZ0IsRUFBb0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNyRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUU1RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7O0FBMENqRSxNQUFNLE9BQU8sVUFBVTtJQVdEO0lBVk4sR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNMLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFFL0IsUUFBUSxHQUFvQixFQUFFLENBQUM7SUFDL0IsT0FBTyxHQUFXLEVBQUUsQ0FBQztJQUNyQixNQUFNLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBRS9CLGlCQUFpQixDQUFzRDtJQUN2RSxnQkFBZ0IsQ0FBd0Q7SUFFaEYsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDdEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBR0QsS0FBSyxDQUFDLE9BQU87UUFDWCxJQUFJLENBQUM7WUFDSCxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNwQixDQUFDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQixDQUFDLE9BQWU7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsU0FBUyxDQUFDLE9BQXNCO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRCxRQUFRLENBQUMsTUFBd0I7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVrQixnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQzt1R0FoRTVDLFVBQVU7MkZBQVYsVUFBVSxpSEFwQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBZ0NELDRuQ0FqQ0MsV0FBVywrQkFBMkIsMkJBQTJCLHVJQUFFLG9CQUFvQiwwRkFBRSxpQkFBaUIsa0ZBQUUsT0FBTywyRUFBRSxJQUFJOzsyRkFxQ3hILFVBQVU7a0JBeEN0QixTQUFTOytCQUNFLGFBQWEsY0FDWCxJQUFJLFdBQ1AsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLDJCQUEyQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFDMUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBZ0NELGlCQUNNLGlCQUFpQixDQUFDLFNBQVM7c0ZBSTVCLEdBQUc7c0JBQWhCLEtBQUs7dUJBQUMsS0FBSztnQkFDTSxNQUFNO3NCQUF2QixLQUFLO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7TmdGb3IsIE5nSWYsIE5nU3R5bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7Q29ubmVjdGlvblN0YXR1cywgTG9yYUNsaWVudFNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xvcmEtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHtNZXNzYWdlQ29tcG9uZW50fSBmcm9tIFwiLi4vbWVzc2FnZS9tZXNzYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlLWlucHV0L21lc3NhZ2UtaW5wdXQuY29tcG9uZW50XCI7XG5pbXBvcnQge01lc3NhZ2VTZW5kQ29tcG9uZW50fSBmcm9tIFwiLi4vbWVzc2FnZS1zZW5kL21lc3NhZ2Utc2VuZC5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2xpZW50TWVzc2FnZX0gZnJvbSBcIi4uLy4uL3R5cGVzL0NsaWVudE1lc3NhZ2VcIjtcbmltcG9ydCB7TWVzc2FnZXNDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlcy9tZXNzYWdlcy5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbG9yYS1jbGllbnQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbRm9ybXNNb2R1bGUsIE5nRm9yLCBNZXNzYWdlQ29tcG9uZW50LCBDbGllbnRNZXNzYWdlSW5wdXRDb21wb25lbnQsIE1lc3NhZ2VTZW5kQ29tcG9uZW50LCBNZXNzYWdlc0NvbXBvbmVudCwgTmdTdHlsZSwgTmdJZl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNsaWVudF9fY29udGFpbmVyXCIgW25nU3R5bGVdPVwie2hlaWdodDpoZWlnaHQrJ3B4J31cIj5cblxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cyA9PT0gQ29ubmVjdGlvblN0YXR1cy5DT05ORUNURURcIj5cbiAgICAgICAgPGNsaWVudC1tZXNzYWdlcyBjbGFzcz1cImNsaWVudF9fbWVzc2FnZXNcIiBbbWVzc2FnZXNdPVwibWVzc2FnZXNcIi8+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9faW5wdXRcIj5cbiAgICAgICAgICA8Y2xpZW50LW1lc3NhZ2UtaW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwiY2xpZW50X19pbnB1dC1tZXNzYWdlXCJcbiAgICAgICAgICAgIFttZXNzYWdlXT1cIm1lc3NhZ2VcIlxuICAgICAgICAgICAgKG9uTWVzc2FnZUNoYW5nZWQpPVwib25NZXNzYWdlQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChvbkVudGVyUHJlc3NlZCk9XCJvbkVudGVyUHJlc3NlZCgpXCJcbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPGNsaWVudC1tZXNzYWdlLXNlbmQgY2xhc3M9XCJjbGllbnRfX2lucHV0LXN1Ym1pdFwiIChvbkNsaWNrU2VuZCk9XCJzZW5kTWVzc2FnZSgpXCIvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cz09PUNvbm5lY3Rpb25TdGF0dXMuRElTQ09OTkVDVEVEXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPkRpc2Nvbm5lY3RlZDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdHVzPT09Q29ubmVjdGlvblN0YXR1cy5DT05ORUNUSU5HXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnRfX3N0YXR1c1wiPkNvbm5lY3RpbmcuLi48L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXR1cz09PUNvbm5lY3Rpb25TdGF0dXMuRVJST1JcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudF9fc3RhdHVzXCI+XG4gICAgICAgICAgPGRpdj5Db25uZWN0aW9uIEZhaWxlZDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cIm9uQ2xpY2tSZWNvbm5lY3QoKVwiPlRyeSBhZ2FpbjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PmAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbSxcbiAgc3R5bGVVcmxzOiBbJy4vbG9yYS1jbGllbnQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMb3JhQ2xpZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ3VybCcpIHVybCA9ICcnO1xuICBASW5wdXQoJ2hlaWdodCcsKSBoZWlnaHQgPSA1MDA7XG5cbiAgbWVzc2FnZXM6IENsaWVudE1lc3NhZ2VbXSA9IFtdO1xuICBtZXNzYWdlOiBzdHJpbmcgPSAnJztcbiAgc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5ESVNDT05ORUNURUQ7XG5cbiAgcHJpdmF0ZSBvbk1lc3NhZ2VMaXN0ZW5lcjogT21pdFRoaXNQYXJhbWV0ZXI8KG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpID0+IHZvaWQ+O1xuICBwcml2YXRlIG9uU3RhdHVzTGlzdGVuZXI6IE9taXRUaGlzUGFyYW1ldGVyPChzdGF0dXM6IENvbm5lY3Rpb25TdGF0dXMpID0+IHZvaWQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9yYUNsaWVudFNlcnZpY2U6IExvcmFDbGllbnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lciA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblN0YXR1c0xpc3RlbmVyID0gdGhpcy5vblN0YXR1cy5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub24oJ21lc3NhZ2UnLCB0aGlzLm9uTWVzc2FnZUxpc3RlbmVyKTtcbiAgICB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLm9uKCdzdGF0dXMnLCB0aGlzLm9uU3RhdHVzTGlzdGVuZXIpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb25uZWN0KCkudGhlbigpO1xuICB9XG5cblxuICBhc3luYyBjb25uZWN0KCkge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmNvbm5lY3QodGhpcy51cmwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvbXBvbmVudCBlcnJvcjonLCBlKTtcbiAgICB9XG4gIH1cblxuICBzZW5kTWVzc2FnZSgpIHtcbiAgICBpZiAodGhpcy5tZXNzYWdlLnRyaW0oKSkge1xuICAgICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5zZW5kTWVzc2FnZSh0aGlzLm1lc3NhZ2UpO1xuICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgb25NZXNzYWdlQ2hhbmdlZChtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB9XG5cbiAgb25FbnRlclByZXNzZWQoKSB7XG4gICAgdGhpcy5zZW5kTWVzc2FnZSgpO1xuICB9XG5cbiAgb25DbGlja1JlY29ubmVjdCgpIHtcbiAgICB0aGlzLmNvbm5lY3QoKS50aGVuKCk7XG4gIH1cblxuICBvbk1lc3NhZ2UobWVzc2FnZTogQ2xpZW50TWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZXMgPSB0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLmdldE1lc3NhZ2VzKCk7XG4gIH1cblxuICBvblN0YXR1cyhzdGF0dXM6IENvbm5lY3Rpb25TdGF0dXMpIHtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2UuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uub2ZmKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5vZmYoJ3N0YXR1cycsIHRoaXMub25TdGF0dXNMaXN0ZW5lcik7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgQ29ubmVjdGlvblN0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXM7XG59XG4iXX0=