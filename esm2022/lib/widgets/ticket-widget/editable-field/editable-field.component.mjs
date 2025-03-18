import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from "@angular/common";
import * as i0 from "@angular/core";
export class EditableFieldComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdGFibGUtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvd2lkZ2V0cy90aWNrZXQtd2lkZ2V0L2VkaXRhYmxlLWZpZWxkL2VkaXRhYmxlLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUE0QnJDLE1BQU0sT0FBTyxzQkFBc0I7SUFDUixLQUFLLEdBQThCLEVBQUUsQ0FBQztJQUN0QyxJQUFJLEdBQTRDLE1BQU0sQ0FBQztJQUN2RCxVQUFVLEdBQVksS0FBSyxDQUFDO0lBQzNDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBNkIsQ0FBQztJQUVuRSxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUM7SUFDaEMsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBR0QsZ0JBQWdCO1FBQ2QsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQWUsQ0FBQyxDQUFDO1FBRTVDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0QsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFcEQsTUFBTSxhQUFhLEdBQUcsR0FBRyxJQUFJLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWhELE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBWTtRQUN4QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBMEIsQ0FBQztRQUMvQyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUV2RSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQWtCLENBQUMsQ0FBQztZQUMxQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLENBQUM7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDO3dHQTVDVSxzQkFBc0I7NEZBQXRCLHNCQUFzQixpTEFyQnZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJULG9LQXJCUyxJQUFJOzs0RkF1Qkgsc0JBQXNCO2tCQTFCbEMsU0FBUzsrQkFDRSxnQkFBZ0IsY0FDZCxJQUFJLFdBQ1AsQ0FBQyxJQUFJLENBQUMsWUFFTDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CVDs4QkFHd0IsS0FBSztzQkFBN0IsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Z0JBQ0UsSUFBSTtzQkFBNUIsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Z0JBQ0UsVUFBVTtzQkFBbEMsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Z0JBQ2IsUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ0lmfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VkaXRhYmxlLWZpZWxkJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW05nSWZdLFxuICBzdHlsZVVybDogJy4vZWRpdGFibGUtZmllbGQuY29tcG9uZW50LnNjc3MnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJlZGl0YWJsZS1maWVsZFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzVmlld09ubHlcIj5cbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiaXNDaGVja2JveCgpXCIgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJlZGl0YWJsZS1maWVsZF9faW5wdXRcIiBbY2hlY2tlZF09XCJ2YWx1ZVwiIGRpc2FibGVkLz5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc0NoZWNrYm94KClcIj5cbiAgICAgICAgICB7eyB2YWx1ZSB9fVxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1ZpZXdPbmx5XCI+XG4gICAgICAgIDxpbnB1dCAqbmdJZj1cImlzVGV4dCgpXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cImVkaXRhYmxlLWZpZWxkX19pbnB1dFwiIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAoaW5wdXQpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCIvPlxuICAgICAgICA8aW5wdXQgKm5nSWY9XCJpc051bWJlcigpXCIgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiZWRpdGFibGUtZmllbGRfX2lucHV0XCIgW3ZhbHVlXT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgIChpbnB1dCk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIi8+XG4gICAgICAgIDxpbnB1dCAqbmdJZj1cImlzQ2hlY2tib3goKVwiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiZWRpdGFibGUtZmllbGRfX2lucHV0XCIgW2NoZWNrZWRdPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIi8+XG4gICAgICAgIDxpbnB1dCAqbmdJZj1cImlzRGF0ZSgpXCIgdHlwZT1cImRhdGVcIiBjbGFzcz1cImVkaXRhYmxlLWZpZWxkX19pbnB1dFwiIFt2YWx1ZV09XCJnZXRGb3JtYXR0ZWREYXRlKClcIlxuICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIi8+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZUZpZWxkQ29tcG9uZW50IHtcbiAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuID0gJyc7XG4gIEBJbnB1dCh7cmVxdWlyZWQ6IHRydWV9KSB0eXBlOiAndGV4dCcgfCAnZGF0ZScgfCAnbnVtYmVyJyB8ICdjaGVja2JveCcgPSAndGV4dCc7XG4gIEBJbnB1dCh7cmVxdWlyZWQ6IHRydWV9KSBpc1ZpZXdPbmx5OiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbj4oKTtcblxuICBpc1RleHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ3RleHQnO1xuICB9XG5cbiAgaXNOdW1iZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ251bWJlcic7XG4gIH1cblxuICBpc0NoZWNrYm94KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnR5cGUgPT09ICdjaGVja2JveCc7XG4gIH1cblxuICBpc0RhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ2RhdGUnO1xuICB9XG5cblxuICBnZXRGb3JtYXR0ZWREYXRlKCkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzLnZhbHVlIGFzIHN0cmluZyk7XG5cbiAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IG1vbnRoID0gU3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgY29uc3QgZGF5ID0gU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWA7XG5cbiAgICByZXR1cm4gZm9ybWF0dGVkRGF0ZTtcbiAgfVxuXG4gIG9uSW5wdXRDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3QgaW5wdXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBsZXQgbmV3VmFsdWUgPSBpbnB1dC50eXBlID09PSAnY2hlY2tib3gnID8gaW5wdXQuY2hlY2tlZCA6IGlucHV0LnZhbHVlO1xuXG4gICAgaWYgKHRoaXMuaXNEYXRlKCkpIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShuZXdWYWx1ZSBhcyBzdHJpbmcpO1xuICAgICAgbmV3VmFsdWUgPSBkYXRlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2UuZW1pdChuZXdWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==