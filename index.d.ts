import * as i0 from '@angular/core';
import { OnInit, OnDestroy, Type, EventEmitter } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { TicketInformation } from '@/lora-client/src/types/TicketInformation';

type ClientWidgetMessage = ClientTicketSuggestionWidgetMessage | ClientTicketWidgetMessage | ClientTicketsWidgetMessage;
type ClientTicketSuggestionWidgetMessage = {
    widgetName: 'TicketSuggestion';
    widgetProps: {
        ticket: TicketInformation;
        isEditable: boolean;
    };
};
type ClientTicketWidgetMessage = {
    widgetName: 'Ticket';
    widgetProps: {
        ticket: TicketInformation;
        isEditable: boolean;
    };
};
type ClientTicketsWidgetMessage = {
    widgetName: 'Tickets';
    widgetProps: {
        tickets: TicketInformation[];
    };
};

type ClientMessagePartDetails = {
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
type ClientMessage = {
    id: string;
    user: string;
    content: string;
    time: number;
    parts?: ClientMessagePartDetails[];
    widget?: ClientWidgetMessage;
    isSignal: boolean;
};

declare enum ConnectionStatus {
    DISCONNECTED = "disconnected",
    CONNECTED = "connected",
    CONNECTING = "connecting",
    ERROR = "error"
}
type Events = 'message' | 'status';
interface EventListeners {
    message: (message: ClientMessage) => void;
    status: (status: ConnectionStatus) => void;
}
declare class LoraClientService {
    private serviceUrl;
    setServiceUrl(url: string): void;
    private authHeaderSupplier;
    setAuthHeaderSupplier(supplier: () => string): void;
    private url;
    private socket;
    private isConnected;
    private isError;
    private messages;
    private messagesQueue;
    private listeners;
    private heartBeatInterval;
    createSession(): Promise<string>;
    connect(options: {
        sessionId: string;
        url?: string;
        loadHistory?: boolean;
    }): Promise<unknown>;
    getMessagesHistory(sessionId: string): Promise<ClientMessage[]>;
    sendMessage(message: string, silent?: boolean): void;
    private onSocketMessage;
    private processQueue;
    private pushMessageToQueue;
    private addMessage;
    private emitMessage;
    private emitStatus;
    on<T extends Events>(event: T, listener: EventListeners[T]): void;
    off<K extends Events>(event: K, listener: EventListeners[K]): void;
    getMessages(): ClientMessage[];
    disconnect(): void;
    private sendHeartBeat;
    private startHeartBeat;
    private stopHeartBeat;
    ticketToRequest(ticket: TicketInformation): string;
    private checkServiceUrl;
    private getAuthHeader;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoraClientService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LoraClientService>;
}

declare class LoraClient implements OnInit, OnDestroy {
    private sanitizer;
    height: number;
    stylesFile: string;
    partsTableComponent: Type<any> | null;
    set serviceUrl(value: string);
    set authHeaderSupplier(value: () => string);
    onMessage: EventEmitter<ClientMessage>;
    onTicketCreated: EventEmitter<TicketInformation>;
    messages: ClientMessage[];
    message: string;
    status: ConnectionStatus;
    sanitizedStylesFile: SafeResourceUrl;
    protected readonly ConnectionStatus: typeof ConnectionStatus;
    private loraClientService;
    private readonly onMessageListener;
    private readonly onStatusListener;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): Promise<void>;
    connect(): Promise<void>;
    createInjector(): i0.DestroyableInjector;
    sendMessage(): void;
    onMessageChanged(message: string): void;
    onEnterPressed(): void;
    onClickReconnect(): void;
    onMessageReceived(message: ClientMessage): void;
    onStatus(status: ConnectionStatus): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoraClient, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoraClient, "lora-client", never, { "height": { "alias": "height"; "required": false; }; "stylesFile": { "alias": "stylesFile"; "required": false; }; "partsTableComponent": { "alias": "partsTableComponent"; "required": false; }; "serviceUrl": { "alias": "serviceUrl"; "required": true; }; "authHeaderSupplier": { "alias": "authHeaderSupplier"; "required": true; }; }, { "onMessage": "onMessage"; "onTicketCreated": "onTicketCreated"; }, never, never, true, never>;
}

export { ConnectionStatus, LoraClient, LoraClientService };
export type { ClientMessage, ClientMessagePartDetails };
