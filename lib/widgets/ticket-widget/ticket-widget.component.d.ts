import { ClientMessage } from '../../../types/ClientMessage';
import { KeyValue, KeyValueScalar } from '../../../types/KeyValue';
import * as i0 from "@angular/core";
export declare class TicketWidgetComponent {
    message: ClientMessage;
    private loraClientService;
    private widget?;
    readonly fields: KeyValue<string>[];
    readonly editableFieldsMap: Map<string, "number" | "text" | "date" | "checkbox">;
    otherFields: KeyValueScalar[];
    isSaved: boolean;
    isEditable: boolean;
    constructor(message: ClientMessage);
    onClickSave(): void;
    getFieldValue(key: string): string;
    setFieldValue(key: string, value: string | number | boolean): void;
    trackByFn(index: number, item: {
        key: string;
    }): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TicketWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TicketWidgetComponent, "ticket-widget", never, {}, {}, never, never, true, never>;
}
