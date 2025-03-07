import { Component, Inject } from '@angular/core';
import { NgForOf } from "@angular/common";
import * as i0 from "@angular/core";
export class TicketWidgetComponent {
    message;
    fields = [{ key: 'title', value: 'Title' }, { key: 'description', value: 'Description' }];
    constructor(message) {
        this.message = message;
    }
    getFieldValue(key) {
        console.log(this.message, key);
        //@ts-ignore
        return this.message?.widget?.widgetProps?.[key] || 'NO VALUE';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: TicketWidgetComponent, deps: [{ token: 'message' }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: TicketWidgetComponent, isStandalone: true, selector: "lib-ticket-widget", ngImport: i0, template: `
    <div class="ticket-widget">
      <div class="ticket-widget__header">Ticket information:</div>

      <table>
        <tr *ngFor="let field of fields">
          <td class="ticket-widget__field">{{ field.value }}:</td>
          <td>{{ getFieldValue(field.key) }}</td>
        </tr>
      </table>
    </div>
  `, isInline: true, styles: [".ticket-widget{border:1px solid #ccc;padding:16px;border-radius:8px;background-color:#f9f9f9}.ticket-widget__header{font-style:italic;border-bottom:2px solid white;padding-bottom:4px;margin-bottom:4px}.ticket-widget__field{font-weight:700;margin-right:8px;vertical-align:top}\n"], dependencies: [{ kind: "directive", type: NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: TicketWidgetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ticket-widget', standalone: true, imports: [NgForOf], template: `
    <div class="ticket-widget">
      <div class="ticket-widget__header">Ticket information:</div>

      <table>
        <tr *ngFor="let field of fields">
          <td class="ticket-widget__field">{{ field.value }}:</td>
          <td>{{ getFieldValue(field.key) }}</td>
        </tr>
      </table>
    </div>
  `, styles: [".ticket-widget{border:1px solid #ccc;padding:16px;border-radius:8px;background-color:#f9f9f9}.ticket-widget__header{font-style:italic;border-bottom:2px solid white;padding-bottom:4px;margin-bottom:4px}.ticket-widget__field{font-weight:700;margin-right:8px;vertical-align:top}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['message']
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2V0LXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbG9yYS1jbGllbnQvc3JjL2xpYi93aWRnZXRzL3RpY2tldC13aWRnZXQvdGlja2V0LXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFFdkQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQXFCeEMsTUFBTSxPQUFPLHFCQUFxQjtJQUdNO0lBRjdCLE1BQU0sR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUMsQ0FBQyxDQUFDO0lBRS9GLFlBQXNDLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7SUFDNUQsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUFXO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQixZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLENBQUM7SUFDaEUsQ0FBQzt3R0FWVSxxQkFBcUIsa0JBR1osU0FBUzs0RkFIbEIscUJBQXFCLDZFQWJ0Qjs7Ozs7Ozs7Ozs7R0FXVCwrVkFiUyxPQUFPOzs0RkFlTixxQkFBcUI7a0JBbEJqQyxTQUFTOytCQUNFLG1CQUFtQixjQUNqQixJQUFJLFdBQ1AsQ0FBQyxPQUFPLENBQUMsWUFFUjs7Ozs7Ozs7Ozs7R0FXVDs7MEJBS1ksTUFBTTsyQkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEluamVjdCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDbGllbnRUaWNrZXRXaWRnZXRNZXNzYWdlfSBmcm9tICdAL2xvcmEtY2xpZW50L3NyYy90eXBlcy9DbGllbnRXaWRnZXRNZXNzYWdlJztcbmltcG9ydCB7TmdGb3JPZn0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlfSBmcm9tIFwiQC9sb3JhLWNsaWVudC9zcmNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLXRpY2tldC13aWRnZXQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTmdGb3JPZl0sXG4gIHN0eWxlVXJsOiAnLi90aWNrZXQtd2lkZ2V0LmNvbXBvbmVudC5zY3NzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwidGlja2V0LXdpZGdldFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpY2tldC13aWRnZXRfX2hlYWRlclwiPlRpY2tldCBpbmZvcm1hdGlvbjo8L2Rpdj5cblxuICAgICAgPHRhYmxlPlxuICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGZpZWxkIG9mIGZpZWxkc1wiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cInRpY2tldC13aWRnZXRfX2ZpZWxkXCI+e3sgZmllbGQudmFsdWUgfX06PC90ZD5cbiAgICAgICAgICA8dGQ+e3sgZ2V0RmllbGRWYWx1ZShmaWVsZC5rZXkpIH19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgVGlja2V0V2lkZ2V0Q29tcG9uZW50IHtcbiAgcmVhZG9ubHkgZmllbGRzID0gW3trZXk6ICd0aXRsZScsIHZhbHVlOiAnVGl0bGUnfSwge2tleTogJ2Rlc2NyaXB0aW9uJywgdmFsdWU6ICdEZXNjcmlwdGlvbid9XTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KCdtZXNzYWdlJykgcHVibGljIG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpIHtcbiAgfVxuXG4gIGdldEZpZWxkVmFsdWUoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnNvbGUubG9nKHRoaXMubWVzc2FnZSwga2V5KTtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlPy53aWRnZXQ/LndpZGdldFByb3BzPy5ba2V5XSB8fCAnTk8gVkFMVUUnO1xuICB9XG59XG4iXX0=