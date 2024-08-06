import { ClientMessage } from "../../types/ClientMessage";
import * as i0 from "@angular/core";
export declare class MessageComponent {
    message: ClientMessage;
    private formatUnixTime;
    getTimeFormatted(): string;
    getFormattedMessage(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageComponent, "client-message", never, { "message": { "alias": "message"; "required": false; }; }, {}, never, never, true, never>;
}
