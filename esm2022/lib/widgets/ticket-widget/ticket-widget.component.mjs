import { Component, inject, Inject } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { LoraClientService } from "../../../services/lora-client.service";
import { EditableFieldComponent } from "./editable-field/editable-field.component";
import * as i0 from "@angular/core";
export class TicketWidgetComponent {
    message;
    loraClientService = inject(LoraClientService);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2V0LXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbG9yYS1jbGllbnQvc3JjL2xpYi93aWRnZXRzL3RpY2tldC13aWRnZXQvdGlja2V0LXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7O0FBaURqRixNQUFNLE9BQU8scUJBQXFCO0lBT007SUFOOUIsaUJBQWlCLEdBQXNCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2hFLE1BQU0sR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUMsQ0FBQyxDQUFDO0lBQ3RGLGNBQWMsR0FBRyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN2RCxnQkFBZ0IsR0FBd0QsRUFBRSxDQUFDO0lBQzNFLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFFaEIsWUFBc0MsT0FBc0I7UUFBdEIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUMxRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdkgsR0FBRztZQUNILEtBQUs7U0FDTixDQUFDLENBQUMsQ0FBQztRQUVKLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV0RyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsYUFBYSxDQUFDLEdBQVc7UUFDdkIsWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxDQUFDO0lBQ2hFLENBQUM7SUFFRCxhQUFhLENBQUMsR0FBVyxFQUFFLEtBQWdDO1FBQ3pELFlBQVk7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRTdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELHVCQUF1QixDQUFDLEdBQVcsRUFBRSxLQUFnQztRQUNuRSxZQUFZO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYSxFQUFFLElBQXFCO1FBQzVDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO3dHQTFDVSxxQkFBcUIsa0JBT1osU0FBUzs0RkFQbEIscUJBQXFCLHlFQXpDdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDVCx3a0JBekNTLE9BQU8sbUhBQUUsSUFBSSw2RkFBRSxzQkFBc0I7OzRGQTJDcEMscUJBQXFCO2tCQTlDakMsU0FBUzsrQkFDRSxlQUFlLGNBQ2IsSUFBSSxXQUNQLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxZQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNUOzswQkFTWSxNQUFNOzJCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgaW5qZWN0LCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ0Zvck9mLCBOZ0lmfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0xvcmFDbGllbnRTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvbG9yYS1jbGllbnQuc2VydmljZVwiO1xuaW1wb3J0IHtFZGl0YWJsZUZpZWxkQ29tcG9uZW50fSBmcm9tIFwiLi9lZGl0YWJsZS1maWVsZC9lZGl0YWJsZS1maWVsZC5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2xpZW50TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvQ2xpZW50TWVzc2FnZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpY2tldC13aWRnZXQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTmdGb3JPZiwgTmdJZiwgRWRpdGFibGVGaWVsZENvbXBvbmVudF0sXG4gIHN0eWxlVXJsOiAnLi90aWNrZXQtd2lkZ2V0LmNvbXBvbmVudC5zY3NzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwidGlja2V0LXdpZGdldFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpY2tldC13aWRnZXRfX2hlYWRlclwiPlRpY2tldCBpbmZvcm1hdGlvbjo8L2Rpdj5cbiAgICAgIDx0YWJsZSBjbGFzcz1cInRpY2tldC13aWRnZXRfX3RhYmxlXCI+XG4gICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZmllbGRzOyB0cmFja0J5OiB0cmFja0J5Rm5cIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJ0aWNrZXQtd2lkZ2V0X19maWVsZFwiPnt7IGZpZWxkLnZhbHVlIH19OjwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwidGlja2V0LXdpZGdldF9fdmFsdWVcIj5cbiAgICAgICAgICAgIDxlZGl0YWJsZS1maWVsZFxuICAgICAgICAgICAgICBbdmFsdWVdPVwiZ2V0RmllbGRWYWx1ZShmaWVsZC5rZXkpXCJcbiAgICAgICAgICAgICAgW2lzVmlld09ubHldPVwiaXNTYXZlZFwiXG4gICAgICAgICAgICAgIChvbkNoYW5nZSk9XCJzZXRGaWVsZFZhbHVlKGZpZWxkLmtleSwgJGV2ZW50KVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RhYmxlPlxuXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VzdG9tQXR0cmlidXRlcy5sZW5ndGggPiAwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aWNrZXQtd2lkZ2V0X19jdXN0b20tYXR0cmlidXRlc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aWNrZXQtd2lkZ2V0X19oZWFkZXJcIj5DdXN0b20gYXR0cmlidXRlczo8L2Rpdj5cblxuICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRpY2tldC13aWRnZXRfX3RhYmxlXCI+XG4gICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGZpZWxkIG9mIGN1c3RvbUF0dHJpYnV0ZXNcIj5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGlja2V0LXdpZGdldF9fZmllbGRcIj57eyBmaWVsZC5rZXkgfX06PC90ZD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGlja2V0LXdpZGdldF9fdmFsdWVcIj5cbiAgICAgICAgICAgICAgICA8ZWRpdGFibGUtZmllbGRcbiAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJmaWVsZC52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBbaXNWaWV3T25seV09XCJpc1NhdmVkIHx8ICFlZGl0YWJsZUZpZWxkcy5pbmNsdWRlcyhmaWVsZC5rZXkpXCJcbiAgICAgICAgICAgICAgICAgIChvbkNoYW5nZSk9XCJzZXRDdXN0b21BdHRyaWJ1dGVWYWx1ZShmaWVsZC5rZXksICRldmVudClcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCIhaXNTYXZlZFwiIGNsYXNzPVwidGlja2V0LXdpZGdldF9fYWN0aW9uc1wiPlxuICAgICAgICA8YnV0dG9uIChjbGljayk9XCJvbkNsaWNrU2F2ZSgpXCI+e3sgJ1NhdmUnIH19PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBUaWNrZXRXaWRnZXRDb21wb25lbnQge1xuICBwcml2YXRlIGxvcmFDbGllbnRTZXJ2aWNlOiBMb3JhQ2xpZW50U2VydmljZSA9IGluamVjdChMb3JhQ2xpZW50U2VydmljZSk7XG4gIHJlYWRvbmx5IGZpZWxkcyA9IFt7a2V5OiAndGl0bGUnLCB2YWx1ZTogJ1RpdGxlJ30sIHtrZXk6ICdkZXNjcmlwdGlvbicsIHZhbHVlOiAnRGVzY3JpcHRpb24nfV07XG4gIHJlYWRvbmx5IGVkaXRhYmxlRmllbGRzID0gWydjb21wbGV0ZWQnLCAncmVzcG9uc2libGUnXTtcbiAgY3VzdG9tQXR0cmlidXRlczogeyBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfVtdID0gW107XG4gIGlzU2F2ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KCdtZXNzYWdlJykgcHVibGljIG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpIHtcbiAgICB0aGlzLmN1c3RvbUF0dHJpYnV0ZXMgPSBPYmplY3QuZW50cmllcyh0aGlzLm1lc3NhZ2U/LndpZGdldD8ud2lkZ2V0UHJvcHM/LmN1c3RvbUF0dHJpYnV0ZXMgfHwge30pLm1hcCgoW2tleSwgdmFsdWVdKSA9PiAoe1xuICAgICAga2V5LFxuICAgICAgdmFsdWVcbiAgICB9KSk7XG5cbiAgICBjb25zb2xlLmxvZygnVGlja2V0V2lkZ2V0Q29tcG9uZW50IGNyZWF0ZWQnLCB0aGlzLm1lc3NhZ2U/LmlkKTtcbiAgfVxuXG4gIG9uQ2xpY2tTYXZlKCkge1xuICAgIHRoaXMubG9yYUNsaWVudFNlcnZpY2Uuc2VuZE1lc3NhZ2UodGhpcy5sb3JhQ2xpZW50U2VydmljZS50aWNrZXRNZXNzYWdlVG9SZXF1ZXN0KHRoaXMubWVzc2FnZSksIHRydWUpO1xuXG4gICAgdGhpcy5pc1NhdmVkID0gdHJ1ZTtcbiAgfVxuXG4gIGdldEZpZWxkVmFsdWUoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIHJldHVybiB0aGlzLm1lc3NhZ2U/LndpZGdldD8ud2lkZ2V0UHJvcHM/LltrZXldIHx8ICdOTyBWQUxVRSc7XG4gIH1cblxuICBzZXRGaWVsZFZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbikge1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIHRoaXMubWVzc2FnZS53aWRnZXQud2lkZ2V0UHJvcHNba2V5XSA9IHZhbHVlO1xuXG4gICAgY29uc29sZS5sb2coJ0RBVEEgQUZURVIgVVBEQVRFJywgdGhpcy5tZXNzYWdlLndpZGdldCEud2lkZ2V0UHJvcHMpO1xuICB9XG5cbiAgc2V0Q3VzdG9tQXR0cmlidXRlVmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKSB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgdGhpcy5tZXNzYWdlLndpZGdldC53aWRnZXRQcm9wcy5jdXN0b21BdHRyaWJ1dGVzW2tleV0gPSB2YWx1ZTtcbiAgICBjb25zb2xlLmxvZygnREFUQSBBRlRFUiBVUERBVEUnLCB0aGlzLm1lc3NhZ2Uud2lkZ2V0IS53aWRnZXRQcm9wcyk7XG4gIH1cblxuICB0cmFja0J5Rm4oaW5kZXg6IG51bWJlciwgaXRlbTogeyBrZXk6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIGl0ZW0ua2V5O1xuICB9XG59XG4iXX0=