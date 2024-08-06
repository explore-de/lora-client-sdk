import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgClass } from "@angular/common";
import * as i0 from "@angular/core";
export class MessageComponent {
    message;
    formatUnixTime(unixTime) {
        // Create a new JavaScript Date object based on the Unix timestamp
        const date = new Date(unixTime * 1000);
        // Get the day, month, and year from the date object
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed in JavaScript
        const year = date.getFullYear();
        // Get the hours, minutes, and seconds from the date object
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        // Format the date and time components to ensure two digits for each
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        // Return the formatted date and time string
        return `${formattedDate} ${formattedTime}`;
    }
    getTimeFormatted() {
        return this.formatUnixTime(this.message.time);
    }
    getFormattedMessage() {
        return (this.message.content || '').replace(/\n/g, '<br>');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MessageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.2", type: MessageComponent, isStandalone: true, selector: "client-message", inputs: { message: "message" }, ngImport: i0, template: `
      <div class="client-message" [ngClass]="{'client-message--own': message.user == 'me'}">
          <div class="client-message__content">
              <div [innerHTML]="getFormattedMessage()"></div>
          </div>
      </div>`, isInline: true, styles: [".client-message{margin:8px 0;display:flex;flex-direction:column;align-items:flex-start}.client-message__content{background:#efefef;padding:8px;border-radius:16px}.client-message--own{align-items:flex-end}.client-message--own .client-message__content{background:#a6e4e7}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: MessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'client-message', standalone: true, encapsulation: ViewEncapsulation.None, imports: [NgClass], template: `
      <div class="client-message" [ngClass]="{'client-message--own': message.user == 'me'}">
          <div class="client-message__content">
              <div [innerHTML]="getFormattedMessage()"></div>
          </div>
      </div>`, styles: [".client-message{margin:8px 0;display:flex;flex-direction:column;align-items:flex-start}.client-message__content{background:#efefef;padding:8px;border-radius:16px}.client-message--own{align-items:flex-end}.client-message--own .client-message__content{background:#a6e4e7}\n"] }]
        }], propDecorators: { message: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9yYS1jbGllbnQvc3JjL2xpYi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWxFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFleEMsTUFBTSxPQUFPLGdCQUFnQjtJQUNsQixPQUFPLENBQWlCO0lBR3pCLGNBQWMsQ0FBQyxRQUFnQjtRQUNyQyxrRUFBa0U7UUFDbEUsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRXZDLG9EQUFvRDtRQUNwRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLHdDQUF3QztRQUMzRSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFaEMsMkRBQTJEO1FBQzNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWxDLG9FQUFvRTtRQUNwRSxNQUFNLGFBQWEsR0FBRyxHQUFHLElBQUksSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ3hHLE1BQU0sYUFBYSxHQUFHLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUUzSSw0Q0FBNEM7UUFDNUMsT0FBTyxHQUFHLGFBQWEsSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3RCxDQUFDO3VHQWhDVSxnQkFBZ0I7MkZBQWhCLGdCQUFnQiwwR0FSakI7Ozs7O2FBS0MseVZBTkQsT0FBTzs7MkZBU04sZ0JBQWdCO2tCQWI1QixTQUFTOytCQUNFLGdCQUFnQixjQUNkLElBQUksaUJBQ0QsaUJBQWlCLENBQUMsSUFBSSxXQUM1QixDQUFDLE9BQU8sQ0FBQyxZQUNSOzs7OzthQUtDOzhCQUlGLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlfSBmcm9tIFwiLi4vLi4vdHlwZXMvQ2xpZW50TWVzc2FnZVwiO1xuaW1wb3J0IHtOZ0NsYXNzfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NsaWVudC1tZXNzYWdlJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaW1wb3J0czogW05nQ2xhc3NdLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGRpdiBjbGFzcz1cImNsaWVudC1tZXNzYWdlXCIgW25nQ2xhc3NdPVwieydjbGllbnQtbWVzc2FnZS0tb3duJzogbWVzc2FnZS51c2VyID09ICdtZSd9XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNsaWVudC1tZXNzYWdlX19jb250ZW50XCI+XG4gICAgICAgICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJnZXRGb3JtYXR0ZWRNZXNzYWdlKClcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmAsXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2UuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbWVzc2FnZSE6IENsaWVudE1lc3NhZ2U7XG5cblxuICBwcml2YXRlIGZvcm1hdFVuaXhUaW1lKHVuaXhUaW1lOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIC8vIENyZWF0ZSBhIG5ldyBKYXZhU2NyaXB0IERhdGUgb2JqZWN0IGJhc2VkIG9uIHRoZSBVbml4IHRpbWVzdGFtcFxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh1bml4VGltZSAqIDEwMDApO1xuXG4gICAgLy8gR2V0IHRoZSBkYXksIG1vbnRoLCBhbmQgeWVhciBmcm9tIHRoZSBkYXRlIG9iamVjdFxuICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTsgLy8gTW9udGhzIGFyZSB6ZXJvLWluZGV4ZWQgaW4gSmF2YVNjcmlwdFxuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAvLyBHZXQgdGhlIGhvdXJzLCBtaW51dGVzLCBhbmQgc2Vjb25kcyBmcm9tIHRoZSBkYXRlIG9iamVjdFxuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICBjb25zdCBzZWNvbmRzID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG5cbiAgICAvLyBGb3JtYXQgdGhlIGRhdGUgYW5kIHRpbWUgY29tcG9uZW50cyB0byBlbnN1cmUgdHdvIGRpZ2l0cyBmb3IgZWFjaFxuICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBgJHt5ZWFyfS0ke21vbnRoLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX0tJHtkYXkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfWA7XG4gICAgY29uc3QgZm9ybWF0dGVkVGltZSA9IGAke2hvdXJzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX06JHttaW51dGVzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX06JHtzZWNvbmRzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gO1xuXG4gICAgLy8gUmV0dXJuIHRoZSBmb3JtYXR0ZWQgZGF0ZSBhbmQgdGltZSBzdHJpbmdcbiAgICByZXR1cm4gYCR7Zm9ybWF0dGVkRGF0ZX0gJHtmb3JtYXR0ZWRUaW1lfWA7XG4gIH1cblxuICBnZXRUaW1lRm9ybWF0dGVkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0VW5peFRpbWUodGhpcy5tZXNzYWdlLnRpbWUpO1xuICB9XG5cbiAgZ2V0Rm9ybWF0dGVkTWVzc2FnZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5tZXNzYWdlLmNvbnRlbnQgfHwgJycpLnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpO1xuICB9XG59XG4iXX0=