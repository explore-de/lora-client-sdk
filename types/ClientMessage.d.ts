import { ClientWidgetMessage } from "./ClientWidgetMessage";
export type ClientMessagePartDetails = {
    anlagenKennzeichen?: string;
    geo?: string;
    hersteller?: string;
    komponententyp?: string;
    lieferant?: string;
    lieferzeitInWochen?: string;
    terminCDR?: string;
    terminLieferungBaustelle?: string;
    terminMMR?: string;
    terminPDR?: string;
    terminvFAT?: string;
    verantwortlicher?: string;
};
export type ClientMessage = {
    id: string;
    user: string;
    content: string;
    time: number;
    parts?: ClientMessagePartDetails[];
    widget?: ClientWidgetMessage;
};
