# Lora client SDK

## 1. Installing dependency

#### Using NPM:

```shell
npm add github:explore-de/lora-client-sdk#v0.2.4
```

#### Using yarn:

```shell
npm add github:explore-de/lora-client-sdk#v0.2.4
```

#### Or by adding directly to `package.json`:

`"lora-client": "github:explore-de/lora-client-sdk#v0.2.4"`

## 2. Import client component to your application

```typescript
import {LoraClient} from 'lora-client'
```

## 3. Render component with required props

```angular2html

<lora-client
  [token]="apiToken"
/>
```

___

## Examples

### Setting client height

The default height will be 500px, but you can change it by setting `[height]` property of client component:

```angular2html

<lora-client
  [token]="apiToken"
  [height]="700"
/>
```

### Listening for Lora messages

You can listen for lora messages by subscribing to component events:\n
Add listener: `(onMessage)="onMessage($event)"`

```typescript
function onMessage(message: ClientMessage) {
  console.log('Message from Lora:', message);
}
```

the message has next type:

```typescript
type ClientMessage = {
  id: string,
  user: string,
  content: string,
  time: number,
  parts?: {
    "anlagenKennzeichen": string,
    "geo": string
  }[],
}

```

So, here you can filter messages by partIds and do any logic related to specific partId

### Using service directly without using client-component

You can use service directly without using client-component:

```typescript 
import {LoraClientService} from 'lora-client'
import {ClientMessage} from "./ClientMessage";

async function connect() {
  // create service instance
  const loraClientService = new LoraClientService();
  // create new session (also you can reuse sessionId by storing it in local storage as example)
  const sessionId = await loraClientService.createSession(apiToken);
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

### Using custom component for messages

You can use custom component for messages by setting `[messageComponent]` property of client component:

```angular2html
<lora-client
  [customMessageComponent]="CustomMessageComponent"
/>
```

Example of CustomMessageComponent:

```typescript
import {Component, Inject, ViewEncapsulation} from '@angular/core';
import type {ClientMessage} from "@lora-client";
import {NgClass} from "@angular/common";

@Component({
  selector: 'custom-message',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [NgClass],
  template: `
    <div class="custom-message" [ngClass]="{'custom-message--own': isOwnMessage()}">
      <div class="client-message__content">
        <div [innerHTML]="getFormattedMessage()"></div>
        <table>
          <tr>
            <td>Lorem</td>
            <td>Ipsum</td>
          </tr>
          <tr>
            <td>Dolor</td>
            <td>Sit</td>
          </tr>
          <tr>
            <td>Amet</td>
            <td>Consectetur</td>
          </tr>
        </table>
      </div>
    </div>`,
})
export class CustomMessageComponent {
  constructor(@Inject('message') public message: ClientMessage) {}

  isOwnMessage(){
    return this.message.user === 'me'
  }

  getFormattedMessage(): string {
    return (this.message.content || '').replace(/\n/g, '<br>');
  }
}

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
