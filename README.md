# Lora client SDK

## 1. Installing dependency
#### Using NPM:
```shell
npm add github:explore-de/lora-client-sdk#v0.2.0
```

#### Using yarn:
```shell
npm add github:explore-de/lora-client-sdk#v0.2.0
```

#### Or by adding directly to `package.json`:
`"lora-client": "github:explore-de/lora-client-sdk#v0.2.0"`


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

async function connect(){
  // create service instance
  const loraClientService = new LoraClientService();
  // create new session (also you can reuse sessionId by storing it in local storage as example)
  const sessionId = await loraClientService.createSession(apiToken);
  // you can get old messages history
  const oldMessages = await loraClientService.getMessagesHistory(sessionId);

  //subscribe to events
  loraClientService.loraClientService.on('message', (message: ClientMessage) =>{
    console.log('Message from Lora:', message);
  });
  loraClientService.loraClientService.on('status', (status: ConnectionStatus) =>{
    console.log('Client status chnaged:', status);
  });

  // connect to lora
  await loraClientService.connect({sessionId});
}

connect();
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
