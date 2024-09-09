import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ConnectionStatus } from '../../services/lora-client.service';
import { ClientMessage } from "../../types/ClientMessage";
import * as i0 from "@angular/core";
export declare class LoraClient implements OnInit, OnDestroy {
    token: string;
    height: number;
    onMessage: EventEmitter<ClientMessage>;
    messages: ClientMessage[];
    message: string;
    status: ConnectionStatus;
    private onMessageListener;
    private onStatusListener;
    private loraClientService;
    constructor();
    ngOnInit(): void;
    connect(): Promise<void>;
    sendMessage(): void;
    onMessageChanged(message: string): void;
    onEnterPressed(): void;
    onClickReconnect(): void;
    onMessageReceived(message: ClientMessage): void;
    onStatus(status: ConnectionStatus): void;
    ngOnDestroy(): void;
    protected readonly ConnectionStatus: typeof ConnectionStatus;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoraClient, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoraClient, "lora-client", never, { "token": { "alias": "token"; "required": false; }; "height": { "alias": "height"; "required": false; }; }, { "onMessage": "onMessage"; }, never, never, true, never>;
}
