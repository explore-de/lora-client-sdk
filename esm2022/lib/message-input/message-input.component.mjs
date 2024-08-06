import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from "@angular/forms";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class ClientMessageInputComponent {
    message;
    onMessageChanged = new EventEmitter();
    onEnterPressed = new EventEmitter();
    textarea;
    content = '';
    ngOnInit() {
        this.content = this.message;
    }
    ngOnChanges(changes) {
        if (this.content !== this.message) {
            this.content = this.message;
        }
    }
    ngAfterViewChecked() {
        this.adjustTextareaHeight();
    }
    onInput() {
        this.adjustTextareaHeight();
        this.onMessageChanged.emit(this.content);
    }
    onKeyDown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent the default behavior of adding a new line
            this.onEnterPressed.emit();
        }
    }
    adjustTextareaHeight() {
        if (!this.textarea)
            return;
        const textarea = this.textarea.nativeElement;
        textarea.style.height = '34px'; // Reset the height
        textarea.style.height = Math.min(textarea.scrollHeight, 180) + 'px'; // Set new height, limited to 180px
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: ClientMessageInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: ClientMessageInputComponent, isStandalone: true, selector: "client-message-input", inputs: { message: "message" }, outputs: { onMessageChanged: "onMessageChanged", onEnterPressed: "onEnterPressed" }, viewQueries: [{ propertyName: "textarea", first: true, predicate: ["textarea"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `<textarea
    #textarea
    [(ngModel)]="content"
    (input)="onInput()"
    (keydown)="onKeyDown($event)"
    class="client__message-input__textarea"
    placeholder="Type your message..."></textarea>`, isInline: true, styles: [".client__message-input__textarea{min-height:34px;max-height:180px;height:34px;width:100%;max-width:100%;resize:none;margin-bottom:-4px;padding:8px}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: ClientMessageInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'client-message-input', standalone: true, encapsulation: ViewEncapsulation.None, imports: [FormsModule], template: `<textarea
    #textarea
    [(ngModel)]="content"
    (input)="onInput()"
    (keydown)="onKeyDown($event)"
    class="client__message-input__textarea"
    placeholder="Type your message..."></textarea>`, styles: [".client__message-input__textarea{min-height:34px;max-height:180px;height:34px;width:100%;max-width:100%;resize:none;margin-bottom:-4px;padding:8px}\n"] }]
        }], propDecorators: { message: [{
                type: Input,
                args: ['message']
            }], onMessageChanged: [{
                type: Output
            }], onEnterPressed: [{
                type: Output
            }], textarea: [{
                type: ViewChild,
                args: ['textarea']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9yYS1jbGllbnQvc3JjL2xpYi9tZXNzYWdlLWlucHV0L21lc3NhZ2UtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7OztBQWdCM0MsTUFBTSxPQUFPLDJCQUEyQjtJQUNwQixPQUFPLENBQVU7SUFFekIsZ0JBQWdCLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDNUQsY0FBYyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRTNDLFFBQVEsQ0FBbUM7SUFDbEUsT0FBTyxHQUFXLEVBQUUsQ0FBQztJQUVyQixRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzlCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQW9CO1FBQzVCLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsb0RBQW9EO1lBRTVFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQztJQUNILENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUUzQixNQUFNLFFBQVEsR0FBd0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFDbEUsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsbUJBQW1CO1FBQ25ELFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxtQ0FBbUM7SUFDMUcsQ0FBQzt1R0ExQ1UsMkJBQTJCOzJGQUEzQiwyQkFBMkIsZ1VBVDVCOzs7Ozs7bURBTXVDLDhOQVB2QyxXQUFXOzsyRkFVViwyQkFBMkI7a0JBZHZDLFNBQVM7K0JBQ0Usc0JBQXNCLGNBQ3BCLElBQUksaUJBQ0QsaUJBQWlCLENBQUMsSUFBSSxXQUM1QixDQUFDLFdBQVcsQ0FBQyxZQUNaOzs7Ozs7bURBTXVDOzhCQUkvQixPQUFPO3NCQUF4QixLQUFLO3VCQUFDLFNBQVM7Z0JBRU4sZ0JBQWdCO3NCQUF6QixNQUFNO2dCQUNHLGNBQWM7c0JBQXZCLE1BQU07Z0JBRWdCLFFBQVE7c0JBQTlCLFNBQVM7dUJBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xpZW50LW1lc3NhZ2UtaW5wdXQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBpbXBvcnRzOiBbRm9ybXNNb2R1bGVdLFxuICB0ZW1wbGF0ZTogYDx0ZXh0YXJlYVxuICAgICN0ZXh0YXJlYVxuICAgIFsobmdNb2RlbCldPVwiY29udGVudFwiXG4gICAgKGlucHV0KT1cIm9uSW5wdXQoKVwiXG4gICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgIGNsYXNzPVwiY2xpZW50X19tZXNzYWdlLWlucHV0X190ZXh0YXJlYVwiXG4gICAgcGxhY2Vob2xkZXI9XCJUeXBlIHlvdXIgbWVzc2FnZS4uLlwiPjwvdGV4dGFyZWE+YCxcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZS1pbnB1dC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENsaWVudE1lc3NhZ2VJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG4gIEBJbnB1dCgnbWVzc2FnZScpIG1lc3NhZ2UhOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIG9uTWVzc2FnZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25FbnRlclByZXNzZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCd0ZXh0YXJlYScpIHRleHRhcmVhITogRWxlbWVudFJlZjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgY29udGVudDogc3RyaW5nID0gJyc7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy5tZXNzYWdlO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICh0aGlzLmNvbnRlbnQgIT09IHRoaXMubWVzc2FnZSkge1xuICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5tZXNzYWdlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICB0aGlzLmFkanVzdFRleHRhcmVhSGVpZ2h0KCk7XG4gIH1cblxuICBvbklucHV0KCkge1xuICAgIHRoaXMuYWRqdXN0VGV4dGFyZWFIZWlnaHQoKTtcbiAgICB0aGlzLm9uTWVzc2FnZUNoYW5nZWQuZW1pdCh0aGlzLmNvbnRlbnQpO1xuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgYWRkaW5nIGEgbmV3IGxpbmVcblxuICAgICAgdGhpcy5vbkVudGVyUHJlc3NlZC5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgYWRqdXN0VGV4dGFyZWFIZWlnaHQoKSB7XG4gICAgaWYgKCF0aGlzLnRleHRhcmVhKSByZXR1cm47XG5cbiAgICBjb25zdCB0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCA9IHRoaXMudGV4dGFyZWEubmF0aXZlRWxlbWVudDtcbiAgICB0ZXh0YXJlYS5zdHlsZS5oZWlnaHQgPSAnMzRweCc7IC8vIFJlc2V0IHRoZSBoZWlnaHRcbiAgICB0ZXh0YXJlYS5zdHlsZS5oZWlnaHQgPSBNYXRoLm1pbih0ZXh0YXJlYS5zY3JvbGxIZWlnaHQsIDE4MCkgKyAncHgnOyAvLyBTZXQgbmV3IGhlaWdodCwgbGltaXRlZCB0byAxODBweFxuICB9XG59XG4iXX0=