import { ClientMessage } from '../../../types/ClientMessage';
import { TicketInformation } from "@/lora-client/src/types/TicketInformation";
import * as i0 from "@angular/core";
export declare class TicketsWidgetComponent {
    message: ClientMessage;
    private widget?;
    tickets: TicketInformation[];
    constructor(message: ClientMessage);
    trackByFn(index: number, item: {
        id: string;
    }): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TicketsWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TicketsWidgetComponent, "tickets-widget", never, {}, {}, never, never, true, never>;
}
