import { TicketInformation } from "@/lora-client/src/types/TicketInformation";
export type ClientWidgetMessage = ClientTicketSuggestionWidgetMessage | ClientTicketWidgetMessage | ClientTicketsWidgetMessage;
export type ClientTicketSuggestionWidgetMessage = {
    widgetName: 'TicketSuggestion';
    widgetProps: {
        ticket: TicketInformation;
        isEditable: boolean;
    };
};
export type ClientTicketWidgetMessage = {
    widgetName: 'Ticket';
    widgetProps: {
        ticket: TicketInformation;
        isEditable: boolean;
    };
};
export type ClientTicketsWidgetMessage = {
    widgetName: 'Tickets';
    widgetProps: {
        tickets: TicketInformation[];
    };
};
