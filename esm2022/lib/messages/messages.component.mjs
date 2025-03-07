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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: MessagesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: MessagesComponent, isStandalone: true, selector: "client-messages", inputs: { messages: "messages", partsTableComponent: "partsTableComponent" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div #container class="client-messages">
      <div class="client-messages__inner">
        <client-message *ngFor="let msg of messages" [message]="msg" [partsTableComponent]="partsTableComponent"/>
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
        <client-message *ngFor="let msg of messages" [message]="msg" [partsTableComponent]="partsTableComponent"/>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvcmEtY2xpZW50L3NyYy9saWIvbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFFRixRQUFRLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBb0JqRSxNQUFNLE9BQU8saUJBQWlCO0lBQ25CLFFBQVEsR0FBb0IsRUFBRSxDQUFDO0lBQ1YsbUJBQW1CLEdBQXFCLElBQUksQ0FBQztJQUVuRCxTQUFTLENBQThCO0lBRXZELHNCQUFzQixHQUFHLENBQUMsQ0FBQztJQUVuQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN4QixNQUFNLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1lBQ3RFLElBQUkscUJBQXFCLEtBQUssSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7Z0JBQzFELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxxQkFBcUIsQ0FBQztnQkFFcEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3RCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNWLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPO1FBQzVCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQztJQUNqQyxDQUFDO0lBR0QsY0FBYyxDQUFDLE9BQXNCO1FBQ25DLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDakYsQ0FBQzt3R0E5QlUsaUJBQWlCOzRGQUFqQixpQkFBaUIsc1JBUmxCOzs7OztXQUtELG9RQVZQLGdCQUFnQix1R0FDaEIsT0FBTzs7NEZBWUUsaUJBQWlCO2tCQWxCN0IsU0FBUzsrQkFDRSxpQkFBaUIsY0FDZixJQUFJLGlCQUNELGlCQUFpQixDQUFDLElBQUksV0FDNUI7d0JBQ1AsZ0JBQWdCO3dCQUNoQixPQUFPO3dCQUNQLGlCQUFpQjt3QkFDakIsSUFBSTtxQkFDTCxZQUNTOzs7OztXQUtEOzhCQUlBLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ3dCLG1CQUFtQjtzQkFBaEQsS0FBSzt1QkFBQyxxQkFBcUI7Z0JBRUosU0FBUztzQkFBaEMsU0FBUzt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLCBJbmplY3RvciwgVHlwZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2xpZW50TWVzc2FnZX0gZnJvbSBcIi4uLy4uL3R5cGVzL0NsaWVudE1lc3NhZ2VcIjtcbmltcG9ydCB7TWVzc2FnZUNvbXBvbmVudH0gZnJvbSBcIi4uL21lc3NhZ2UvbWVzc2FnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7TmdDb21wb25lbnRPdXRsZXQsIE5nRm9yT2YsIE5nSWZ9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2xpZW50LW1lc3NhZ2VzJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaW1wb3J0czogW1xuICAgIE1lc3NhZ2VDb21wb25lbnQsXG4gICAgTmdGb3JPZixcbiAgICBOZ0NvbXBvbmVudE91dGxldCxcbiAgICBOZ0lmXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAjY29udGFpbmVyIGNsYXNzPVwiY2xpZW50LW1lc3NhZ2VzXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LW1lc3NhZ2VzX19pbm5lclwiPlxuICAgICAgICA8Y2xpZW50LW1lc3NhZ2UgKm5nRm9yPVwibGV0IG1zZyBvZiBtZXNzYWdlc1wiIFttZXNzYWdlXT1cIm1zZ1wiIFtwYXJ0c1RhYmxlQ29tcG9uZW50XT1cInBhcnRzVGFibGVDb21wb25lbnRcIi8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gLFxuICBzdHlsZVVybHM6IFsnLi9tZXNzYWdlcy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbWVzc2FnZXM6IENsaWVudE1lc3NhZ2VbXSA9IFtdO1xuICBASW5wdXQoJ3BhcnRzVGFibGVDb21wb25lbnQnKSBwYXJ0c1RhYmxlQ29tcG9uZW50OiBUeXBlPGFueT4gfCBudWxsID0gbnVsbDtcblxuICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXIhOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcblxuICBwcml2YXRlIHByZXZpb3VzTWVzc2FnZXNMZW5ndGggPSAwO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snbWVzc2FnZXMnXSkge1xuICAgICAgY29uc3QgY3VycmVudE1lc3NhZ2VzTGVuZ3RoID0gY2hhbmdlc1snbWVzc2FnZXMnXS5jdXJyZW50VmFsdWUubGVuZ3RoO1xuICAgICAgaWYgKGN1cnJlbnRNZXNzYWdlc0xlbmd0aCAhPT0gdGhpcy5wcmV2aW91c01lc3NhZ2VzTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNNZXNzYWdlc0xlbmd0aCA9IGN1cnJlbnRNZXNzYWdlc0xlbmd0aDtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnNjcm9sbEJvdHRvbSgpO1xuICAgICAgICB9LCAyNTApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNjcm9sbEJvdHRvbSgpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSB0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIGVsLnNjcm9sbFRvcCA9IGVsLnNjcm9sbEhlaWdodDtcbiAgfVxuXG5cbiAgY3JlYXRlSW5qZWN0b3IobWVzc2FnZTogQ2xpZW50TWVzc2FnZSkge1xuICAgIHJldHVybiBJbmplY3Rvci5jcmVhdGUoe3Byb3ZpZGVyczogW3twcm92aWRlOiAnbWVzc2FnZScsIHVzZVZhbHVlOiBtZXNzYWdlfV19KTtcbiAgfVxufVxuIl19