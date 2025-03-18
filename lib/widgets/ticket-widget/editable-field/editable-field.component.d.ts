import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class EditableFieldComponent {
    value: string | number | boolean;
    type: 'text' | 'date' | 'number' | 'checkbox';
    isViewOnly: boolean;
    onChange: EventEmitter<string | number | boolean>;
    isText(): boolean;
    isNumber(): boolean;
    isCheckbox(): boolean;
    isDate(): boolean;
    getFormattedDate(): string;
    onInputChange(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EditableFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EditableFieldComponent, "editable-field", never, { "value": { "alias": "value"; "required": true; }; "type": { "alias": "type"; "required": true; }; "isViewOnly": { "alias": "isViewOnly"; "required": true; }; }, { "onChange": "onChange"; }, never, never, true, never>;
}
