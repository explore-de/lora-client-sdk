import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { NgClass, NgComponentOutlet, NgIf } from "@angular/common";
import { TicketWidgetComponent } from '../widgets/ticket-widget/ticket-widget.component';
import * as i0 from "@angular/core";
export class MessageComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9yYS1jbGllbnQvc3JjL2xpYi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFakcsT0FBTyxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQzs7QUF3QnZGLE1BQU0sT0FBTyxnQkFBZ0I7SUFDbEIsT0FBTyxDQUFpQjtJQUNILG1CQUFtQixHQUFxQixJQUFJLENBQUM7SUFFMUQsVUFBVSxHQUFHLElBQUksR0FBRyxDQUFvQixDQUFDLENBQUMsZUFBZSxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLGVBQWUsQ0FBVztJQUdqQztRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLENBQUM7SUFDSCxDQUFDO0lBRU8sY0FBYyxDQUFDLFFBQWdCO1FBQ3JDLGtFQUFrRTtRQUNsRSxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFdkMsb0RBQW9EO1FBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0NBQXdDO1FBQzNFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVoQywyREFBMkQ7UUFDM0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFbEMsb0VBQW9FO1FBQ3BFLE1BQU0sYUFBYSxHQUFHLEdBQUcsSUFBSSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDeEcsTUFBTSxhQUFhLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBRTNJLDRDQUE0QztRQUM1QyxPQUFPLEdBQUcsYUFBYSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDM0MsK0NBQStDO1lBQy9DLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQTtRQUM3RSxDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQzVFLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQztZQUNwQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUN0RSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUdELHFCQUFxQixDQUFDLE9BQXNCO1FBQzFDLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDakYsQ0FBQzt3R0FsRVUsZ0JBQWdCOzRGQUFoQixnQkFBZ0IsMktBaEJqQjs7Ozs7Ozs7Ozs7Ozs7V0FjRCxtY0FoQkMsT0FBTyxvRkFBRSxpQkFBaUIsb1BBQUUsSUFBSTs7NEZBa0IvQixnQkFBZ0I7a0JBdEI1QixTQUFTOytCQUNFLGdCQUFnQixjQUNkLElBQUksaUJBQ0QsaUJBQWlCLENBQUMsSUFBSSxXQUM1QixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsWUFFakM7Ozs7Ozs7Ozs7Ozs7O1dBY0Q7d0RBR0EsT0FBTztzQkFBZixLQUFLO2dCQUN3QixtQkFBbUI7c0JBQWhELEtBQUs7dUJBQUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEluamVjdG9yLCBJbnB1dCwgU2ltcGxlQ2hhbmdlcywgVHlwZSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlfSBmcm9tIFwiQC9sb3JhLWNsaWVudC9zcmMvdHlwZXMvQ2xpZW50TWVzc2FnZVwiO1xuaW1wb3J0IHtOZ0NsYXNzLCBOZ0NvbXBvbmVudE91dGxldCwgTmdJZn0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtUaWNrZXRXaWRnZXRDb21wb25lbnR9IGZyb20gJy4uL3dpZGdldHMvdGlja2V0LXdpZGdldC90aWNrZXQtd2lkZ2V0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NsaWVudC1tZXNzYWdlJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaW1wb3J0czogW05nQ2xhc3MsIE5nQ29tcG9uZW50T3V0bGV0LCBOZ0lmXSxcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZS5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjbGllbnQtbWVzc2FnZVwiIFtuZ0NsYXNzXT1cInsnY2xpZW50LW1lc3NhZ2UtLW93bic6IG1lc3NhZ2UudXNlciA9PSAnbWUnfVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNsaWVudC1tZXNzYWdlX19jb250ZW50XCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJtZXNzYWdlLmNvbnRlbnRcIiBbaW5uZXJIVE1MXT1cImdldEZvcm1hdHRlZE1lc3NhZ2UoKVwiPjwvZGl2PlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1dpZGdldEF2YWlsYWJsZSgpXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nQ29tcG9uZW50T3V0bGV0PVwiZ2V0V2lkZ2V0Q29tcG9uZW50KCk7IGluamVjdG9yOiBtZXNzYWdlSW5qZWN0b3JcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtZXNzYWdlLnBhcnRzICYmIG1lc3NhZ2UucGFydHMubGVuZ3RoXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nQ29tcG9uZW50T3V0bGV0PVwicGFydHNUYWJsZUNvbXBvbmVudDsgaW5qZWN0b3I6IG1lc3NhZ2VJbmplY3RvcjtcIi8+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbWVzc2FnZSE6IENsaWVudE1lc3NhZ2U7XG4gIEBJbnB1dCgncGFydHNUYWJsZUNvbXBvbmVudCcpIHBhcnRzVGFibGVDb21wb25lbnQ6IFR5cGU8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgd2lkZ2V0c01hcCA9IG5ldyBNYXA8c3RyaW5nLCBUeXBlPGFueT4+KFtbJ2V4cGxvcmV0aWNrZXQnLCBUaWNrZXRXaWRnZXRDb21wb25lbnRdXSk7XG4gIHB1YmxpYyBtZXNzYWdlSW5qZWN0b3I6IEluamVjdG9yO1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tZXNzYWdlSW5qZWN0b3IgPSB0aGlzLmNyZWF0ZU1lc3NhZ2VJbmplY3Rvcih0aGlzLm1lc3NhZ2UpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydtZXNzYWdlJ10pIHtcbiAgICAgIHRoaXMubWVzc2FnZUluamVjdG9yID0gdGhpcy5jcmVhdGVNZXNzYWdlSW5qZWN0b3IodGhpcy5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdFVuaXhUaW1lKHVuaXhUaW1lOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIC8vIENyZWF0ZSBhIG5ldyBKYXZhU2NyaXB0IERhdGUgb2JqZWN0IGJhc2VkIG9uIHRoZSBVbml4IHRpbWVzdGFtcFxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh1bml4VGltZSAqIDEwMDApO1xuXG4gICAgLy8gR2V0IHRoZSBkYXksIG1vbnRoLCBhbmQgeWVhciBmcm9tIHRoZSBkYXRlIG9iamVjdFxuICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTsgLy8gTW9udGhzIGFyZSB6ZXJvLWluZGV4ZWQgaW4gSmF2YVNjcmlwdFxuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAvLyBHZXQgdGhlIGhvdXJzLCBtaW51dGVzLCBhbmQgc2Vjb25kcyBmcm9tIHRoZSBkYXRlIG9iamVjdFxuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICBjb25zdCBzZWNvbmRzID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG5cbiAgICAvLyBGb3JtYXQgdGhlIGRhdGUgYW5kIHRpbWUgY29tcG9uZW50cyB0byBlbnN1cmUgdHdvIGRpZ2l0cyBmb3IgZWFjaFxuICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBgJHt5ZWFyfS0ke21vbnRoLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX0tJHtkYXkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfWA7XG4gICAgY29uc3QgZm9ybWF0dGVkVGltZSA9IGAke2hvdXJzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX06JHttaW51dGVzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX06JHtzZWNvbmRzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gO1xuXG4gICAgLy8gUmV0dXJuIHRoZSBmb3JtYXR0ZWQgZGF0ZSBhbmQgdGltZSBzdHJpbmdcbiAgICByZXR1cm4gYCR7Zm9ybWF0dGVkRGF0ZX0gJHtmb3JtYXR0ZWRUaW1lfWA7XG4gIH1cblxuICBnZXRUaW1lRm9ybWF0dGVkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0VW5peFRpbWUodGhpcy5tZXNzYWdlLnRpbWUpO1xuICB9XG5cbiAgZ2V0Rm9ybWF0dGVkTWVzc2FnZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLm1lc3NhZ2UuY29udGVudC5pbmNsdWRlcygnXCJ0ZXh0JykpIHtcbiAgICAgIC8vIENhbiBiZSByZW1vdmVkLCB3aGVuIEpTT04gUmVzcG9uY2UgaXMgZml4ZWQuXG4gICAgICByZXR1cm4gYDxwPiR7KHRoaXMubWVzc2FnZS5jb250ZW50LnNwbGl0KCc6JylbMV0uc3BsaXQoJ1wiJylbMV0gfHwgJycpfTwvcD5gXG4gICAgfVxuICAgIHJldHVybiBgPHA+JHsodGhpcy5tZXNzYWdlLmNvbnRlbnQgfHwgJycpLnJlcGxhY2UoL1xcbi9nLCAnPC9wPjxwPicpfTwvcD5gO1xuICB9XG5cbiAgZ2V0V2lkZ2V0Q29tcG9uZW50KCk6IFR5cGU8YW55PiB8IG51bGwge1xuICAgIGlmICh0aGlzLm1lc3NhZ2Uud2lkZ2V0Py53aWRnZXROYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy53aWRnZXRzTWFwLmdldCh0aGlzLm1lc3NhZ2Uud2lkZ2V0Py53aWRnZXROYW1lKSB8fCBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlzV2lkZ2V0QXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMubWVzc2FnZT8ud2lkZ2V0ICYmIHRoaXMud2lkZ2V0c01hcC5oYXModGhpcy5tZXNzYWdlLndpZGdldC53aWRnZXROYW1lKTtcbiAgfVxuXG5cbiAgY3JlYXRlTWVzc2FnZUluamVjdG9yKG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpIHtcbiAgICByZXR1cm4gSW5qZWN0b3IuY3JlYXRlKHtwcm92aWRlcnM6IFt7cHJvdmlkZTogJ21lc3NhZ2UnLCB1c2VWYWx1ZTogbWVzc2FnZX1dfSk7XG4gIH1cbn1cbiJdfQ==