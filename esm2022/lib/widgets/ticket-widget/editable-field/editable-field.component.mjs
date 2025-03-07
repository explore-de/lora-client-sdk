import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from "@angular/common";
import * as i0 from "@angular/core";
export class EditableFieldComponent {
    value = '';
    isViewOnly = false;
    onChange = new EventEmitter();
    isText() {
        return typeof this.value === 'string';
    }
    isNumber() {
        return typeof this.value === 'number';
    }
    isCheckbox() {
        return typeof this.value === 'boolean';
    }
    onInputChange(event) {
        const input = event.target;
        const newValue = input.type === 'checkbox' ? input.checked : input.value;
        this.onChange.emit(newValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: EditableFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: EditableFieldComponent, isStandalone: true, selector: "editable-field", inputs: { value: "value", isViewOnly: "isViewOnly" }, outputs: { onChange: "onChange" }, ngImport: i0, template: `
    <div class="editable-field">
      <ng-container *ngIf="isViewOnly">
        {{ value }}
      </ng-container>
      <ng-container *ngIf="!isViewOnly">
        <input *ngIf="isText()" type="text" class="editable-field__input" [value]="value"
               (input)="onInputChange($event)"/>
        <input *ngIf="isNumber()" type="number" class="editable-field__input" [value]="value"
               (input)="onInputChange($event)"/>
        <input *ngIf="isCheckbox()" type="checkbox" class="editable-field__input" [checked]="value"
               (change)="onInputChange($event)"/>
      </ng-container>
    </div>
  `, isInline: true, styles: [".editable-field input[type=checkbox]{margin-left:0}\n"], dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: EditableFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'editable-field', standalone: true, imports: [NgIf], template: `
    <div class="editable-field">
      <ng-container *ngIf="isViewOnly">
        {{ value }}
      </ng-container>
      <ng-container *ngIf="!isViewOnly">
        <input *ngIf="isText()" type="text" class="editable-field__input" [value]="value"
               (input)="onInputChange($event)"/>
        <input *ngIf="isNumber()" type="number" class="editable-field__input" [value]="value"
               (input)="onInputChange($event)"/>
        <input *ngIf="isCheckbox()" type="checkbox" class="editable-field__input" [checked]="value"
               (change)="onInputChange($event)"/>
      </ng-container>
    </div>
  `, styles: [".editable-field input[type=checkbox]{margin-left:0}\n"] }]
        }], propDecorators: { value: [{
                type: Input,
                args: [{ required: true }]
            }], isViewOnly: [{
                type: Input,
                args: [{ required: true }]
            }], onChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdGFibGUtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvd2lkZ2V0cy90aWNrZXQtd2lkZ2V0L2VkaXRhYmxlLWZpZWxkL2VkaXRhYmxlLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUF1QnJDLE1BQU0sT0FBTyxzQkFBc0I7SUFDUixLQUFLLEdBQThCLEVBQUUsQ0FBQztJQUN0QyxVQUFVLEdBQVksS0FBSyxDQUFDO0lBQzNDLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBNkIsQ0FBQztJQUVuRSxNQUFNO1FBQ0osT0FBTyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBWTtRQUN4QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBMEIsQ0FBQztRQUMvQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDO3dHQXJCVSxzQkFBc0I7NEZBQXRCLHNCQUFzQixtS0FoQnZCOzs7Ozs7Ozs7Ozs7OztHQWNULCtIQWhCUyxJQUFJOzs0RkFrQkgsc0JBQXNCO2tCQXJCbEMsU0FBUzsrQkFDRSxnQkFBZ0IsY0FDZCxJQUFJLFdBQ1AsQ0FBQyxJQUFJLENBQUMsWUFFTDs7Ozs7Ozs7Ozs7Ozs7R0FjVDs4QkFHd0IsS0FBSztzQkFBN0IsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Z0JBQ0UsVUFBVTtzQkFBbEMsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Z0JBQ2IsUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ0lmfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VkaXRhYmxlLWZpZWxkJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW05nSWZdLFxuICBzdHlsZVVybDogJy4vZWRpdGFibGUtZmllbGQuY29tcG9uZW50LnNjc3MnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJlZGl0YWJsZS1maWVsZFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzVmlld09ubHlcIj5cbiAgICAgICAge3sgdmFsdWUgfX1cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1ZpZXdPbmx5XCI+XG4gICAgICAgIDxpbnB1dCAqbmdJZj1cImlzVGV4dCgpXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cImVkaXRhYmxlLWZpZWxkX19pbnB1dFwiIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAoaW5wdXQpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCIvPlxuICAgICAgICA8aW5wdXQgKm5nSWY9XCJpc051bWJlcigpXCIgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiZWRpdGFibGUtZmllbGRfX2lucHV0XCIgW3ZhbHVlXT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgIChpbnB1dCk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIi8+XG4gICAgICAgIDxpbnB1dCAqbmdJZj1cImlzQ2hlY2tib3goKVwiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiZWRpdGFibGUtZmllbGRfX2lucHV0XCIgW2NoZWNrZWRdPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIi8+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZUZpZWxkQ29tcG9uZW50IHtcbiAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuID0gJyc7XG4gIEBJbnB1dCh7cmVxdWlyZWQ6IHRydWV9KSBpc1ZpZXdPbmx5OiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbj4oKTtcblxuICBpc1RleHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLnZhbHVlID09PSAnc3RyaW5nJztcbiAgfVxuXG4gIGlzTnVtYmVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ251bWJlcic7XG4gIH1cblxuICBpc0NoZWNrYm94KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xuICB9XG5cbiAgb25JbnB1dENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBpbnB1dCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94JyA/IGlucHV0LmNoZWNrZWQgOiBpbnB1dC52YWx1ZTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQobmV3VmFsdWUpO1xuICB9XG59XG4iXX0=