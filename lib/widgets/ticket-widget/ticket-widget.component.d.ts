import { ClientMessage } from '@/lora-client/src/types/ClientMessage';
import * as i0 from "@angular/core";
export declare class TicketWidgetComponent {
    message: ClientMessage;
    private loraClientService;
    readonly fields: {
        key: string;
        value: string;
    }[];
    readonly editableFields: string[];
    customAttributes: {
        key: string;
        value: string | number | boolean;
    }[];
    isSaved: boolean;
    constructor(message: ClientMessage);
    onClickSave(): void;
    getFieldValue(key: string): string;
    setFieldValue(key: string, value: string | number | boolean): void;
    setCustomAttributeValue(key: string, value: string | number | boolean): void;
    trackByFn(index: number, item: {
        key: string;
    }): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TicketWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TicketWidgetComponent, "ticket-widget", never, {}, {}, never, never, true, never>;
}
