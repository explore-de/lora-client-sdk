import * as i0 from '@angular/core';
import { EventEmitter, ViewChild, Output, Input, ViewEncapsulation, Component, inject, Inject, Injector, Injectable } from '@angular/core';
import { NgForOf, NgIf, NgClass, NgComponentOutlet, NgStyle, NgFor } from '@angular/common';
import { LoraClientService as LoraClientService$1, ConnectionStatus as ConnectionStatus$1 } from '@/lora-client/src/services/lora-client.service';
import * as i1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EditableFieldComponent } from '@/lora-client/src/lib/widgets/ticket-widget/editable-field/editable-field.component';
import * as i1$1 from '@angular/platform-browser';

class ClientMessageInputComponent {
    message;
    onMessageChanged = new EventEmitter();
    onEnterPressed = new EventEmitter();
    textarea;
    content = '';
    ngOnInit() {
        this.content = this.message;
    }
    ngOnChanges(changes) {
        if (this.content !== this.message) {
            this.content = this.message;
        }
    }
    ngAfterViewChecked() {
        this.adjustTextareaHeight();
    }
    onInput() {
        this.adjustTextareaHeight();
        this.onMessageChanged.emit(this.content);
    }
    onKeyDown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent the default behavior of adding a new line
            this.onEnterPressed.emit();
        }
    }
    adjustTextareaHeight() {
        if (!this.textarea)
            return;
        const textarea = this.textarea.nativeElement;
        textarea.style.height = '34px'; // Reset the height
        textarea.style.height = Math.min(textarea.scrollHeight, 180) + 'px'; // Set new height, limited to 180px
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ClientMessageInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: ClientMessageInputComponent, isStandalone: true, selector: "client-message-input", inputs: { message: "message" }, outputs: { onMessageChanged: "onMessageChanged", onEnterPressed: "onEnterPressed" }, viewQueries: [{ propertyName: "textarea", first: true, predicate: ["textarea"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `<textarea
    #textarea
    [(ngModel)]="content"
    (input)="onInput()"
    (keydown)="onKeyDown($event)"
    class="client__message-input__textarea"
    placeholder="Type your message..."></textarea>`, isInline: true, styles: [".client__message-input__textarea{min-height:34px;max-height:180px;height:34px;width:100%;max-width:100%;resize:none;margin-bottom:-4px;padding:8px}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ClientMessageInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'client-message-input', standalone: true, encapsulation: ViewEncapsulation.None, imports: [FormsModule], template: `<textarea
    #textarea
    [(ngModel)]="content"
    (input)="onInput()"
    (keydown)="onKeyDown($event)"
    class="client__message-input__textarea"
    placeholder="Type your message..."></textarea>`, styles: [".client__message-input__textarea{min-height:34px;max-height:180px;height:34px;width:100%;max-width:100%;resize:none;margin-bottom:-4px;padding:8px}\n"] }]
        }], propDecorators: { message: [{
                type: Input,
                args: ['message']
            }], onMessageChanged: [{
                type: Output
            }], onEnterPressed: [{
                type: Output
            }], textarea: [{
                type: ViewChild,
                args: ['textarea']
            }] } });

class MessageSendComponent {
    onClickSend = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MessageSendComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: MessageSendComponent, isStandalone: true, selector: "client-message-send", outputs: { onClickSend: "onClickSend" }, ngImport: i0, template: `
      <button class="client-message-send" (click)="onClickSend.emit()">
          <svg class="client-message-send__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>send</title>
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
          </svg>
      </button>`, isInline: true, styles: [".client-message-send{background:var(--button-main-color);border:none;outline:none;border-radius:0;height:100%;cursor:pointer}.client-message-send__icon{height:24px;width:24px;fill:var(--button-text-color)}.client-message-send:hover{background:var(--button-hover-color)}.client-message-send:active{background:var(--button-active-color)}\n"], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MessageSendComponent, decorators: [{
            type: Component,
            args: [{ selector: 'client-message-send', standalone: true, encapsulation: ViewEncapsulation.None, imports: [], template: `
      <button class="client-message-send" (click)="onClickSend.emit()">
          <svg class="client-message-send__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>send</title>
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
          </svg>
      </button>`, styles: [".client-message-send{background:var(--button-main-color);border:none;outline:none;border-radius:0;height:100%;cursor:pointer}.client-message-send__icon{height:24px;width:24px;fill:var(--button-text-color)}.client-message-send:hover{background:var(--button-hover-color)}.client-message-send:active{background:var(--button-active-color)}\n"] }]
        }], propDecorators: { onClickSend: [{
                type: Output
            }] } });

class TicketWidgetComponent {
    message;
    loraClientService = inject(LoraClientService$1);
    fields = [{ key: 'title', value: 'Title' }, { key: 'description', value: 'Description' }];
    editableFields = ['completed', 'responsible'];
    customAttributes = [];
    isSaved = false;
    constructor(message) {
        this.message = message;
        this.customAttributes = Object.entries(this.message?.widget?.widgetProps?.customAttributes || {}).map(([key, value]) => ({
            key,
            value
        }));
        console.log('TicketWidgetComponent created', this.message?.id);
    }
    onClickSave() {
        this.loraClientService.sendMessage(this.loraClientService.ticketMessageToRequest(this.message), true);
        this.isSaved = true;
    }
    getFieldValue(key) {
        //@ts-ignore
        return this.message?.widget?.widgetProps?.[key] || 'NO VALUE';
    }
    setFieldValue(key, value) {
        //@ts-ignore
        this.message.widget.widgetProps[key] = value;
        console.log('DATA AFTER UPDATE', this.message.widget.widgetProps);
    }
    setCustomAttributeValue(key, value) {
        //@ts-ignore
        this.message.widget.widgetProps.customAttributes[key] = value;
        console.log('DATA AFTER UPDATE', this.message.widget.widgetProps);
    }
    trackByFn(index, item) {
        return item.key;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: TicketWidgetComponent, deps: [{ token: 'message' }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: TicketWidgetComponent, isStandalone: true, selector: "ticket-widget", ngImport: i0, template: `
    <div class="ticket-widget">
      <div class="ticket-widget__header">Ticket information:</div>
      <table class="ticket-widget__table">
        <tr *ngFor="let field of fields; trackBy: trackByFn">
          <td class="ticket-widget__field">{{ field.value }}:</td>
          <td class="ticket-widget__value">
            <editable-field
              [value]="getFieldValue(field.key)"
              [isViewOnly]="isSaved"
              (onChange)="setFieldValue(field.key, $event)"
            />
          </td>
        </tr>
      </table>

      <ng-container *ngIf="customAttributes.length > 0">
        <div class="ticket-widget__custom-attributes">
          <div class="ticket-widget__header">Custom attributes:</div>

          <table class="ticket-widget__table">
            <tr *ngFor="let field of customAttributes">
              <td class="ticket-widget__field">{{ field.key }}:</td>
              <td class="ticket-widget__value">
                <editable-field
                  [value]="field.value"
                  [isViewOnly]="isSaved || !editableFields.includes(field.key)"
                  (onChange)="setCustomAttributeValue(field.key, $event)"
                />
              </td>
            </tr>
          </table>
        </div>
      </ng-container>

      <div *ngIf="!isSaved" class="ticket-widget__actions">
        <button (click)="onClickSave()">{{ 'Save' }}</button>
      </div>
    </div>
  `, isInline: true, styles: [".ticket-widget{border:1px solid #ccc;padding:16px;border-radius:8px;background-color:#f9f9f9}.ticket-widget__header{font-style:italic;border-bottom:2px solid white;padding-bottom:4px;margin-bottom:4px;font-size:1.2rem;font-weight:700}.ticket-widget__table{border-collapse:collapse}.ticket-widget__field{font-weight:700;vertical-align:top}.ticket-widget__value{padding-left:16px;vertical-align:top}.ticket-widget__custom-attributes{margin-top:8px}.ticket-widget__actions{display:flex;justify-content:flex-end}\n"], dependencies: [{ kind: "directive", type: NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: EditableFieldComponent, selector: "editable-field", inputs: ["value", "isViewOnly"], outputs: ["onChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: TicketWidgetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ticket-widget', standalone: true, imports: [NgForOf, NgIf, EditableFieldComponent], template: `
    <div class="ticket-widget">
      <div class="ticket-widget__header">Ticket information:</div>
      <table class="ticket-widget__table">
        <tr *ngFor="let field of fields; trackBy: trackByFn">
          <td class="ticket-widget__field">{{ field.value }}:</td>
          <td class="ticket-widget__value">
            <editable-field
              [value]="getFieldValue(field.key)"
              [isViewOnly]="isSaved"
              (onChange)="setFieldValue(field.key, $event)"
            />
          </td>
        </tr>
      </table>

      <ng-container *ngIf="customAttributes.length > 0">
        <div class="ticket-widget__custom-attributes">
          <div class="ticket-widget__header">Custom attributes:</div>

          <table class="ticket-widget__table">
            <tr *ngFor="let field of customAttributes">
              <td class="ticket-widget__field">{{ field.key }}:</td>
              <td class="ticket-widget__value">
                <editable-field
                  [value]="field.value"
                  [isViewOnly]="isSaved || !editableFields.includes(field.key)"
                  (onChange)="setCustomAttributeValue(field.key, $event)"
                />
              </td>
            </tr>
          </table>
        </div>
      </ng-container>

      <div *ngIf="!isSaved" class="ticket-widget__actions">
        <button (click)="onClickSave()">{{ 'Save' }}</button>
      </div>
    </div>
  `, styles: [".ticket-widget{border:1px solid #ccc;padding:16px;border-radius:8px;background-color:#f9f9f9}.ticket-widget__header{font-style:italic;border-bottom:2px solid white;padding-bottom:4px;margin-bottom:4px;font-size:1.2rem;font-weight:700}.ticket-widget__table{border-collapse:collapse}.ticket-widget__field{font-weight:700;vertical-align:top}.ticket-widget__value{padding-left:16px;vertical-align:top}.ticket-widget__custom-attributes{margin-top:8px}.ticket-widget__actions{display:flex;justify-content:flex-end}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['message']
                }] }] });

class MessageComponent {
    message;
    partsTableComponent = null;
    widgetsMap = new Map([['exploreticket', TicketWidgetComponent]]);
    messageInjector;
    constructor() {
        this.messageInjector = this.createMessageInjector(this.message);
    }
    ngOnChanges(changes) {
        if (changes['message']) {
            this.messageInjector = this.createMessageInjector(this.message);
        }
    }
    formatUnixTime(unixTime) {
        // Create a new JavaScript Date object based on the Unix timestamp
        const date = new Date(unixTime * 1000);
        // Get the day, month, and year from the date object
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed in JavaScript
        const year = date.getFullYear();
        // Get the hours, minutes, and seconds from the date object
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        // Format the date and time components to ensure two digits for each
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        // Return the formatted date and time string
        return `${formattedDate} ${formattedTime}`;
    }
    getTimeFormatted() {
        return this.formatUnixTime(this.message.time);
    }
    getFormattedMessage() {
        return `<p>${(this.message.content || '').replace(/\n/g, '</p><p>')}</p>`;
    }
    getWidgetComponent() {
        if (this.message.widget?.widgetName) {
            return this.widgetsMap.get(this.message.widget?.widgetName) || null;
        }
        return null;
    }
    isWidgetAvailable() {
        return !!this.message?.widget && this.widgetsMap.has(this.message.widget.widgetName);
    }
    createMessageInjector(message) {
        return Injector.create({ providers: [{ provide: 'message', useValue: message }] });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MessageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: MessageComponent, isStandalone: true, selector: "client-message", inputs: { message: "message", partsTableComponent: "partsTableComponent" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="client-message" [ngClass]="{'client-message--own': message.user == 'me'}">
      <div class="client-message__content">
        <div *ngIf="message.content" [innerHTML]="getFormattedMessage()"></div>

        <ng-container *ngIf="isWidgetAvailable()">
          <ng-container
            *ngComponentOutlet="getWidgetComponent(); injector: messageInjector"></ng-container>
        </ng-container>
        <ng-container *ngIf="message.parts && message.parts.length">
          <ng-container
            *ngComponentOutlet="partsTableComponent; injector: messageInjector;"/>
        </ng-container>
      </div>
    </div>`, isInline: true, styles: [".client-message{margin:8px 0;display:flex;flex-direction:column;align-items:flex-start}.client-message__content{background:var(--message-color-1);padding:8px;border-radius:var(--message-border-radius, 16px)}.client-message__content p{padding:0;margin:0}.client-message--own{align-items:flex-end}.client-message--own .client-message__content{background:var(--message-color-2)}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'client-message', standalone: true, encapsulation: ViewEncapsulation.None, imports: [NgClass, NgComponentOutlet, NgIf], template: `
    <div class="client-message" [ngClass]="{'client-message--own': message.user == 'me'}">
      <div class="client-message__content">
        <div *ngIf="message.content" [innerHTML]="getFormattedMessage()"></div>

        <ng-container *ngIf="isWidgetAvailable()">
          <ng-container
            *ngComponentOutlet="getWidgetComponent(); injector: messageInjector"></ng-container>
        </ng-container>
        <ng-container *ngIf="message.parts && message.parts.length">
          <ng-container
            *ngComponentOutlet="partsTableComponent; injector: messageInjector;"/>
        </ng-container>
      </div>
    </div>`, styles: [".client-message{margin:8px 0;display:flex;flex-direction:column;align-items:flex-start}.client-message__content{background:var(--message-color-1);padding:8px;border-radius:var(--message-border-radius, 16px)}.client-message__content p{padding:0;margin:0}.client-message--own{align-items:flex-end}.client-message--own .client-message__content{background:var(--message-color-2)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { message: [{
                type: Input
            }], partsTableComponent: [{
                type: Input,
                args: ['partsTableComponent']
            }] } });

class MessagesComponent {
    messages = [];
    partsTableComponent = null;
    container;
    previousMessagesLength = 0;
    ngOnChanges(changes) {
        if (changes['messages']) {
            const currentMessagesLength = changes['messages'].currentValue.length;
            if (currentMessagesLength !== this.previousMessagesLength) {
                this.previousMessagesLength = currentMessagesLength;
                setTimeout(() => {
                    this.scrollBottom();
                }, 250);
            }
        }
    }
    scrollBottom() {
        if (!this.container)
            return;
        const el = this.container.nativeElement;
        el.scrollTop = el.scrollHeight;
    }
    createInjector(message) {
        return Injector.create({ providers: [{ provide: 'message', useValue: message }] });
    }
    trackByKey(index, item) {
        return item.id;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MessagesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: MessagesComponent, isStandalone: true, selector: "client-messages", inputs: { messages: "messages", partsTableComponent: "partsTableComponent" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div #container class="client-messages">
      <div class="client-messages__inner">
        <client-message
          *ngFor="let msg of messages; trackBy: trackByKey"
          [message]="msg"
          [partsTableComponent]="partsTableComponent"
        />
      </div>
    </div>`, isInline: true, styles: [".client-messages{display:block;padding:0 8px;overflow:auto;scroll-behavior:smooth;height:100%;width:100%}.client-messages__inner{display:flex;flex-direction:column;justify-content:end}\n"], dependencies: [{ kind: "component", type: MessageComponent, selector: "client-message", inputs: ["message", "partsTableComponent"] }, { kind: "directive", type: NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MessagesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'client-messages', standalone: true, encapsulation: ViewEncapsulation.None, imports: [
                        MessageComponent,
                        NgForOf,
                        NgComponentOutlet,
                        NgIf
                    ], template: `
    <div #container class="client-messages">
      <div class="client-messages__inner">
        <client-message
          *ngFor="let msg of messages; trackBy: trackByKey"
          [message]="msg"
          [partsTableComponent]="partsTableComponent"
        />
      </div>
    </div>`, styles: [".client-messages{display:block;padding:0 8px;overflow:auto;scroll-behavior:smooth;height:100%;width:100%}.client-messages__inner{display:flex;flex-direction:column;justify-content:end}\n"] }]
        }], propDecorators: { messages: [{
                type: Input
            }], partsTableComponent: [{
                type: Input,
                args: ['partsTableComponent']
            }], container: [{
                type: ViewChild,
                args: ['container']
            }] } });

class LoraClient {
    sanitizer;
    token = '';
    height = 500;
    stylesFile = '';
    partsTableComponent = null;
    onMessage = new EventEmitter();
    messages = [];
    message = '';
    status = ConnectionStatus$1.DISCONNECTED;
    sanitizedStylesFile = '';
    ConnectionStatus = ConnectionStatus$1;
    loraClientService = inject(LoraClientService$1);
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
        this.status = ConnectionStatus$1.CONNECTING;
        try {
            const sessionId = localStorage.getItem('LORA_CLIENT_SESSION_ID') || await this.loraClientService.createSession(this.token);
            if (!sessionId) {
                console.error("Failed to receive session id");
                this.status = ConnectionStatus$1.ERROR;
                return;
            }
            await this.loraClientService.connect({ sessionId, loadHistory: false });
        }
        catch (e) {
            console.error(e);
            this.status = ConnectionStatus$1.ERROR;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClient, deps: [{ token: i1$1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: () => [{ type: i1$1.DomSanitizer }], propDecorators: { token: [{
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

class ClientError extends Error {
    constructor(message) {
        super(message);
    }
}

var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus["DISCONNECTED"] = "disconnected";
    ConnectionStatus["CONNECTED"] = "connected";
    ConnectionStatus["CONNECTING"] = "connecting";
    ConnectionStatus["ERROR"] = "error";
})(ConnectionStatus || (ConnectionStatus = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus[MessageStatus["Pending"] = 0] = "Pending";
    MessageStatus[MessageStatus["Sent"] = 1] = "Sent";
})(MessageStatus || (MessageStatus = {}));
const HEARTBEAT_INTERVAL = 12000;
class LoraClientService {
    serviceUrl = 'https://feynsinn.explore.de/api/lora';
    url = undefined;
    socket = null;
    isConnected = false;
    isError = false;
    messages = [];
    messagesQueue = [];
    listeners = {};
    heartBeatInterval = 0;
    async createSession(token) {
        const options = { headers: { 'x-api-token': token } };
        const response = await window.fetch(`${this.serviceUrl}/session`, options);
        return response.status === 200 ? await response.text() : undefined;
    }
    async connect(options) {
        const sessionId = options.sessionId;
        this.url = (options.url ?? `${this.serviceUrl}/chat/${sessionId}`).replace('https://', 'wss://').replace('http://', 'ws://');
        if (!sessionId) {
            throw new ClientError('Can not start connection: session id not set.');
        }
        if (!this.url) {
            throw new ClientError('Can not start connection: server url not set.');
        }
        if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
            throw new ClientError('WebSocket connection is already open or opening.');
        }
        let oldMessages = [];
        let resolvePromise;
        let rejectPromise;
        const promise = new Promise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
        });
        this.emitStatus(ConnectionStatus.CONNECTING);
        this.isError = false;
        this.isConnected = false;
        try {
            if (options.loadHistory) {
                oldMessages = await this.getMessagesHistory(sessionId);
            }
            this.socket = new WebSocket(this.url);
            this.socket.onopen = () => {
                oldMessages.forEach(message => this.addMessage(message));
                this.isConnected = true;
                this.startHeartBeat();
                this.emitStatus(ConnectionStatus.CONNECTED);
                resolvePromise();
            };
            this.socket.onmessage = (event) => {
                const response = event.data;
                if (response === 'ping' || response === 'pong')
                    return;
                if (typeof response === 'string') {
                    this.onSocketMessage(response);
                }
            };
            this.socket.onclose = () => {
                this.isConnected = false;
                this.stopHeartBeat();
                this.emitStatus(this.isError ? ConnectionStatus.ERROR : ConnectionStatus.DISCONNECTED);
            };
            this.socket.onerror = (event) => {
                this.isError = true;
                rejectPromise?.(event);
            };
        }
        catch (e) {
            console.error(e);
            return;
        }
        return promise;
    }
    async getMessagesHistory(sessionId) {
        const response = await window.fetch(`${this.serviceUrl}/${sessionId}/messages`);
        const data = await response.json();
        const messages = (data || []).map((item) => {
            const message = {
                id: item.messageId,
                user: item.loraMessage ? 'lora' : 'me',
                content: item.text,
                time: item.creationDate,
                parts: item.parts
            };
            return message;
        });
        return messages.reverse();
    }
    sendMessage(message, silent = false) {
        this.pushMessageToQueue(message, silent);
        this.processQueue();
    }
    onSocketMessage(data) {
        let json = undefined;
        let content = '';
        let parts = [];
        try {
            json = JSON.parse(data);
            content = json.text;
            parts = json.parts;
        }
        catch (e) {
            content = data;
        }
        const message = { id: crypto.randomUUID(), user: 'lora', content, parts, time: Date.now() };
        this.addMessage(message);
    }
    processQueue() {
        const message = this.messagesQueue.pop();
        if (!message)
            return;
        if (!message.silent) {
            this.addMessage({ id: crypto.randomUUID(), user: 'me', time: Date.now(), content: message.content });
        }
        this.socket?.send(message?.content);
        message.status = MessageStatus.Sent;
    }
    pushMessageToQueue(message, silent = false) {
        const id = crypto.randomUUID();
        this.messagesQueue.push({
            id,
            silent,
            content: message,
            status: MessageStatus.Pending
        });
    }
    addMessage(message) {
        this.messages.push(message);
        this.emitMessage(message);
    }
    emitMessage(message) {
        this.listeners.message?.forEach(listener => {
            try {
                listener(message);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    emitStatus(status) {
        this.listeners.status?.forEach(listener => {
            try {
                listener(status);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }
    off(event, listener) {
        const data = this.listeners[event];
        const index = data.indexOf(listener);
        if (index >= 0) {
            this.listeners[event].splice(index, 1);
        }
    }
    getMessages() {
        return [...this.messages];
    }
    disconnect() {
        this.messages = [];
        this.messagesQueue = [];
        if (this.socket) {
            this.socket.close(1000, "Closed by client");
        }
    }
    sendHeartBeat() {
        if (this.isConnected) {
            this.socket?.send('ping');
        }
    }
    startHeartBeat() {
        this.heartBeatInterval = window.setInterval(() => {
            this.sendHeartBeat();
        }, HEARTBEAT_INTERVAL);
    }
    stopHeartBeat() {
        window.clearInterval(this.heartBeatInterval);
    }
    ticketMessageToRequest(message) {
        return "Update ticket properties from this json: " + JSON.stringify(message.widget?.widgetProps);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClientService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClientService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClientService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

/*
 * Public API Surface of client
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ConnectionStatus, LoraClient, LoraClientService };
//# sourceMappingURL=lora-client.mjs.map
