# Lora client SDK

## 1. Installing dependency
#### Using NPM:
```shell
npm add github:explore-de/lora-client-sdk#v0.1.0
```

#### Using yarn:
```shell
npm add github:explore-de/lora-client-sdk#v0.1.0
```

#### Or by adding directly to `package.json`:
`"lora-client": "github:explore-de/lora-client-sdk#v0.1.0"`


## 2. Import client component to your application
```typescript
import {LoraClient} from 'lora-client'
```

## 3. Render component with required props 
```angular2html
<lora-client 
  [sessionUrl]="https://feynsinn.explore.de/lora-minirag/session" 
  [socketUrl]="wss://feynsinn.explore.de/lora-minirag/ws" 
/>
```

___

## Examples

### Setting client height

The default height will be 500px, but you can change it by setting `[height]` property of client component: 
```angular2html
<lora-client
        [sessionUrl]="https://feynsinn.explore.de/lora-minirag/session"
        [socketUrl]="wss://feynsinn.explore.de/lora-minirag/ws"
        [height]="700"
/>
```
