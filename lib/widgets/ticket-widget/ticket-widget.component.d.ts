import { ClientMessage } from "@/lora-client/src";
import * as i0 from "@angular/core";
export declare class TicketWidgetComponent {
    message: ClientMessage;
    readonly fields: {
        key: string;
        value: string;
    }[];
    constructor(message: ClientMessage);
    getFieldValue(key: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TicketWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TicketWidgetComponent, "lib-ticket-widget", never, {}, {}, never, never, true, never>;
}
