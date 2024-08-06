import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MessageComponent } from "../message/message.component";
import { NgForOf } from "@angular/common";
import * as i0 from "@angular/core";
export class MessagesComponent {
    messages = [];
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MessagesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: MessagesComponent, isStandalone: true, selector: "client-messages", inputs: { messages: "messages" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div #container class="client-messages">
      <div class="client-messages__inner">
        <client-message *ngFor="let msg of messages" [message]="msg"></client-message>
      </div>
    </div>`, isInline: true, styles: [".client-messages{display:block;padding:0 8px;overflow:auto;scroll-behavior:smooth;height:100%;width:100%}.client-messages__inner{display:flex;flex-direction:column;justify-content:end}\n"], dependencies: [{ kind: "component", type: MessageComponent, selector: "client-message", inputs: ["message"] }, { kind: "directive", type: NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MessagesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'client-messages', standalone: true, encapsulation: ViewEncapsulation.None, imports: [
                        MessageComponent,
                        NgForOf
                    ], template: `
    <div #container class="client-messages">
      <div class="client-messages__inner">
        <client-message *ngFor="let msg of messages" [message]="msg"></client-message>
      </div>
    </div>`, styles: [".client-messages{display:block;padding:0 8px;overflow:auto;scroll-behavior:smooth;height:100%;width:100%}.client-messages__inner{display:flex;flex-direction:column;justify-content:end}\n"] }]
        }], propDecorators: { messages: [{
                type: Input
            }], container: [{
                type: ViewChild,
                args: ['container']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBRVQsS0FBSyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFHbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQWtCeEMsTUFBTSxPQUFPLGlCQUFpQjtJQUNuQixRQUFRLEdBQW9CLEVBQUUsQ0FBQztJQUVoQixTQUFTLENBQThCO0lBRXZELHNCQUFzQixHQUFHLENBQUMsQ0FBQztJQUVuQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN4QixNQUFNLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1lBQ3RFLElBQUkscUJBQXFCLEtBQUssSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7Z0JBQzFELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxxQkFBcUIsQ0FBQztnQkFFcEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3RCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNWLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPO1FBQzVCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQztJQUNqQyxDQUFDO3VHQXhCVSxpQkFBaUI7MkZBQWpCLGlCQUFpQiwwT0FSbEI7Ozs7O1dBS0Qsb1FBUlAsZ0JBQWdCLGdGQUNoQixPQUFPOzsyRkFVRSxpQkFBaUI7a0JBaEI3QixTQUFTOytCQUNFLGlCQUFpQixjQUNmLElBQUksaUJBQ0QsaUJBQWlCLENBQUMsSUFBSSxXQUM1Qjt3QkFDUCxnQkFBZ0I7d0JBQ2hCLE9BQU87cUJBQ1IsWUFDUzs7Ozs7V0FLRDs4QkFJQSxRQUFRO3NCQUFoQixLQUFLO2dCQUVrQixTQUFTO3NCQUFoQyxTQUFTO3VCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2V9IGZyb20gXCIuLi8uLi90eXBlcy9DbGllbnRNZXNzYWdlXCI7XG5pbXBvcnQge01lc3NhZ2VDb21wb25lbnR9IGZyb20gXCIuLi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQge05nRm9yT2Z9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xpZW50LW1lc3NhZ2VzJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaW1wb3J0czogW1xuICAgIE1lc3NhZ2VDb21wb25lbnQsXG4gICAgTmdGb3JPZlxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgI2NvbnRhaW5lciBjbGFzcz1cImNsaWVudC1tZXNzYWdlc1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNsaWVudC1tZXNzYWdlc19faW5uZXJcIj5cbiAgICAgICAgPGNsaWVudC1tZXNzYWdlICpuZ0Zvcj1cImxldCBtc2cgb2YgbWVzc2FnZXNcIiBbbWVzc2FnZV09XCJtc2dcIj48L2NsaWVudC1tZXNzYWdlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YCxcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZXMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG1lc3NhZ2VzOiBDbGllbnRNZXNzYWdlW10gPSBbXTtcblxuICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXIhOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcblxuICBwcml2YXRlIHByZXZpb3VzTWVzc2FnZXNMZW5ndGggPSAwO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snbWVzc2FnZXMnXSkge1xuICAgICAgY29uc3QgY3VycmVudE1lc3NhZ2VzTGVuZ3RoID0gY2hhbmdlc1snbWVzc2FnZXMnXS5jdXJyZW50VmFsdWUubGVuZ3RoO1xuICAgICAgaWYgKGN1cnJlbnRNZXNzYWdlc0xlbmd0aCAhPT0gdGhpcy5wcmV2aW91c01lc3NhZ2VzTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNNZXNzYWdlc0xlbmd0aCA9IGN1cnJlbnRNZXNzYWdlc0xlbmd0aDtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnNjcm9sbEJvdHRvbSgpO1xuICAgICAgICB9LCAyNTApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNjcm9sbEJvdHRvbSgpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSB0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIGVsLnNjcm9sbFRvcCA9IGVsLnNjcm9sbEhlaWdodDtcbiAgfVxufVxuIl19