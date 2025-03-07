import { Component, Input, ViewChild, ViewEncapsulation, Injector } from '@angular/core';
import { MessageComponent } from "../message/message.component";
import { NgComponentOutlet, NgForOf, NgIf } from "@angular/common";
import * as i0 from "@angular/core";
export class MessagesComponent {
    messages = [];
    partsTableComponent = null;
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
    trackByKey(index, item) {
        return item.id;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MessagesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: MessagesComponent, isStandalone: true, selector: "client-messages", inputs: { messages: "messages", partsTableComponent: "partsTableComponent" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div #container class="client-messages">
      <div class="client-messages__inner">
        <client-message
          *ngFor="let msg of messages; trackBy: trackByKey"
          [message]="msg"
          [partsTableComponent]="partsTableComponent"
        />
      </div>
    </div>`, isInline: true, styles: [".client-messages{display:block;padding:0 8px;overflow:auto;scroll-behavior:smooth;height:100%;width:100%}.client-messages__inner{display:flex;flex-direction:column;justify-content:end}\n"], dependencies: [{ kind: "component", type: MessageComponent, selector: "client-message", inputs: ["message", "partsTableComponent"] }, { kind: "directive", type: NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], encapsulation: i0.ViewEncapsulation.None });
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
      <div class="client-messages__inner">
        <client-message
          *ngFor="let msg of messages; trackBy: trackByKey"
          [message]="msg"
          [partsTableComponent]="partsTableComponent"
        />
      </div>
    </div>`, styles: [".client-messages{display:block;padding:0 8px;overflow:auto;scroll-behavior:smooth;height:100%;width:100%}.client-messages__inner{display:flex;flex-direction:column;justify-content:end}\n"] }]
        }], propDecorators: { messages: [{
                type: Input
            }], partsTableComponent: [{
                type: Input,
                args: ['partsTableComponent']
            }], container: [{
                type: ViewChild,
                args: ['container']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFFRixRQUFRLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBd0JqRSxNQUFNLE9BQU8saUJBQWlCO0lBQ25CLFFBQVEsR0FBb0IsRUFBRSxDQUFDO0lBQ1YsbUJBQW1CLEdBQXFCLElBQUksQ0FBQztJQUVuRCxTQUFTLENBQThCO0lBRXZELHNCQUFzQixHQUFHLENBQUMsQ0FBQztJQUduQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN4QixNQUFNLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1lBQ3RFLElBQUkscUJBQXFCLEtBQUssSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7Z0JBQzFELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxxQkFBcUIsQ0FBQztnQkFFcEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3RCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNWLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPO1FBQzVCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQztJQUNqQyxDQUFDO0lBR0QsY0FBYyxDQUFDLE9BQXNCO1FBQ25DLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFhLEVBQUUsSUFBbUI7UUFDM0MsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7d0dBbkNVLGlCQUFpQjs0RkFBakIsaUJBQWlCLHNSQVhsQjs7Ozs7Ozs7O1dBU0Qsb1FBZlAsZ0JBQWdCLHVHQUNoQixPQUFPOzs0RkFnQkUsaUJBQWlCO2tCQXRCN0IsU0FBUzsrQkFDRSxpQkFBaUIsY0FDZixJQUFJLGlCQUNELGlCQUFpQixDQUFDLElBQUksV0FDNUI7d0JBQ1AsZ0JBQWdCO3dCQUNoQixPQUFPO3dCQUNQLGlCQUFpQjt3QkFDakIsSUFBSTtxQkFDTCxZQUVTOzs7Ozs7Ozs7V0FTRDs4QkFHQSxRQUFRO3NCQUFoQixLQUFLO2dCQUN3QixtQkFBbUI7c0JBQWhELEtBQUs7dUJBQUMscUJBQXFCO2dCQUVKLFNBQVM7c0JBQWhDLFNBQVM7dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcywgSW5qZWN0b3IsIFR5cGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2V9IGZyb20gXCIuLi8uLi90eXBlcy9DbGllbnRNZXNzYWdlXCI7XG5pbXBvcnQge01lc3NhZ2VDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQge05nQ29tcG9uZW50T3V0bGV0LCBOZ0Zvck9mLCBOZ0lmfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NsaWVudC1tZXNzYWdlcycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGltcG9ydHM6IFtcbiAgICBNZXNzYWdlQ29tcG9uZW50LFxuICAgIE5nRm9yT2YsXG4gICAgTmdDb21wb25lbnRPdXRsZXQsXG4gICAgTmdJZlxuICBdLFxuICBzdHlsZVVybHM6IFsnLi9tZXNzYWdlcy5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgI2NvbnRhaW5lciBjbGFzcz1cImNsaWVudC1tZXNzYWdlc1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNsaWVudC1tZXNzYWdlc19faW5uZXJcIj5cbiAgICAgICAgPGNsaWVudC1tZXNzYWdlXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG1zZyBvZiBtZXNzYWdlczsgdHJhY2tCeTogdHJhY2tCeUtleVwiXG4gICAgICAgICAgW21lc3NhZ2VdPVwibXNnXCJcbiAgICAgICAgICBbcGFydHNUYWJsZUNvbXBvbmVudF09XCJwYXJ0c1RhYmxlQ29tcG9uZW50XCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBtZXNzYWdlczogQ2xpZW50TWVzc2FnZVtdID0gW107XG4gIEBJbnB1dCgncGFydHNUYWJsZUNvbXBvbmVudCcpIHBhcnRzVGFibGVDb21wb25lbnQ6IFR5cGU8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lciE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuXG4gIHByaXZhdGUgcHJldmlvdXNNZXNzYWdlc0xlbmd0aCA9IDA7XG5cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ21lc3NhZ2VzJ10pIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlc0xlbmd0aCA9IGNoYW5nZXNbJ21lc3NhZ2VzJ10uY3VycmVudFZhbHVlLmxlbmd0aDtcbiAgICAgIGlmIChjdXJyZW50TWVzc2FnZXNMZW5ndGggIT09IHRoaXMucHJldmlvdXNNZXNzYWdlc0xlbmd0aCkge1xuICAgICAgICB0aGlzLnByZXZpb3VzTWVzc2FnZXNMZW5ndGggPSBjdXJyZW50TWVzc2FnZXNMZW5ndGg7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxCb3R0b20oKTtcbiAgICAgICAgfSwgMjUwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzY3JvbGxCb3R0b20oKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICBlbC5zY3JvbGxUb3AgPSBlbC5zY3JvbGxIZWlnaHQ7XG4gIH1cblxuXG4gIGNyZWF0ZUluamVjdG9yKG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpIHtcbiAgICByZXR1cm4gSW5qZWN0b3IuY3JlYXRlKHtwcm92aWRlcnM6IFt7cHJvdmlkZTogJ21lc3NhZ2UnLCB1c2VWYWx1ZTogbWVzc2FnZX1dfSk7XG4gIH1cblxuICB0cmFja0J5S2V5KGluZGV4OiBudW1iZXIsIGl0ZW06IENsaWVudE1lc3NhZ2UpOiBzdHJpbmcge1xuICAgIHJldHVybiBpdGVtLmlkO1xuICB9XG59XG4iXX0=