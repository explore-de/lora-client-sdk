# Lora client SDK

## 1. Installing dependency

#### Using NPM:

```shell
npm add github:explore-de/lora-client-sdk#v0.0.0
```

#### Using yarn:

```shell
npm add github:explore-de/lora-client-sdk#v0.0.0
```

#### Or by adding directly to `package.json`:

`"lora-client": "github:explore-de/lora-client-sdk#v0.0.0"`

## 2. Import client component to your application

```typescript
import {LoraClient} from 'lora-client'
```

## 3. Render component with required props

**Template**
```angular2html
<lora-client
  [serviceUrl]="serviceUrl"
  [authHeaderSupplier]="authHeaderSupplier"
/>
```

**Script**
```typescript
@Component({
  // ...
})
class LoraClientExample {
  serviceUrl = "https://lora.deployment.com/api/lora";
  authHeaderSupplier = () => `Bearer ${this.access_token}`;
  // ...
}
```
___

## Examples

### Setting client height

The default height will be 500px, but you can change it by setting `[height]` property of client component:

```angular2html

<lora-client
  [serviceUrl]="serviceUrl"
  [authHeaderSupplier]="authHeaderSupplier"
  [height]="700"
/>
```

### Subscribing for the 'ticket created' event

You can subscribe for the 'ticket created' event by adding event listener to the client component:

```typescript jsx

function onTicketCreated(ticket: TicketInformation) {
  console.log('Ticket created:', ticket);
}
```

```angular2html

<lora-client (onTicketCreated)="onTicketCreated($event)"/>

```

### Using service directly without using client-component

You can use service directly without using client-component:

```typescript 
import {LoraClientService} from 'lora-client'
import {ClientMessage} from "./ClientMessage";

async function connect() {
  // create service instance
  const loraClientService = new LoraClientService();
  loraClientService.setServiceUrl("https://lora.deployment.com/api/lora");
  loraClientService.setAuthHeaderSupplier(() => `Bearer myauthtoken`);
  // create new session (also you can reuse sessionId by storing it in local storage as example)
  const sessionId = await loraClientService.createSession();
  // you can get old messages history
  const oldMessages = await loraClientService.getMessagesHistory(sessionId);

  //subscribe to events
  loraClientService.loraClientService.on('message', (message: ClientMessage) => {
    console.log('Message from Lora:', message);
  });
  loraClientService.loraClientService.on('status', (status: ConnectionStatus) => {
    console.log('Client status chnaged:', status);
  });

  // connect to lora
  await loraClientService.connect({sessionId});
}

connect();
```

### Using `partsTableComponent` for rendering parts table in messages

You need to define `PartsTableComponent` in your application, as example:

```typescript
import {Component, Inject} from '@angular/core';
import {ClientMessage, ClientMessagePartDetails} from "@/lora-client/src";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'parts-table',
  standalone: true,
  imports: [NgForOf],
  styleUrl: './parts-table.component.css',
  template: `
    <div>
      <table>
        <tr>
          <th *ngFor="let column of columns">{{ column }}</th>
        </tr>

        <tr *ngFor="let part of message.parts">
          <td *ngFor="let column of columns">{{ part[column] }}</td>
        </tr>
      </table>
    </div>
  `
})
export class PartsTableComponent {
  readonly columns = [
    'anlagenKennzeichen',
    'geo',
    'hersteller',
    'komponententyp',
    'lieferant',
    'lieferzeitInWochen',
    'terminCDR',
    'terminLieferungBaustelle',
    'terminMMR',
    'terminPDR',
    'terminvFAT',
    'verantwortlicher'
  ];

  constructor(@Inject('message') public message: ClientMessage) {
  }
}
```

Let the client component know about your custom component:

```angular2html

<lora-client
  [partsTableComponent]="PartsTableComponent"
/>
```

### Redefining colour theme

You can simply redefine color theme by adding those variables to your application or component styles:

```scss
:host {
  --lora-client__background: #e7e7e7;
  --lora-client__button-main-color: #006a6c;
  --lora-client__button-text-color: #fff;
  --lora-client__button-hover-color: #3f3f3f;
  --lora-client__button-active-color: #5b5b5b;
  --lora-client__message-border-radius: 4px;
  --lora-client__message-color-1: #ffa500;
  --lora-client__message-color-2: #7b7bff;
}
```

### Styling client with custom css file

You can simply inject your own css file to style client component:

```angular2html

<lora-client [stylesFile]="'https://example.com/styles.css'"/>
```

custom css file example:

```css
.client__container {
  background: #fff5cb !important;
}

.client__input-message {
  padding: 10px;
}

.client__message-input__textarea {
  border-radius: 8px;
}

.client__input-submit {
  display: flex;
  flex-direction: row;
  padding: 10px 10px 10px 0;
}

.client-message-send {
  background: #ffe179 !important;
  border-radius: 8px !important;
  padding: 5px !important;
  height: 34px !important;
  color: black !important;
}
```

## CSS classes

The following CSS classes and selectors are defined in Lora Client:

- `.client`
- `.client__container`
- `.client__status`
- `.client__messages`
- `.client__input`
- `.client__input-message`
- `.client__error`
- `.client__error-message`
- `.client__error-actions`
- `.client::-webkit-scrollbar`
- `.client::-webkit-scrollbar-track`
- `.client::-webkit-scrollbar-thumb`
- `.client::-webkit-scrollbar-button`
- `.client-messages`
- `.client-messages__inner`
- `.client-message-send`
- `.client-message-send__icon`
- `.client-message`
- `.client-message__content`
- `.client-message--own`
- `.client__message-input__textarea`
- `.ticket-widget`
- `.ticket-widget__header`
- `.ticket-widget__table`
- `.ticket-widget__field`
- `.ticket-widget__value`
- `.ticket-widget__custom-attributes`
- `.ticket-widget__actions`
- `.tickets-widget`
- `.tickets-widget__ticket`
- `.tickets-widget__ticket-id`
- `.editable-field`
