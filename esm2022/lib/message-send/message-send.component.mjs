import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
export class MessageSendComponent {
    onClickSend = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MessageSendComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: MessageSendComponent, isStandalone: true, selector: "client-message-send", outputs: { onClickSend: "onClickSend" }, ngImport: i0, template: `
      <button class="client-message-send" (click)="onClickSend.emit()">
          <svg class="client-message-send__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>send</title>
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
          </svg>
      </button>`, isInline: true, styles: [".client-message-send{background:var(--lora-client-button-main-color);border:none;outline:none;border-radius:0;height:100%;cursor:pointer}.client-message-send__icon{height:24px;width:24px;fill:var(--lora-client-button-text-color)}.client-message-send:hover{background:var(--lora-client-button-hover-color)}.client-message-send:active{background:var(--lora-client-button-active-color)}\n"], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MessageSendComponent, decorators: [{
            type: Component,
            args: [{ selector: 'client-message-send', standalone: true, encapsulation: ViewEncapsulation.None, imports: [], template: `
      <button class="client-message-send" (click)="onClickSend.emit()">
          <svg class="client-message-send__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>send</title>
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
          </svg>
      </button>`, styles: [".client-message-send{background:var(--lora-client-button-main-color);border:none;outline:none;border-radius:0;height:100%;cursor:pointer}.client-message-send__icon{height:24px;width:24px;fill:var(--lora-client-button-text-color)}.client-message-send:hover{background:var(--lora-client-button-hover-color)}.client-message-send:active{background:var(--lora-client-button-active-color)}\n"] }]
        }], propDecorators: { onClickSend: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1zZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb3JhLWNsaWVudC9zcmMvbGliL21lc3NhZ2Utc2VuZC9tZXNzYWdlLXNlbmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFnQmpGLE1BQU0sT0FBTyxvQkFBb0I7SUFDckIsV0FBVyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO3VHQUQxRCxvQkFBb0I7MkZBQXBCLG9CQUFvQix3SEFUckI7Ozs7OztnQkFNSTs7MkZBR0gsb0JBQW9CO2tCQWRoQyxTQUFTOytCQUNFLHFCQUFxQixjQUNuQixJQUFJLGlCQUNELGlCQUFpQixDQUFDLElBQUksV0FDNUIsRUFBRSxZQUNEOzs7Ozs7Z0JBTUk7OEJBSUosV0FBVztzQkFBcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbGllbnQtbWVzc2FnZS1zZW5kJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaW1wb3J0czogW10sXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiY2xpZW50LW1lc3NhZ2Utc2VuZFwiIChjbGljayk9XCJvbkNsaWNrU2VuZC5lbWl0KClcIj5cbiAgICAgICAgICA8c3ZnIGNsYXNzPVwiY2xpZW50LW1lc3NhZ2Utc2VuZF9faWNvblwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICAgIDx0aXRsZT5zZW5kPC90aXRsZT5cbiAgICAgICAgICAgICAgPHBhdGggZD1cIk0yLDIxTDIzLDEyTDIsM1YxMEwxNywxMkwyLDE0VjIxWlwiLz5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPmAsXG4gIHN0eWxlVXJsOiAnLi9tZXNzYWdlLXNlbmQuY29tcG9uZW50LnNjc3MnXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZW5kQ29tcG9uZW50IHtcbiAgQE91dHB1dCgpIG9uQ2xpY2tTZW5kOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG59XG4iXX0=