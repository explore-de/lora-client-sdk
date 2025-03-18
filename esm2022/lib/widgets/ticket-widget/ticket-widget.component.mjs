import { Component, inject, Inject } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { LoraClientService } from "../../../services/lora-client.service";
import { EditableFieldComponent } from "./editable-field/editable-field.component";
import * as i0 from "@angular/core";
export class TicketWidgetComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2V0LXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbG9yYS1jbGllbnQvc3JjL2xpYi93aWRnZXRzL3RpY2tldC13aWRnZXQvdGlja2V0LXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7O0FBdURqRixNQUFNLE9BQU8scUJBQXFCO0lBc0JNO0lBckI5QixpQkFBaUIsR0FBc0IsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDakUsTUFBTSxDQUFtRTtJQUN4RSxNQUFNLEdBQXVCO1FBQ3BDLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDO1FBQzlCLEVBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFDO1FBQzFDLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxHQUFFO1FBQ3BDLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUM7UUFDdEMsRUFBQyxHQUFHLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFDO1FBQ3ZELEVBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDO0tBQ3ZDLENBQUM7SUFDTyxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsQ0FBa0Q7UUFDcEYsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDO1FBQ3pCLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDO1FBQzdCLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztRQUNmLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQztLQUNwQixDQUFDLENBQUM7SUFFSCxXQUFXLEdBQXFCLEVBQUUsQ0FBQztJQUNuQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ2hCLFVBQVUsQ0FBVTtJQUVwQixZQUFzQyxPQUFzQjtRQUF0QixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBQzFELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUF5RSxDQUFDO1FBQ3RHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztRQUMvRCxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDL0YsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztRQUNyRixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFxQixDQUFDO0lBQy9ELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWxILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxhQUFhLENBQUMsR0FBVztRQUN2QixZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUFXLEVBQUUsS0FBZ0M7UUFDekQsWUFBWTtRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFFOUMsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFhLEVBQUUsSUFBcUI7UUFDNUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7d0dBakRVLHFCQUFxQixrQkFzQlosU0FBUzs0RkF0QmxCLHFCQUFxQix5RUExQ3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0NULG9yQkExQ1MsT0FBTyxtSEFBRSxJQUFJLDZGQUFFLHNCQUFzQjs7NEZBNENwQyxxQkFBcUI7a0JBL0NqQyxTQUFTOytCQUNFLGVBQWUsY0FDYixJQUFJLFdBQ1AsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixDQUFDLFlBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0NUOzswQkF3QlksTUFBTTsyQkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIGluamVjdCwgSW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdGb3JPZiwgTmdJZn0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtMb3JhQ2xpZW50U2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2xvcmEtY2xpZW50LnNlcnZpY2VcIjtcbmltcG9ydCB7RWRpdGFibGVGaWVsZENvbXBvbmVudH0gZnJvbSBcIi4vZWRpdGFibGUtZmllbGQvZWRpdGFibGUtZmllbGQuY29tcG9uZW50XCI7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2V9IGZyb20gJy4uLy4uLy4uL3R5cGVzL0NsaWVudE1lc3NhZ2UnO1xuaW1wb3J0IHtLZXlWYWx1ZSwgS2V5VmFsdWVTY2FsYXJ9IGZyb20gJy4uLy4uLy4uL3R5cGVzL0tleVZhbHVlJztcbmltcG9ydCB7XG4gIENsaWVudFRpY2tldFN1Z2dlc3Rpb25XaWRnZXRNZXNzYWdlLFxuICBDbGllbnRUaWNrZXRXaWRnZXRNZXNzYWdlXG59IGZyb20gXCJAL2xvcmEtY2xpZW50L3NyYy90eXBlcy9DbGllbnRXaWRnZXRNZXNzYWdlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpY2tldC13aWRnZXQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTmdGb3JPZiwgTmdJZiwgRWRpdGFibGVGaWVsZENvbXBvbmVudF0sXG4gIHN0eWxlVXJsOiAnLi90aWNrZXQtd2lkZ2V0LmNvbXBvbmVudC5zY3NzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwidGlja2V0LXdpZGdldFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpY2tldC13aWRnZXRfX2hlYWRlclwiPlRpY2tldCBpbmZvcm1hdGlvbjo8L2Rpdj5cbiAgICAgIDx0YWJsZSBjbGFzcz1cInRpY2tldC13aWRnZXRfX3RhYmxlXCI+XG4gICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZmllbGRzOyB0cmFja0J5OiB0cmFja0J5Rm5cIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJ0aWNrZXQtd2lkZ2V0X19maWVsZFwiPnt7IGZpZWxkLnZhbHVlIH19OjwvdGQ+XG4gICAgICAgICAgPHRkIGNsYXNzPVwidGlja2V0LXdpZGdldF9fdmFsdWVcIj5cbiAgICAgICAgICAgIDxlZGl0YWJsZS1maWVsZFxuICAgICAgICAgICAgICBbdmFsdWVdPVwiZ2V0RmllbGRWYWx1ZShmaWVsZC5rZXkpXCJcbiAgICAgICAgICAgICAgW3R5cGVdPVwiZWRpdGFibGVGaWVsZHNNYXAuZ2V0KGZpZWxkLmtleSkgfHwgJ3RleHQnXCJcbiAgICAgICAgICAgICAgW2lzVmlld09ubHldPVwiIWlzRWRpdGFibGUgfHwgaXNTYXZlZFwiXG4gICAgICAgICAgICAgIChvbkNoYW5nZSk9XCJzZXRGaWVsZFZhbHVlKGZpZWxkLmtleSwgJGV2ZW50KVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RhYmxlPlxuXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwib3RoZXJGaWVsZHMubGVuZ3RoID4gMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGlja2V0LXdpZGdldF9fY3VzdG9tLWF0dHJpYnV0ZXNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGlja2V0LXdpZGdldF9faGVhZGVyXCI+T3RoZXIgZmllbGRzOjwvZGl2PlxuICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRpY2tldC13aWRnZXRfX3RhYmxlXCI+XG4gICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGZpZWxkIG9mIG90aGVyRmllbGRzXCI+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpY2tldC13aWRnZXRfX2ZpZWxkXCI+e3sgZmllbGQua2V5IH19OjwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRpY2tldC13aWRnZXRfX3ZhbHVlXCI+XG4gICAgICAgICAgICAgICAgPGVkaXRhYmxlLWZpZWxkXG4gICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiZmllbGQudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW3R5cGVdPVwiZWRpdGFibGVGaWVsZHNNYXAuZ2V0KGZpZWxkLmtleSkgfHwgJ3RleHQnXCJcbiAgICAgICAgICAgICAgICAgIFtpc1ZpZXdPbmx5XT1cIiFpc0VkaXRhYmxlIHx8IGlzU2F2ZWQgfHwgIWVkaXRhYmxlRmllbGRzTWFwLmhhcyhmaWVsZC5rZXkpXCJcbiAgICAgICAgICAgICAgICAgIChvbkNoYW5nZSk9XCJzZXRGaWVsZFZhbHVlKGZpZWxkLmtleSwgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPGRpdiAqbmdJZj1cIiFpc1NhdmVkICYmIGlzRWRpdGFibGVcIiBjbGFzcz1cInRpY2tldC13aWRnZXRfX2FjdGlvbnNcIj5cbiAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwib25DbGlja1NhdmUoKVwiPnt7ICdTYXZlJyB9fTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgVGlja2V0V2lkZ2V0Q29tcG9uZW50IHtcbiAgcHJpdmF0ZSBsb3JhQ2xpZW50U2VydmljZTogTG9yYUNsaWVudFNlcnZpY2UgPSBpbmplY3QoTG9yYUNsaWVudFNlcnZpY2UpO1xuICBwcml2YXRlIHdpZGdldD86IENsaWVudFRpY2tldFdpZGdldE1lc3NhZ2UgfCBDbGllbnRUaWNrZXRTdWdnZXN0aW9uV2lkZ2V0TWVzc2FnZTtcbiAgcmVhZG9ubHkgZmllbGRzOiBLZXlWYWx1ZTxzdHJpbmc+W10gPSBbXG4gICAge2tleTogJ3RpdGxlJywgdmFsdWU6ICdUaXRsZSd9LFxuICAgIHtrZXk6ICdkZXNjcmlwdGlvbicsIHZhbHVlOiAnRGVzY3JpcHRpb24nfSxcbiAgICB7a2V5OiAnZHVlRGF0ZScsIHZhbHVlOiAnRHVlIERhdGUnLH0sXG4gICAge2tleTogJ2dlbycsIHZhbHVlOiAnR2VvIEluZm9ybWF0aW9uJ30sXG4gICAge2tleTogJ3Jlc3BvbnNpYmxlUGVyc29uJywgdmFsdWU6ICdSZXNwb25zaWJsZSBQZXJzb24nfSxcbiAgICB7a2V5OiAnY29tcGxldGVkJywgdmFsdWU6ICdDb21wbGV0ZWQnfVxuICBdO1xuICByZWFkb25seSBlZGl0YWJsZUZpZWxkc01hcCA9IG5ldyBNYXA8c3RyaW5nLCAndGV4dCcgfCAnZGF0ZScgfCAnbnVtYmVyJyB8ICdjaGVja2JveCc+KFtcbiAgICBbJ2NvbXBsZXRlZCcsICdjaGVja2JveCddLFxuICAgIFsncmVzcG9uc2libGVQZXJzb24nLCAndGV4dCddLFxuICAgIFsnZ2VvJywgJ3RleHQnXSxcbiAgICBbJ2R1ZURhdGUnLCAnZGF0ZSddXG4gIF0pO1xuXG4gIG90aGVyRmllbGRzOiBLZXlWYWx1ZVNjYWxhcltdID0gW107XG4gIGlzU2F2ZWQgPSBmYWxzZTtcbiAgaXNFZGl0YWJsZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KCdtZXNzYWdlJykgcHVibGljIG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpIHtcbiAgICB0aGlzLndpZGdldCA9IHRoaXMubWVzc2FnZT8ud2lkZ2V0IGFzIENsaWVudFRpY2tldFdpZGdldE1lc3NhZ2UgfCBDbGllbnRUaWNrZXRTdWdnZXN0aW9uV2lkZ2V0TWVzc2FnZTtcbiAgICB0aGlzLmlzRWRpdGFibGUgPSB0aGlzLndpZGdldD8ud2lkZ2V0UHJvcHMuaXNFZGl0YWJsZSB8fCBmYWxzZTtcbiAgICB0aGlzLm90aGVyRmllbGRzID0gT2JqZWN0LmVudHJpZXModGhpcy53aWRnZXQ/LndpZGdldFByb3BzLnRpY2tldCB8fCB7fSkuZmlsdGVyKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIHJldHVybiAhdGhpcy5maWVsZHMubWFwKCh7a2V5fSkgPT4ga2V5KS5pbmNsdWRlcyhrZXkpICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCc7XG4gICAgfSkubWFwKChba2V5LCB2YWx1ZV0pID0+ICh7a2V5LCB2YWx1ZX0pKSBhcyBLZXlWYWx1ZVNjYWxhcltdO1xuICB9XG5cbiAgb25DbGlja1NhdmUoKSB7XG4gICAgdGhpcy5sb3JhQ2xpZW50U2VydmljZS5zZW5kTWVzc2FnZSh0aGlzLmxvcmFDbGllbnRTZXJ2aWNlLnRpY2tldFRvUmVxdWVzdCh0aGlzLndpZGdldCEud2lkZ2V0UHJvcHMudGlja2V0KSwgdHJ1ZSk7XG5cbiAgICB0aGlzLmlzU2F2ZWQgPSB0cnVlO1xuICB9XG5cbiAgZ2V0RmllbGRWYWx1ZShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0Py53aWRnZXRQcm9wcz8udGlja2V0Py5ba2V5XSB8fCAnJztcbiAgfVxuXG4gIHNldEZpZWxkVmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKSB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgdGhpcy53aWRnZXQud2lkZ2V0UHJvcHMudGlja2V0W2tleV0gPSB2YWx1ZTtcblxuICB9XG5cbiAgdHJhY2tCeUZuKGluZGV4OiBudW1iZXIsIGl0ZW06IHsga2V5OiBzdHJpbmcgfSkge1xuICAgIHJldHVybiBpdGVtLmtleTtcbiAgfVxufVxuIl19