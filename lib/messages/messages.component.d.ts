import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ClientMessage } from "../../types/ClientMessage";
import * as i0 from "@angular/core";
export declare class MessagesComponent implements OnChanges {
    messages: ClientMessage[];
    container: ElementRef<HTMLDivElement>;
    private previousMessagesLength;
    ngOnChanges(changes: SimpleChanges): void;
    scrollBottom(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessagesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessagesComponent, "client-messages", never, { "messages": { "alias": "messages"; "required": false; }; }, {}, never, never, true, never>;
}
