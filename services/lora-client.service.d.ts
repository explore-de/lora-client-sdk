import { ClientMessage } from "../types/ClientMessage";
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
    private serviceUrl;
    private url;
    private socket;
    private isConnected;
    private isError;
    private messages;
    private messagesQueue;
    private listeners;
    private heartBeatInterval;
    constructor();
    createSession(token: string): Promise<string | undefined>;
    connect(options: {
        sessionId: string;
        url?: string;
        loadHistory?: boolean;
    }): Promise<unknown>;
    getMessagesHistory(sessionId: string): Promise<ClientMessage[]>;
    sendMessage(message: string): void;
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
}
export {};
