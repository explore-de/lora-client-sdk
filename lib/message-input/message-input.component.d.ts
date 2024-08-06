import { AfterViewChecked, ElementRef, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ClientMessageInputComponent implements OnInit, AfterViewChecked {
    message: string;
    onMessageChanged: EventEmitter<string>;
    onEnterPressed: EventEmitter<void>;
    textarea: ElementRef<HTMLTextAreaElement>;
    content: string;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewChecked(): void;
    onInput(): void;
    onKeyDown(event: KeyboardEvent): void;
    adjustTextareaHeight(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClientMessageInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ClientMessageInputComponent, "client-message-input", never, { "message": { "alias": "message"; "required": false; }; }, { "onMessageChanged": "onMessageChanged"; "onEnterPressed": "onEnterPressed"; }, never, never, true, never>;
}
