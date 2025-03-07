import { Injector, Type } from '@angular/core';
import { ClientMessage } from "@/lora-client/src/types/ClientMessage";
import * as i0 from "@angular/core";
export declare class MessageComponent {
    message: ClientMessage;
    partsTableComponent: Type<any> | null;
    private readonly widgetsMap;
    private formatUnixTime;
    getTimeFormatted(): string;
    getFormattedMessage(): string;
    getWidgetComponent(): Type<any> | null;
    isWidgetAvailable(): boolean;
    createMessageInjector(message: ClientMessage): Injector;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageComponent, "client-message", never, { "message": { "alias": "message"; "required": false; }; "partsTableComponent": { "alias": "partsTableComponent"; "required": false; }; }, {}, never, never, true, never>;
}
