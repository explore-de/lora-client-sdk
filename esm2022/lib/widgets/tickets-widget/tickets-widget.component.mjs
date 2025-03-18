import { Component, Inject } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import * as i0 from "@angular/core";
export class TicketsWidgetComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2V0cy13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvd2lkZ2V0cy90aWNrZXRzLXdpZGdldC90aWNrZXRzLXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFxQjlDLE1BQU0sT0FBTyxzQkFBc0I7SUFLSztJQUo5QixNQUFNLENBQThCO0lBRTVDLE9BQU8sR0FBd0IsRUFBRSxDQUFDO0lBRWxDLFlBQXNDLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFDMUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQW9DLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYSxFQUFFLElBQW9CO1FBQzNDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO3dHQVpVLHNCQUFzQixrQkFLYixTQUFTOzRGQUxsQixzQkFBc0IsMEVBWHZCOzs7Ozs7Ozs7R0FTVCxpVkFYUyxPQUFPOzs0RkFhTixzQkFBc0I7a0JBaEJsQyxTQUFTOytCQUNFLGdCQUFnQixjQUNkLElBQUksV0FDUCxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFFZDs7Ozs7Ozs7O0dBU1Q7OzBCQU9ZLE1BQU07MkJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBpbmplY3QsIEluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nRm9yT2YsIE5nSWZ9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7Q2xpZW50TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvQ2xpZW50TWVzc2FnZSc7XG5pbXBvcnQge0NsaWVudFRpY2tldHNXaWRnZXRNZXNzYWdlfSBmcm9tIFwiQC9sb3JhLWNsaWVudC9zcmMvdHlwZXMvQ2xpZW50V2lkZ2V0TWVzc2FnZVwiO1xuaW1wb3J0IHtUaWNrZXRJbmZvcm1hdGlvbn0gZnJvbSBcIkAvbG9yYS1jbGllbnQvc3JjL3R5cGVzL1RpY2tldEluZm9ybWF0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpY2tldHMtd2lkZ2V0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW05nRm9yT2YsIE5nSWZdLFxuICBzdHlsZVVybDogJy4vdGlja2V0cy13aWRnZXQuY29tcG9uZW50LnNjc3MnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ0aWNrZXRzLXdpZGdldFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgdGlja2V0IG9mIHRpY2tldHM7IHRyYWNrQnk6IHRyYWNrQnlGblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGlja2V0cy13aWRnZXRfX3RpY2tldFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aWNrZXRzLXdpZGdldF9fdGlja2V0LWlkXCI+e3sgdGlja2V0LmlkIH19PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRpY2tldHMtd2lkZ2V0X190aWNrZXQtdGl0bGVcIj57eyB0aWNrZXQudGl0bGUgfX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBUaWNrZXRzV2lkZ2V0Q29tcG9uZW50IHtcbiAgcHJpdmF0ZSB3aWRnZXQ/OiBDbGllbnRUaWNrZXRzV2lkZ2V0TWVzc2FnZTtcblxuICB0aWNrZXRzOiBUaWNrZXRJbmZvcm1hdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoQEluamVjdCgnbWVzc2FnZScpIHB1YmxpYyBtZXNzYWdlOiBDbGllbnRNZXNzYWdlKSB7XG4gICAgdGhpcy53aWRnZXQgPSB0aGlzLm1lc3NhZ2U/LndpZGdldCBhcyBDbGllbnRUaWNrZXRzV2lkZ2V0TWVzc2FnZTtcbiAgICB0aGlzLnRpY2tldHMgPSB0aGlzLndpZGdldD8ud2lkZ2V0UHJvcHMudGlja2V0cyB8fCBbXTtcbiAgfVxuXG4gIHRyYWNrQnlGbihpbmRleDogbnVtYmVyLCBpdGVtOiB7IGlkOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiBpdGVtLmlkO1xuICB9XG59XG4iXX0=