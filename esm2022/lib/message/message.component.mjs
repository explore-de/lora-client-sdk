import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { NgClass, NgComponentOutlet, NgIf } from "@angular/common";
import { TicketWidgetComponent } from '../widgets/ticket-widget/ticket-widget.component';
import { TicketsWidgetComponent } from "@/lora-client/src/lib/widgets/tickets-widget/tickets-widget.component";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9yYS1jbGllbnQvc3JjL2xpYi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFakcsT0FBTyxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUN2RixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx1RUFBdUUsQ0FBQzs7QUF3QjdHLE1BQU0sT0FBTyxnQkFBZ0I7SUFDbEIsT0FBTyxDQUFpQjtJQUNILG1CQUFtQixHQUFxQixJQUFJLENBQUM7SUFFMUQsVUFBVSxHQUFHLElBQUksR0FBRyxDQUFvQjtRQUN2RCxDQUFDLGtCQUFrQixFQUFFLHFCQUFxQixDQUFDO1FBQzNDLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDO1FBQ2pDLENBQUMsU0FBUyxFQUFFLHNCQUFzQixDQUFDO0tBQ3BDLENBQUMsQ0FBQztJQUNJLGVBQWUsQ0FBVztJQUdqQztRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLENBQUM7SUFDSCxDQUFDO0lBRU8sY0FBYyxDQUFDLFFBQWdCO1FBQ3JDLGtF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Q0FBQzt3R0F0RVUsZ0JBQWdCOzRGQUFoQixnQkFBZ0IsMktBaEJqQjs7Ozs7Ozs7Ozs7Ozs7V0FjRCwwZ0JBaEJDLE9BQU8sb0ZBQUUsaUJBQWlCLG9QQUFFLElBQUk7OzRGQWtCL0IsZ0JBQWdCO2tCQXRCNUIsU0FBUzsrQkFDRSxnQkFBZ0IsY0FDZCxJQUFJLGlCQUNELGlCQUFpQixDQUFDLElBQUksV0FDNUIsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFlBRWpDOzs7Ozs7Ozs7Ozs7OztXQWNEO3dEQUdBLE9BQU87c0JBQWYsS0FBSztnQkFDd0IsbUJBQW1CO3NCQUFoRCxLQUFLO3VCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3RvciwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsIFR5cGUsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZX0gZnJvbSAnLi4vLi4vdHlwZXMvQ2xpZW50TWVzc2FnZSc7XG5pbXBvcnQge05nQ2xhc3MsIE5nQ29tcG9uZW50T3V0bGV0LCBOZ0lmfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge1RpY2tldFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi4vd2lkZ2V0cy90aWNrZXQtd2lkZ2V0L3RpY2tldC13aWRnZXQuY29tcG9uZW50JztcbmltcG9ydCB7VGlja2V0c1dpZGdldENvbXBvbmVudH0gZnJvbSBcIkAvbG9yYS1jbGllbnQvc3JjL2xpYi93aWRnZXRzL3RpY2tldHMtd2lkZ2V0L3RpY2tldHMtd2lkZ2V0LmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbGllbnQtbWVzc2FnZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGltcG9ydHM6IFtOZ0NsYXNzLCBOZ0NvbXBvbmVudE91dGxldCwgTmdJZl0sXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2UuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LW1lc3NhZ2VcIiBbbmdDbGFzc109XCJ7J2NsaWVudC1tZXNzYWdlLS1vd24nOiBtZXNzYWdlLnVzZXIgPT0gJ21lJ31cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnQtbWVzc2FnZV9fY29udGVudFwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibWVzc2FnZS5jb250ZW50XCIgW2lubmVySFRNTF09XCJnZXRGb3JtYXR0ZWRNZXNzYWdlKClcIj48L2Rpdj5cblxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNXaWRnZXRBdmFpbGFibGUoKVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ0NvbXBvbmVudE91dGxldD1cImdldFdpZGdldENvbXBvbmVudCgpOyBpbmplY3RvcjogbWVzc2FnZUluamVjdG9yXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzV2lkZ2V0QXZhaWxhYmxlKCkgJiYgbWVzc2FnZS5wYXJ0cyAmJiBtZXNzYWdlLnBhcnRzLmxlbmd0aFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ0NvbXBvbmVudE91dGxldD1cInBhcnRzVGFibGVDb21wb25lbnQ7IGluamVjdG9yOiBtZXNzYWdlSW5qZWN0b3I7XCIvPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG1lc3NhZ2UhOiBDbGllbnRNZXNzYWdlO1xuICBASW5wdXQoJ3BhcnRzVGFibGVDb21wb25lbnQnKSBwYXJ0c1RhYmxlQ29tcG9uZW50OiBUeXBlPGFueT4gfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIHJlYWRvbmx5IHdpZGdldHNNYXAgPSBuZXcgTWFwPHN0cmluZywgVHlwZTxhbnk+PihbXG4gICAgWydUaWNrZXRTdWdnZXN0aW9uJywgVGlja2V0V2lkZ2V0Q29tcG9uZW50XSxcbiAgICBbJ1RpY2tldCcsIFRpY2tldFdpZGdldENvbXBvbmVudF0sXG4gICAgWydUaWNrZXRzJywgVGlja2V0c1dpZGdldENvbXBvbmVudF0sXG4gIF0pO1xuICBwdWJsaWMgbWVzc2FnZUluamVjdG9yOiBJbmplY3RvcjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubWVzc2FnZUluamVjdG9yID0gdGhpcy5jcmVhdGVNZXNzYWdlSW5qZWN0b3IodGhpcy5tZXNzYWdlKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snbWVzc2FnZSddKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VJbmplY3RvciA9IHRoaXMuY3JlYXRlTWVzc2FnZUluamVjdG9yKHRoaXMubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRVbml4VGltZSh1bml4VGltZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAvLyBDcmVhdGUgYSBuZXcgSmF2YVNjcmlwdCBEYXRlIG9iamVjdCBiYXNlZCBvbiB0aGUgVW5peCB0aW1lc3RhbXBcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodW5peFRpbWUgKiAxMDAwKTtcblxuICAgIC8vIEdldCB0aGUgZGF5LCBtb250aCwgYW5kIHllYXIgZnJvbSB0aGUgZGF0ZSBvYmplY3RcbiAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7IC8vIE1vbnRocyBhcmUgemVyby1pbmRleGVkIGluIEphdmFTY3JpcHRcbiAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgLy8gR2V0IHRoZSBob3VycywgbWludXRlcywgYW5kIHNlY29uZHMgZnJvbSB0aGUgZGF0ZSBvYmplY3RcbiAgICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBtaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuXG4gICAgLy8gRm9ybWF0IHRoZSBkYXRlIGFuZCB0aW1lIGNvbXBvbmVudHMgdG8gZW5zdXJlIHR3byBkaWdpdHMgZm9yIGVhY2hcbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gYCR7eWVhcn0tJHttb250aC50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9LSR7ZGF5LnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gO1xuICAgIGNvbnN0IGZvcm1hdHRlZFRpbWUgPSBgJHtob3Vycy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9OiR7bWludXRlcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9OiR7c2Vjb25kcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9YDtcblxuICAgIC8vIFJldHVybiB0aGUgZm9ybWF0dGVkIGRhdGUgYW5kIHRpbWUgc3RyaW5nXG4gICAgcmV0dXJuIGAke2Zvcm1hdHRlZERhdGV9ICR7Zm9ybWF0dGVkVGltZX1gO1xuICB9XG5cbiAgZ2V0VGltZUZvcm1hdHRlZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmZvcm1hdFVuaXhUaW1lKHRoaXMubWVzc2FnZS50aW1lKTtcbiAgfVxuXG4gIGdldEZvcm1hdHRlZE1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5tZXNzYWdlLmNvbnRlbnQuaW5jbHVkZXMoJ1widGV4dCcpKSB7XG4gICAgICAvLyBDYW4gYmUgcmVtb3ZlZCwgd2hlbiBKU09OIFJlc3BvbmNlIGlzIGZpeGVkLlxuICAgICAgcmV0dXJuIGA8cD4keyh0aGlzLm1lc3NhZ2UuY29udGVudC5zcGxpdCgnOicpWzFdLnNwbGl0KCdcIicpWzFdIHx8ICcnKX08L3A+YFxuICAgIH1cbiAgICByZXR1cm4gYDxwPiR7KHRoaXMubWVzc2FnZS5jb250ZW50IHx8ICcnKS5yZXBsYWNlKC9cXG4vZywgJzwvcD48cD4nKX08L3A+YDtcbiAgfVxuXG4gIGdldFdpZGdldENvbXBvbmVudCgpOiBUeXBlPGFueT4gfCBudWxsIHtcbiAgICBpZiAodGhpcy5tZXNzYWdlLndpZGdldD8ud2lkZ2V0TmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0c01hcC5nZXQodGhpcy5tZXNzYWdlLndpZGdldD8ud2lkZ2V0TmFtZSkgfHwgbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpc1dpZGdldEF2YWlsYWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLm1lc3NhZ2U/LndpZGdldCAmJiB0aGlzLndpZGdldHNNYXAuaGFzKHRoaXMubWVzc2FnZS53aWRnZXQud2lkZ2V0TmFtZSk7XG4gIH1cblxuXG4gIGNyZWF0ZU1lc3NhZ2VJbmplY3RvcihtZXNzYWdlOiBDbGllbnRNZXNzYWdlKSB7XG4gICAgcmV0dXJuIEluamVjdG9yLmNyZWF0ZSh7cHJvdmlkZXJzOiBbe3Byb3ZpZGU6ICdtZXNzYWdlJywgdXNlVmFsdWU6IG1lc3NhZ2V9XX0pO1xuICB9XG59XG4iXX0=