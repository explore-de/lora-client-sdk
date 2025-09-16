import * as i0 from '@angular/core';
import { Injectable, EventEmitter, ViewChild, Output, Input, ViewEncapsulation, Component, inject, Inject, Injector } from '@angular/core';
import { NgIf, NgForOf, NgClass, NgComponentOutlet, NgStyle, NgFor } from '@angular/common';
import * as i1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i1$1 from '@angular/platform-browser';

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
    serviceUrl;
    //private serviceUrl = 'http://localhost:8081/api/lora';
    setServiceUrl(url) {
        if (!/^https?:\/\/.*/.test(url) || !url) {
            throw new ClientError('Service URL must be a valid URL, got: ' + url);
        }
        this.serviceUrl = url;
    }
    authHeaderSupplier;
    setAuthHeaderSupplier(supplier) {
        this.authHeaderSupplier = supplier;
    }
    url = undefined;
    socket = null;
    isConnected = false;
    isError = false;
    messages = [];
    messagesQueue = [];
    listeners = {};
    heartBeatInterval = 0;
    async createSession() {
        this.checkServiceUrl();
        const options = { headers: { 'Authorization': this.getAuthHeader() } };
        const response = await window.fetch(`${this.serviceUrl}/session`, options);
        if (response.status !== 200) {
            throw new ClientError(`Failed to create session, status: ${response.status}`);
        }
        return response.text();
    }
    async connect(options) {
        this.checkServiceUrl();
        const sessionId = options.sessionId;
        this.url = (options.url ?? `${this.serviceUrl}/chat/${sessionId}`)
            .replace('https://', 'wss://')
            .replace('http://', 'ws://');
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
                oldMessages.forEach((message) => this.addMessage(message));
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
        const response = await window.fetch(`${this.serviceUrl}/${sessionId}/messages`, { headers: { 'Authorization': this.getAuthHeader() } });
        const data = await response.json();
        const messages = (data || []).map((item) => {
            const message = {
                id: item.messageId,
                user: item.loraMessage ? 'lora' : 'me',
                content: item.text,
                time: item.creationDate,
                parts: item.parts,
                isSignal: item.isSignal || false
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
        let ticketSuggestionWidget = undefined;
        let ticketWidget = undefined;
        let ticketsWidget = undefined;
        let isSignal = false;
        try {
            json = JSON.parse(data);
            content = json.text;
            parts = json.parts;
            ticketSuggestionWidget = json.ticketSuggestionNullable;
            ticketWidget = json.createdTicketNullable;
            ticketsWidget = json.ticketSearchResultsNullable;
            isSignal = json.isSignal || false;
        }
        catch (e) {
            content = data;
        }
        const message = {
            id: crypto.randomUUID(),
            user: 'lora',
            content,
            parts,
            time: Date.now(),
            isSignal
        };
        if (ticketSuggestionWidget &&
            Object.keys(ticketSuggestionWidget).length > 0) {
            message.widget = {
                widgetName: 'TicketSuggestion',
                widgetProps: { ticket: ticketSuggestionWidget, isEditable: true },
            };
        }
        else if (ticketWidget && Object.keys(ticketWidget).length > 0) {
            message.widget = {
                widgetName: 'Ticket',
                widgetProps: { ticket: ticketWidget, isEditable: false },
            };
        }
        else if (ticketsWidget) {
            message.widget = {
                widgetName: 'Tickets',
                widgetProps: { tickets: ticketsWidget },
            };
        }
        this.addMessage(message);
    }
    processQueue() {
        const message = this.messagesQueue.pop();
        if (!message)
            return;
        if (!message.silent) {
            this.addMessage({
                id: crypto.randomUUID(),
                user: 'me',
                time: Date.now(),
                content: message.content,
                isSignal: false,
            });
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
            status: MessageStatus.Pending,
        });
    }
    addMessage(message) {
        this.messages.push(message);
        this.emitMessage(message);
    }
    emitMessage(message) {
        this.listeners.message?.forEach((listener) => {
            try {
                listener(message);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    emitStatus(status) {
        this.listeners.status?.forEach((listener) => {
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
            this.socket.close(1000, 'Closed by client');
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
    ticketToRequest(ticket) {
        return ('This ticket looks good please save it now: ' + JSON.stringify(ticket));
    }
    checkServiceUrl() {
        if (!this.serviceUrl) {
            throw new ClientError('Service URL is not set.');
        }
    }
    getAuthHeader() {
        return this.authHeaderSupplier?.() ?? '';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClientService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClientService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClientService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

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

class EditableFieldComponent {
    value = '';
    type = 'text';
    isViewOnly = false;
    onChange = new EventEmitter();
    isText() {
        return this.type === 'text';
    }
    isNumber() {
        return this.type === 'number';
    }
    isCheckbox() {
        return this.type === 'checkbox';
    }
    isDate() {
        return this.type === 'date';
    }
    getFormattedDate() {
        const date = new Date(this.value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
    onInputChange(event) {
        const input = event.target;
        let newValue = input.type === 'checkbox' ? input.checked : input.value;
        if (this.isDate()) {
            const date = new Date(newValue);
            newValue = date.toISOString();
        }
        this.onChange.emit(newValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: EditableFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: EditableFieldComponent, isStandalone: true, selector: "editable-field", inputs: { value: "value", type: "type", isViewOnly: "isViewOnly" }, outputs: { onChange: "onChange" }, ngImport: i0, template: `
    <div class="editable-field">
      <ng-container *ngIf="isViewOnly">
        <input *ngIf="isCheckbox()" type="checkbox" class="editable-field__input" [checked]="value" disabled/>
        <ng-container *ngIf="!isCheckbox()">
          {{ value }}
        </ng-container>
      </ng-container>
      <ng-container *ngIf="!isViewOnly">
        <input *ngIf="isText()" type="text" class="editable-field__input" [value]="value"
               (input)="onInputChange($event)"/>
        <input *ngIf="isNumber()" type="number" class="editable-field__input" [value]="value"
               (input)="onInputChange($event)"/>
        <input *ngIf="isCheckbox()" type="checkbox" class="editable-field__input" [checked]="value"
               (change)="onInputChange($event)"/>
        <input *ngIf="isDate()" type="date" class="editable-field__input" [value]="getFormattedDate()"
               (change)="onInputChange($event)"/>
      </ng-container>
    </div>
  `, isInline: true, styles: [".editable-field{word-wrap:break-word}.editable-field input[type=checkbox]{margin-left:0}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: EditableFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'editable-field', standalone: true, imports: [NgIf], template: `
    <div class="editable-field">
      <ng-container *ngIf="isViewOnly">
        <input *ngIf="isCheckbox()" type="checkbox" class="editable-field__input" [checked]="value" disabled/>
        <ng-container *ngIf="!isCheckbox()">
          {{ value }}
        </ng-container>
      </ng-container>
      <ng-container *ngIf="!isViewOnly">
        <input *ngIf="isText()" type="text" class="editable-field__input" [value]="value"
               (input)="onInputChange($event)"/>
        <input *ngIf="isNumber()" type="number" class="editable-field__input" [value]="value"
               (input)="onInputChange($event)"/>
        <input *ngIf="isCheckbox()" type="checkbox" class="editable-field__input" [checked]="value"
               (change)="onInputChange($event)"/>
        <input *ngIf="isDate()" type="date" class="editable-field__input" [value]="getFormattedDate()"
               (change)="onInputChange($event)"/>
      </ng-container>
    </div>
  `, styles: [".editable-field{word-wrap:break-word}.editable-field input[type=checkbox]{margin-left:0}\n"] }]
        }], propDecorators: { value: [{
                type: Input,
                args: [{ required: true }]
            }], type: [{
                type: Input,
                args: [{ required: true }]
            }], isViewOnly: [{
                type: Input,
                args: [{ required: true }]
            }], onChange: [{
                type: Output
            }] } });

class TicketWidgetComponent {
    message;
    loraClientService = inject(LoraClientService);
    widget;
    fields = [
        { key: 'title', value: 'Title' },
        { key: 'description', value: 'Description' },
        { key: 'dueDate', value: 'Due Date', },
        { key: 'geo', value: 'Geo Information' },
        { key: 'responsiblePerson', value: 'Responsible Person' },
        { key: 'completed', value: 'Completed' }
    ];
    editableFieldsMap = new Map([
        ['completed', 'checkbox'],
        ['responsiblePerson', 'text'],
        ['geo', 'text'],
        ['dueDate', 'date']
    ]);
    otherFields = [];
    isSaved = false;
    isEditable;
    constructor(message) {
        this.message = message;
        this.widget = this.message?.widget;
        this.isEditable = this.widget?.widgetProps.isEditable || false;
        this.otherFields = Object.entries(this.widget?.widgetProps.ticket || {}).filter(([key, value]) => {
            return !this.fields.map(({ key }) => key).includes(key) && typeof value !== 'object';
        }).map(([key, value]) => ({ key, value }));
    }
    onClickSave() {
        this.loraClientService.sendMessage(this.loraClientService.ticketToRequest(this.widget.widgetProps.ticket), true);
        this.isSaved = true;
    }
    getFieldValue(key) {
        //@ts-ignore
        return this.widget?.widgetProps?.ticket?.[key] || '';
    }
    setFieldValue(key, value) {
        //@ts-ignore
        this.widget.widgetProps.ticket[key] = value;
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
              [type]="editableFieldsMap.get(field.key) || 'text'"
              [isViewOnly]="!isEditable || isSaved"
              (onChange)="setFieldValue(field.key, $event)"
            />
          </td>
        </tr>
      </table>

      <ng-container *ngIf="otherFields.length > 0">
        <div class="ticket-widget__custom-attributes">
          <div class="ticket-widget__header">Other fields:</div>
          <table class="ticket-widget__table">
            <tr *ngFor="let field of otherFields">
              <td class="ticket-widget__field">{{ field.key }}:</td>
              <td class="ticket-widget__value">
                <editable-field
                  [value]="field.value"
                  [type]="editableFieldsMap.get(field.key) || 'text'"
                  [isViewOnly]="!isEditable || isSaved || !editableFieldsMap.has(field.key)"
                  (onChange)="setFieldValue(field.key, $event)"
                />
              </td>
            </tr>
          </table>
        </div>
      </ng-container>

      <div *ngIf="!isSaved && isEditable" class="ticket-widget__actions">
        <button (click)="onClickSave()">{{ 'Save' }}</button>
      </div>
    </div>
  `, isInline: true, styles: [".ticket-widget{border:1px solid #ccc;padding:16px;border-radius:8px;margin-top:4px;background-color:#f9f9f9;max-width:100%;overflow:hidden}.ticket-widget__header{font-style:italic;border-bottom:2px solid white;padding-bottom:4px;margin-bottom:4px;font-size:1.2rem;font-weight:700}.ticket-widget__table{border-collapse:collapse;width:100%}.ticket-widget__field{font-weight:700;vertical-align:top;white-space:nowrap}.ticket-widget__value{padding-left:16px;vertical-align:top;width:100%;word-wrap:break-word}.ticket-widget__custom-attributes{margin-top:8px}.ticket-widget__actions{display:flex;justify-content:flex-end}\n"], dependencies: [{ kind: "directive", type: NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: EditableFieldComponent, selector: "editable-field", inputs: ["value", "type", "isViewOnly"], outputs: ["onChange"] }] });
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
              [type]="editableFieldsMap.get(field.key) || 'text'"
              [isViewOnly]="!isEditable || isSaved"
              (onChange)="setFieldValue(field.key, $event)"
            />
          </td>
        </tr>
      </table>

      <ng-container *ngIf="otherFields.length > 0">
        <div class="ticket-widget__custom-attributes">
          <div class="ticket-widget__header">Other fields:</div>
          <table class="ticket-widget__table">
            <tr *ngFor="let field of otherFields">
              <td class="ticket-widget__field">{{ field.key }}:</td>
              <td class="ticket-widget__value">
                <editable-field
                  [value]="field.value"
                  [type]="editableFieldsMap.get(field.key) || 'text'"
                  [isViewOnly]="!isEditable || isSaved || !editableFieldsMap.has(field.key)"
                  (onChange)="setFieldValue(field.key, $event)"
                />
              </td>
            </tr>
          </table>
        </div>
      </ng-container>

      <div *ngIf="!isSaved && isEditable" class="ticket-widget__actions">
        <button (click)="onClickSave()">{{ 'Save' }}</button>
      </div>
    </div>
  `, styles: [".ticket-widget{border:1px solid #ccc;padding:16px;border-radius:8px;margin-top:4px;background-color:#f9f9f9;max-width:100%;overflow:hidden}.ticket-widget__header{font-style:italic;border-bottom:2px solid white;padding-bottom:4px;margin-bottom:4px;font-size:1.2rem;font-weight:700}.ticket-widget__table{border-collapse:collapse;width:100%}.ticket-widget__field{font-weight:700;vertical-align:top;white-space:nowrap}.ticket-widget__value{padding-left:16px;vertical-align:top;width:100%;word-wrap:break-word}.ticket-widget__custom-attributes{margin-top:8px}.ticket-widget__actions{display:flex;justify-content:flex-end}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['message']
                }] }] });

class TicketsWidgetComponent {
    message;
    widget;
    tickets = [];
    constructor(message) {
        this.message = message;
        this.widget = this.message?.widget;
        this.tickets = this.widget?.widgetProps.tickets || [];
    }
    trackByFn(index, item) {
        return item.id;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: TicketsWidgetComponent, deps: [{ token: 'message' }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: TicketsWidgetComponent, isStandalone: true, selector: "tickets-widget", ngImport: i0, template: `
    <div class="tickets-widget">
      <ng-container *ngFor="let ticket of tickets; trackBy: trackByFn">
        <div class="tickets-widget__ticket">
          <div class="tickets-widget__ticket-id">{{ ticket.id }}</div>
          <div class="tickets-widget__ticket-title">{{ ticket.title }}</div>
        </div>
      </ng-container>
    </div>
  `, isInline: true, styles: [".tickets-widget{border:1px solid #ccc;padding:16px;border-radius:8px;margin-top:4px;background-color:#f9f9f9;max-width:100%;display:flex;flex-direction:column}.tickets-widget__ticket{display:flex;gap:8px;padding:4px 0}.tickets-widget__ticket-id{font-weight:700}\n"], dependencies: [{ kind: "directive", type: NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: TicketsWidgetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tickets-widget', standalone: true, imports: [NgForOf, NgIf], template: `
    <div class="tickets-widget">
      <ng-container *ngFor="let ticket of tickets; trackBy: trackByFn">
        <div class="tickets-widget__ticket">
          <div class="tickets-widget__ticket-id">{{ ticket.id }}</div>
          <div class="tickets-widget__ticket-title">{{ ticket.title }}</div>
        </div>
      </ng-container>
    </div>
  `, styles: [".tickets-widget{border:1px solid #ccc;padding:16px;border-radius:8px;margin-top:4px;background-color:#f9f9f9;max-width:100%;display:flex;flex-direction:column}.tickets-widget__ticket{display:flex;gap:8px;padding:4px 0}.tickets-widget__ticket-id{font-weight:700}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['message']
                }] }] });

class MessageComponent {
    message;
    partsTableComponent = null;
    widgetsMap = new Map([
        ['TicketSuggestion', TicketWidgetComponent],
        ['Ticket', TicketWidgetComponent],
        ['Tickets', TicketsWidgetComponent],
    ]);
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
        if (this.message.content.includes('"text')) {
            // Can be removed, when JSON Responce is fixed.
            return `<p>${(this.message.content.split(':')[1].split('"')[1] || '')}</p>`;
        }
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
        <ng-container *ngIf="!isWidgetAvailable() && message.parts && message.parts.length">
          <ng-container
            *ngComponentOutlet="partsTableComponent; injector: messageInjector;"/>
        </ng-container>
      </div>
    </div>`, isInline: true, styles: [".client-message{margin:8px 0;display:flex;flex-direction:column;align-items:flex-start;overflow:hidden;max-width:100%}.client-message__content{background:var(--message-color-1);padding:8px;border-radius:var(--message-border-radius, 16px);max-width:100%}.client-message__content p{padding:0;margin:0;white-space:break-spaces}.client-message--own{align-items:flex-end}.client-message--own .client-message__content{background:var(--message-color-2)}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None });
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
        <ng-container *ngIf="!isWidgetAvailable() && message.parts && message.parts.length">
          <ng-container
            *ngComponentOutlet="partsTableComponent; injector: messageInjector;"/>
        </ng-container>
      </div>
    </div>`, styles: [".client-message{margin:8px 0;display:flex;flex-direction:column;align-items:flex-start;overflow:hidden;max-width:100%}.client-message__content{background:var(--message-color-1);padding:8px;border-radius:var(--message-border-radius, 16px);max-width:100%}.client-message__content p{padding:0;margin:0;white-space:break-spaces}.client-message--own{align-items:flex-end}.client-message--own .client-message__content{background:var(--message-color-2)}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LoraClient, deps: [{ token: i1$1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: () => [{ type: i1$1.DomSanitizer }], propDecorators: { height: [{
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

/*
 * Public API Surface of client
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ConnectionStatus, LoraClient, LoraClientService };
//# sourceMappingURL=lora-client.mjs.map
