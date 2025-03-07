import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { NgClass, NgComponentOutlet, NgIf } from "@angular/common";
import { TicketWidgetComponent } from '../widgets/ticket-widget/ticket-widget.component';
import * as i0 from "@angular/core";
export class MessageComponent {
    message;
    partsTableComponent = null;
    widgetsMap = new Map([['exploreticket', TicketWidgetComponent]]);
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: MessageComponent, isStandalone: true, selector: "client-message", inputs: { message: "message", partsTableComponent: "partsTableComponent" }, ngImport: i0, template: `
    <div class="client-message" [ngClass]="{'client-message--own': message.user == 'me'}">
      <div class="client-message__content">
        <div *ngIf="message.content" [innerHTML]="getFormattedMessage()"></div>

        <ng-container *ngIf="isWidgetAvailable()">
          <ng-container
            *ngComponentOutlet="getWidgetComponent(); injector: createMessageInjector(message)"></ng-container>
        </ng-container>
        <ng-container *ngIf="message.parts && message.parts.length">
          <ng-container
            *ngComponentOutlet="partsTableComponent; injector: createMessageInjector(message)"/>
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
            *ngComponentOutlet="getWidgetComponent(); injector: createMessageInjector(message)"></ng-container>
        </ng-container>
        <ng-container *ngIf="message.parts && message.parts.length">
          <ng-container
            *ngComponentOutlet="partsTableComponent; injector: createMessageInjector(message)"/>
        </ng-container>
      </div>
    </div>`, styles: [".client-message{margin:8px 0;display:flex;flex-direction:column;align-items:flex-start}.client-message__content{background:var(--message-color-1);padding:8px;border-radius:var(--message-border-radius, 16px)}.client-message__content p{padding:0;margin:0}.client-message--own{align-items:flex-end}.client-message--own .client-message__content{background:var(--message-color-2)}\n"] }]
        }], propDecorators: { message: [{
                type: Input
            }], partsTableComponent: [{
                type: Input,
                args: ['partsTableComponent']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9yYS1jbGllbnQvc3JjL2xpYi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBUSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVsRixPQUFPLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGtEQUFrRCxDQUFDOztBQXdCdkYsTUFBTSxPQUFPLGdCQUFnQjtJQUNsQixPQUFPLENBQWlCO0lBQ0gsbUJBQW1CLEdBQXFCLElBQUksQ0FBQztJQUUxRCxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQW9CLENBQUMsQ0FBQyxlQUFlLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFN0YsY0FBYyxDQUFDLFFBQWdCO1FBQ3JDLGtFQUFrRTtRQUNsRSxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFdkMsb0RBQW9EO1FBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0NBQXdDO1FBQzNFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVoQywyREFBMkQ7UUFDM0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFbEMsb0VBQW9FO1FBQ3BFLE1BQU0sYUFBYSxHQUFHLEdBQUcsSUFBSSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDeEcsTUFBTSxhQUFhLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBRTNJLDRDQUE0QztRQUM1QyxPQUFPLEdBQUcsYUFBYSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUM1RSxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUM7WUFDcEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDdEUsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGlCQUFpQjtRQUNmLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFHRCxxQkFBcUIsQ0FBQyxPQUFzQjtRQUMxQyxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7d0dBbERVLGdCQUFnQjs0RkFBaEIsZ0JBQWdCLHNKQWhCakI7Ozs7Ozs7Ozs7Ozs7O1dBY0QsbWNBaEJDLE9BQU8sb0ZBQUUsaUJBQWlCLG9QQUFFLElBQUk7OzRGQWtCL0IsZ0JBQWdCO2tCQXRCNUIsU0FBUzsrQkFDRSxnQkFBZ0IsY0FDZCxJQUFJLGlCQUNELGlCQUFpQixDQUFDLElBQUksV0FDNUIsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFlBRWpDOzs7Ozs7Ozs7Ozs7OztXQWNEOzhCQUdBLE9BQU87c0JBQWYsS0FBSztnQkFDd0IsbUJBQW1CO3NCQUFoRCxLQUFLO3VCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3RvciwgSW5wdXQsIFR5cGUsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZX0gZnJvbSBcIkAvbG9yYS1jbGllbnQvc3JjL3R5cGVzL0NsaWVudE1lc3NhZ2VcIjtcbmltcG9ydCB7TmdDbGFzcywgTmdDb21wb25lbnRPdXRsZXQsIE5nSWZ9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7VGlja2V0V2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuLi93aWRnZXRzL3RpY2tldC13aWRnZXQvdGlja2V0LXdpZGdldC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbGllbnQtbWVzc2FnZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGltcG9ydHM6IFtOZ0NsYXNzLCBOZ0NvbXBvbmVudE91dGxldCwgTmdJZl0sXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2UuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LW1lc3NhZ2VcIiBbbmdDbGFzc109XCJ7J2NsaWVudC1tZXNzYWdlLS1vd24nOiBtZXNzYWdlLnVzZXIgPT0gJ21lJ31cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjbGllbnQtbWVzc2FnZV9fY29udGVudFwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibWVzc2FnZS5jb250ZW50XCIgW2lubmVySFRNTF09XCJnZXRGb3JtYXR0ZWRNZXNzYWdlKClcIj48L2Rpdj5cblxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNXaWRnZXRBdmFpbGFibGUoKVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ0NvbXBvbmVudE91dGxldD1cImdldFdpZGdldENvbXBvbmVudCgpOyBpbmplY3RvcjogY3JlYXRlTWVzc2FnZUluamVjdG9yKG1lc3NhZ2UpXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibWVzc2FnZS5wYXJ0cyAmJiBtZXNzYWdlLnBhcnRzLmxlbmd0aFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ0NvbXBvbmVudE91dGxldD1cInBhcnRzVGFibGVDb21wb25lbnQ7IGluamVjdG9yOiBjcmVhdGVNZXNzYWdlSW5qZWN0b3IobWVzc2FnZSlcIi8+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbWVzc2FnZSE6IENsaWVudE1lc3NhZ2U7XG4gIEBJbnB1dCgncGFydHNUYWJsZUNvbXBvbmVudCcpIHBhcnRzVGFibGVDb21wb25lbnQ6IFR5cGU8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgd2lkZ2V0c01hcCA9IG5ldyBNYXA8c3RyaW5nLCBUeXBlPGFueT4+KFtbJ2V4cGxvcmV0aWNrZXQnLCBUaWNrZXRXaWRnZXRDb21wb25lbnRdXSk7XG5cbiAgcHJpdmF0ZSBmb3JtYXRVbml4VGltZSh1bml4VGltZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAvLyBDcmVhdGUgYSBuZXcgSmF2YVNjcmlwdCBEYXRlIG9iamVjdCBiYXNlZCBvbiB0aGUgVW5peCB0aW1lc3RhbXBcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodW5peFRpbWUgKiAxMDAwKTtcblxuICAgIC8vIEdldCB0aGUgZGF5LCBtb250aCwgYW5kIHllYXIgZnJvbSB0aGUgZGF0ZSBvYmplY3RcbiAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7IC8vIE1vbnRocyBhcmUgemVyby1pbmRleGVkIGluIEphdmFTY3JpcHRcbiAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgLy8gR2V0IHRoZSBob3VycywgbWludXRlcywgYW5kIHNlY29uZHMgZnJvbSB0aGUgZGF0ZSBvYmplY3RcbiAgICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBtaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuXG4gICAgLy8gRm9ybWF0IHRoZSBkYXRlIGFuZCB0aW1lIGNvbXBvbmVudHMgdG8gZW5zdXJlIHR3byBkaWdpdHMgZm9yIGVhY2hcbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gYCR7eWVhcn0tJHttb250aC50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9LSR7ZGF5LnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gO1xuICAgIGNvbnN0IGZvcm1hdHRlZFRpbWUgPSBgJHtob3Vycy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9OiR7bWludXRlcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9OiR7c2Vjb25kcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9YDtcblxuICAgIC8vIFJldHVybiB0aGUgZm9ybWF0dGVkIGRhdGUgYW5kIHRpbWUgc3RyaW5nXG4gICAgcmV0dXJuIGAke2Zvcm1hdHRlZERhdGV9ICR7Zm9ybWF0dGVkVGltZX1gO1xuICB9XG5cbiAgZ2V0VGltZUZvcm1hdHRlZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmZvcm1hdFVuaXhUaW1lKHRoaXMubWVzc2FnZS50aW1lKTtcbiAgfVxuXG4gIGdldEZvcm1hdHRlZE1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYDxwPiR7KHRoaXMubWVzc2FnZS5jb250ZW50IHx8ICcnKS5yZXBsYWNlKC9cXG4vZywgJzwvcD48cD4nKX08L3A+YDtcbiAgfVxuXG4gIGdldFdpZGdldENvbXBvbmVudCgpOiBUeXBlPGFueT4gfCBudWxsIHtcbiAgICBpZiAodGhpcy5tZXNzYWdlLndpZGdldD8ud2lkZ2V0TmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0c01hcC5nZXQodGhpcy5tZXNzYWdlLndpZGdldD8ud2lkZ2V0TmFtZSkgfHwgbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpc1dpZGdldEF2YWlsYWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLm1lc3NhZ2U/LndpZGdldCAmJiB0aGlzLndpZGdldHNNYXAuaGFzKHRoaXMubWVzc2FnZS53aWRnZXQud2lkZ2V0TmFtZSk7XG4gIH1cblxuXG4gIGNyZWF0ZU1lc3NhZ2VJbmplY3RvcihtZXNzYWdlOiBDbGllbnRNZXNzYWdlKSB7XG4gICAgcmV0dXJuIEluamVjdG9yLmNyZWF0ZSh7cHJvdmlkZXJzOiBbe3Byb3ZpZGU6ICdtZXNzYWdlJywgdXNlVmFsdWU6IG1lc3NhZ2V9XX0pO1xuICB9XG59XG4iXX0=