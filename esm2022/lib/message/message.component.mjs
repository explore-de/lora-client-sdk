import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { NgClass, NgComponentOutlet, NgIf } from "@angular/common";
import { TicketWidgetComponent } from '../widgets/ticket-widget/ticket-widget.component';
import { TicketsWidgetComponent } from "../widgets/tickets-widget/tickets-widget.component";
import * as i0 from "@angular/core";
export class MessageComponent {
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
    <div class="client-message" [ngClass]="{'client-message--own': message.user == 'me', 'client-message--signal': message.isSignal}">
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
    <div class="client-message" [ngClass]="{'client-message--own': message.user == 'me', 'client-message--signal': message.isSignal}">
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9yYS1jbGllbnQvc3JjL2xpYi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFakcsT0FBTyxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUN2RixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxvREFBb0QsQ0FBQzs7QUF3QjFGLE1BQU0sT0FBTyxnQkFBZ0I7SUFDbEIsT0FBTyxDQUFpQjtJQUNILG1CQUFtQixHQUFxQixJQUFJLENBQUM7SUFFMUQsVUFBVSxHQUFHLElBQUksR0FBRyxDQUFvQjtRQUN2RCxDQUFDLGtCQUFrQixFQUFFLHFCQUFxQixDQUFDO1FBQzNDLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDO1FBQ2pDLENBQUMsU0FBUyxFQUFFLHNCQUFzQixDQUFDO0tBQ3BDLENBQUMsQ0FBQztJQUNJLGVBQWUsQ0FBVztJQUdqQztRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLENBQUM7SUFDSCxDQUFDO0lBRU8sY0FBYyxDQUFDLFFBQWdCO1FBQ3JDLGtF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Q0FBQzt3R0F0RVUsZ0JBQWdCOzRGQUFoQixnQkFBZ0IsMktBaEJqQjs7Ozs7Ozs7Ozs7Ozs7V0FjRCwwZ0JBaEJDLE9BQU8sb0ZBQUUsaUJBQWlCLG9QQUFFLElBQUk7OzRGQWtCL0IsZ0JBQWdCO2tCQXRCNUIsU0FBUzsrQkFDRSxnQkFBZ0IsY0FDZCxJQUFJLGlCQUNELGlCQUFpQixDQUFDLElBQUksV0FDNUIsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFlBRWpDOzs7Ozs7Ozs7Ozs7OztXQWNEO3dEQUdBLE9BQU87c0JBQWYsS0FBSztnQkFDd0IsbUJBQW1CO3NCQUFoRCxLQUFLO3VCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3RvciwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsIFR5cGUsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZX0gZnJvbSAnLi4vLi4vdHlwZXMvQ2xpZW50TWVzc2FnZSc7XG5pbXBvcnQge05nQ2xhc3MsIE5nQ29tcG9uZW50T3V0bGV0LCBOZ0lmfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge1RpY2tldFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi4vd2lkZ2V0cy90aWNrZXQtd2lkZ2V0L3RpY2tldC13aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7VGlja2V0c1dpZGdldENvbXBvbmVudH0gZnJvbSBcIi4uL3dpZGdldHMvdGlja2V0cy13aWRnZXQvdGlja2V0cy13aWRnZXQuY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NsaWVudC1tZXNzYWdlJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaW1wb3J0czogW05nQ2xhc3MsIE5nQ29tcG9uZW50T3V0bGV0LCBOZ0lmXSxcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZS5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjbGllbnQtbWVzc2FnZVwiIFtuZ0NsYXNzXT1cInsnY2xpZW50LW1lc3NhZ2UtLW93bic6IG1lc3NhZ2UudXNlciA9PSAnbWUnLCAnY2xpZW50LW1lc3NhZ2UtLXNpZ25hbCc6IG1lc3NhZ2UuaXNTaWduYWx9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LW1lc3NhZ2VfX2NvbnRlbnRcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm1lc3NhZ2UuY29udGVudFwiIFtpbm5lckhUTUxdPVwiZ2V0Rm9ybWF0dGVkTWVzc2FnZSgpXCI+PC9kaXY+XG5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzV2lkZ2V0QXZhaWxhYmxlKClcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdDb21wb25lbnRPdXRsZXQ9XCJnZXRXaWRnZXRDb21wb25lbnQoKTsgaW5qZWN0b3I6IG1lc3NhZ2VJbmplY3RvclwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1dpZGdldEF2YWlsYWJsZSgpICYmIG1lc3NhZ2UucGFydHMgJiYgbWVzc2FnZS5wYXJ0cy5sZW5ndGhcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdDb21wb25lbnRPdXRsZXQ9XCJwYXJ0c1RhYmxlQ29tcG9uZW50OyBpbmplY3RvcjogbWVzc2FnZUluamVjdG9yO1wiLz5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDb21wb25lbnQge1xuICBASW5wdXQoKSBtZXNzYWdlITogQ2xpZW50TWVzc2FnZTtcbiAgQElucHV0KCdwYXJ0c1RhYmxlQ29tcG9uZW50JykgcGFydHNUYWJsZUNvbXBvbmVudDogVHlwZTxhbnk+IHwgbnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSByZWFkb25seSB3aWRnZXRzTWFwID0gbmV3IE1hcDxzdHJpbmcsIFR5cGU8YW55Pj4oW1xuICAgIFsnVGlja2V0U3VnZ2VzdGlvbicsIFRpY2tldFdpZGdldENvbXBvbmVudF0sXG4gICAgWydUaWNrZXQnLCBUaWNrZXRXaWRnZXRDb21wb25lbnRdLFxuICAgIFsnVGlja2V0cycsIFRpY2tldHNXaWRnZXRDb21wb25lbnRdLFxuICBdKTtcbiAgcHVibGljIG1lc3NhZ2VJbmplY3RvcjogSW5qZWN0b3I7XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1lc3NhZ2VJbmplY3RvciA9IHRoaXMuY3JlYXRlTWVzc2FnZUluamVjdG9yKHRoaXMubWVzc2FnZSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ21lc3NhZ2UnXSkge1xuICAgICAgdGhpcy5tZXNzYWdlSW5qZWN0b3IgPSB0aGlzLmNyZWF0ZU1lc3NhZ2VJbmplY3Rvcih0aGlzLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0VW5peFRpbWUodW5peFRpbWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgLy8gQ3JlYXRlIGEgbmV3IEphdmFTY3JpcHQgRGF0ZSBvYmplY3QgYmFzZWQgb24gdGhlIFVuaXggdGltZXN0YW1wXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHVuaXhUaW1lICogMTAwMCk7XG5cbiAgICAvLyBHZXQgdGhlIGRheSwgbW9udGgsIGFuZCB5ZWFyIGZyb20gdGhlIGRhdGUgb2JqZWN0XG4gICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxOyAvLyBNb250aHMgYXJlIHplcm8taW5kZXhlZCBpbiBKYXZhU2NyaXB0XG4gICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgIC8vIEdldCB0aGUgaG91cnMsIG1pbnV0ZXMsIGFuZCBzZWNvbmRzIGZyb20gdGhlIGRhdGUgb2JqZWN0XG4gICAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgY29uc3QgbWludXRlcyA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgIGNvbnN0IHNlY29uZHMgPSBkYXRlLmdldFNlY29uZHMoKTtcblxuICAgIC8vIEZvcm1hdCB0aGUgZGF0ZSBhbmQgdGltZSBjb21wb25lbnRzIHRvIGVuc3VyZSB0d28gZGlnaXRzIGZvciBlYWNoXG4gICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGAke3llYXJ9LSR7bW9udGgudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfS0ke2RheS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9YDtcbiAgICBjb25zdCBmb3JtYXR0ZWRUaW1lID0gYCR7aG91cnMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfToke21pbnV0ZXMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfToke3NlY29uZHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfWA7XG5cbiAgICAvLyBSZXR1cm4gdGhlIGZvcm1hdHRlZCBkYXRlIGFuZCB0aW1lIHN0cmluZ1xuICAgIHJldHVybiBgJHtmb3JtYXR0ZWREYXRlfSAke2Zvcm1hdHRlZFRpbWV9YDtcbiAgfVxuXG4gIGdldFRpbWVGb3JtYXR0ZWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtYXRVbml4VGltZSh0aGlzLm1lc3NhZ2UudGltZSk7XG4gIH1cblxuICBnZXRGb3JtYXR0ZWRNZXNzYWdlKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMubWVzc2FnZS5jb250ZW50LmluY2x1ZGVzKCdcInRleHQnKSkge1xuICAgICAgLy8gQ2FuIGJlIHJlbW92ZWQsIHdoZW4gSlNPTiBSZXNwb25jZSBpcyBmaXhlZC5cbiAgICAgIHJldHVybiBgPHA+JHsodGhpcy5tZXNzYWdlLmNvbnRlbnQuc3BsaXQoJzonKVsxXS5zcGxpdCgnXCInKVsxXSB8fCAnJyl9PC9wPmBcbiAgICB9XG4gICAgcmV0dXJuIGA8cD4keyh0aGlzLm1lc3NhZ2UuY29udGVudCB8fCAnJykucmVwbGFjZSgvXFxuL2csICc8L3A+PHA+Jyl9PC9wPmA7XG4gIH1cblxuICBnZXRXaWRnZXRDb21wb25lbnQoKTogVHlwZTxhbnk+IHwgbnVsbCB7XG4gICAgaWYgKHRoaXMubWVzc2FnZS53aWRnZXQ/LndpZGdldE5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLndpZGdldHNNYXAuZ2V0KHRoaXMubWVzc2FnZS53aWRnZXQ/LndpZGdldE5hbWUpIHx8IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaXNXaWRnZXRBdmFpbGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5tZXNzYWdlPy53aWRnZXQgJiYgdGhpcy53aWRnZXRzTWFwLmhhcyh0aGlzLm1lc3NhZ2Uud2lkZ2V0LndpZGdldE5hbWUpO1xuICB9XG5cblxuICBjcmVhdGVNZXNzYWdlSW5qZWN0b3IobWVzc2FnZTogQ2xpZW50TWVzc2FnZSkge1xuICAgIHJldHVybiBJbmplY3Rvci5jcmVhdGUoe3Byb3ZpZGVyczogW3twcm92aWRlOiAnbWVzc2FnZScsIHVzZVZhbHVlOiBtZXNzYWdlfV19KTtcbiAgfVxufVxuIl19