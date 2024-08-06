import { ClientMessage } from "../types/ClientMessage";
import * as i0 from "@angular/core";
export declare enum ConnectionStatus {
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
export declare class LoraClientService {
    private url;
    private socket;
    private isConnected;
    private isError;
    private messages;
    private messagesQueue;
    private listeners;
    connect(url: string): Promise<unknown> | undefined;
    sendMessage(message: string): void;
    private processQueue;
    private pushMessageToQueue;
    private addMessage;
    private emitMessage;
    private emitStatus;
    on<T extends Events>(event: T, listener: EventListeners[T]): void;
    off<K extends Events>(event: K, listener: EventListeners[K]): void;
    getMessages(): ClientMessage[];
    disconnect(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoraClientService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LoraClientService>;
}
export {};
