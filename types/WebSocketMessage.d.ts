import { ClientMessagePartDetails } from "@/lora-client/src";
import { TicketInformation } from "@/lora-client/src/types/TicketInformation";
export type WebSocketMessage = {
    parts: ClientMessagePartDetails[];
    text: string;
    ticketSuggestionNullable: TicketInformation | null;
    createdTicketNullable: TicketInformation | null;
    ticketSearchResultsNullable: TicketInformation[] | null;
    isSignal?: boolean;
};
