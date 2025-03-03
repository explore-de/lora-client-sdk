import { Component, Input, ViewChild, ViewEncapsulation, Injector } from '@angular/core';
import { MessageComponent } from "../message/message.component";
import { NgComponentOutlet, NgForOf, NgIf } from "@angular/common";
import * as i0 from "@angular/core";
export class MessagesComponent {
    messages = [];
    customComponent = null;
    container;
    previousMessagesLength = 0;
    ngOnChanges(changes) {
        if (changes['messages']) {
            const currentMessagesLength = changes['messages'].currentValue.length;
            if (currentMessagesLength !== this.previousMessagesLength) {
                this.previousMessagesLength = currentMessagesLength;
                setTimeout(() => {
                    this.scrollBottom();
                }, 250);
            }
        }
    }
    scrollBottom() {
        if (!this.container)
            return;
        const el = this.container.nativeElement;
        el.scrollTop = el.scrollHeight;
    }
    createInjector(message) {
        return Injector.create({ providers: [{ provide: 'message', useValue: message }] });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MessagesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: MessagesComponent, isStandalone: true, selector: "client-messages", inputs: { messages: "messages", customComponent: "customComponent" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div #container class="client-messages">
      <ng-container *ngFor="let message of messages">
        <ng-container *ngIf="customComponent">
          <ng-container *ngComponentOutlet="customComponent; injector: createInjector(message)"></ng-container>
        </ng-container>
        <ng-container *ngIf="!customComponent">
          <div class="client-messages__inner">
            <client-message *ngFor="let msg of messages" [message]="msg"></client-message>
          </div>
        </ng-container>
      </ng-container>
    </div>`, isInline: true, styles: [".client-messages{display:block;padding:0 8px;overflow:auto;scroll-behavior:smooth;height:100%;width:100%}.client-messages__inner{display:flex;flex-direction:column;justify-content:end}\n"], dependencies: [{ kind: "component", type: MessageComponent, selector: "client-message", inputs: ["message"] }, { kind: "directive", type: NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MessagesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'client-messages', standalone: true, encapsulation: ViewEncapsulation.None, imports: [
                        MessageComponent,
                        NgForOf,
                        NgComponentOutlet,
                        NgIf
                    ], template: `
    <div #container class="client-messages">
      <ng-container *ngFor="let message of messages">
        <ng-container *ngIf="customComponent">
          <ng-container *ngComponentOutlet="customComponent; injector: createInjector(message)"></ng-container>
        </ng-container>
        <ng-container *ngIf="!customComponent">
          <div class="client-messages__inner">
            <client-message *ngFor="let msg of messages" [message]="msg"></client-message>
          </div>
        </ng-container>
      </ng-container>
    </div>`, styles: [".client-messages{display:block;padding:0 8px;overflow:auto;scroll-behavior:smooth;height:100%;width:100%}.client-messages__inner{display:flex;flex-direction:column;justify-content:end}\n"] }]
        }], propDecorators: { messages: [{
                type: Input
            }], customComponent: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFFRixRQUFRLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBMkJqRSxNQUFNLE9BQU8saUJBQWlCO0lBQ25CLFFBQVEsR0FBb0IsRUFBRSxDQUFDO0lBQy9CLGVBQWUsR0FBcUIsSUFBSSxDQUFDO0lBRTFCLFNBQVMsQ0FBOEI7SUFFdkQsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO0lBRW5DLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ3hCLE1BQU0scUJBQXFCLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7WUFDdEUsSUFBSSxxQkFBcUIsS0FBSyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHFCQUFxQixDQUFDO2dCQUVwRCxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU87UUFDNUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDeEMsRUFBRSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDO0lBQ2pDLENBQUM7SUFHRCxjQUFjLENBQUMsT0FBc0I7UUFDbkMsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO3dHQTlCVSxpQkFBaUI7NEZBQWpCLGlCQUFpQiw4UUFmbEI7Ozs7Ozs7Ozs7OztXQVlELG9RQWpCUCxnQkFBZ0IsZ0ZBQ2hCLE9BQU8sbUhBQ1AsaUJBQWlCLG9QQUNqQixJQUFJOzs0RkFpQkssaUJBQWlCO2tCQXpCN0IsU0FBUzsrQkFDRSxpQkFBaUIsY0FDZixJQUFJLGlCQUNELGlCQUFpQixDQUFDLElBQUksV0FDNUI7d0JBQ1AsZ0JBQWdCO3dCQUNoQixPQUFPO3dCQUNQLGlCQUFpQjt3QkFDakIsSUFBSTtxQkFDTCxZQUNTOzs7Ozs7Ozs7Ozs7V0FZRDs4QkFJQSxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBRWtCLFNBQVM7c0JBQWhDLFNBQVM7dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcywgSW5qZWN0b3IsIFR5cGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2V9IGZyb20gXCIuLi8uLi90eXBlcy9DbGllbnRNZXNzYWdlXCI7XG5pbXBvcnQge01lc3NhZ2VDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQge05nQ29tcG9uZW50T3V0bGV0LCBOZ0Zvck9mLCBOZ0lmfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NsaWVudC1tZXNzYWdlcycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGltcG9ydHM6IFtcbiAgICBNZXNzYWdlQ29tcG9uZW50LFxuICAgIE5nRm9yT2YsXG4gICAgTmdDb21wb25lbnRPdXRsZXQsXG4gICAgTmdJZlxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgI2NvbnRhaW5lciBjbGFzcz1cImNsaWVudC1tZXNzYWdlc1wiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbWVzc2FnZSBvZiBtZXNzYWdlc1wiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VzdG9tQ29tcG9uZW50XCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdDb21wb25lbnRPdXRsZXQ9XCJjdXN0b21Db21wb25lbnQ7IGluamVjdG9yOiBjcmVhdGVJbmplY3RvcihtZXNzYWdlKVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjdXN0b21Db21wb25lbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LW1lc3NhZ2VzX19pbm5lclwiPlxuICAgICAgICAgICAgPGNsaWVudC1tZXNzYWdlICpuZ0Zvcj1cImxldCBtc2cgb2YgbWVzc2FnZXNcIiBbbWVzc2FnZV09XCJtc2dcIj48L2NsaWVudC1tZXNzYWdlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PmAsXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2VzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBtZXNzYWdlczogQ2xpZW50TWVzc2FnZVtdID0gW107XG4gIEBJbnB1dCgpIGN1c3RvbUNvbXBvbmVudDogVHlwZTxhbnk+IHwgbnVsbCA9IG51bGw7XG5cbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyITogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG5cbiAgcHJpdmF0ZSBwcmV2aW91c01lc3NhZ2VzTGVuZ3RoID0gMDtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ21lc3NhZ2VzJ10pIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlc0xlbmd0aCA9IGNoYW5nZXNbJ21lc3NhZ2VzJ10uY3VycmVudFZhbHVlLmxlbmd0aDtcbiAgICAgIGlmIChjdXJyZW50TWVzc2FnZXNMZW5ndGggIT09IHRoaXMucHJldmlvdXNNZXNzYWdlc0xlbmd0aCkge1xuICAgICAgICB0aGlzLnByZXZpb3VzTWVzc2FnZXNMZW5ndGggPSBjdXJyZW50TWVzc2FnZXNMZW5ndGg7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxCb3R0b20oKTtcbiAgICAgICAgfSwgMjUwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzY3JvbGxCb3R0b20oKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICBlbC5zY3JvbGxUb3AgPSBlbC5zY3JvbGxIZWlnaHQ7XG4gIH1cblxuXG4gIGNyZWF0ZUluamVjdG9yKG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpIHtcbiAgICByZXR1cm4gSW5qZWN0b3IuY3JlYXRlKHtwcm92aWRlcnM6IFt7cHJvdmlkZTogJ21lc3NhZ2UnLCB1c2VWYWx1ZTogbWVzc2FnZX1dfSk7XG4gIH1cbn1cbiJdfQ==