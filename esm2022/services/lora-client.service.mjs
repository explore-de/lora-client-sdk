import { Injectable } from '@angular/core';
import ClientError from "../types/ClientError";
import * as i0 from "@angular/core";
export var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus["DISCONNECTED"] = "disconnected";
    ConnectionStatus["CONNECTED"] = "connected";
    ConnectionStatus["CONNECTING"] = "connecting";
    ConnectionStatus["ERROR"] = "error";
})(ConnectionStatus || (ConnectionStatus = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus[MessageStatus["Pending"] = 0] = "Pending";
    MessageStatus[MessageStatus["Sent"] = 1] = "Sent";
})(MessageStatus || (MessageStatus = {}));
export class LoraClientService {
    url = undefined;
    socket = null;
    isConnected = false;
    isError = false;
    messages = [];
    messagesQueue = [];
    listeners = {};
    connect(url) {
        this.url = url;
        if (!this.url) {
            throw new ClientError('Can not start connection: server url not set.');
        }
        if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
            throw new ClientError('WebSocket connection is already open or opening.');
        }
        let resolvePromise;
        let rejectPromise;
        const promise = new Promise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
        });
        this.emitStatus(ConnectionStatus.CONNECTING);
        this.isError = false;
        this.isConnected = false;
        try {
            this.socket = new WebSocket(this.url);
            this.socket.onopen = () => {
                this.isConnected = true;
                this.emitStatus(ConnectionStatus.CONNECTED);
                resolvePromise();
            };
            this.socket.onmessage = (event) => {
                const response = event.data;
                if (response === 'ping' || response === 'pong')
                    return;
                const message = { id: crypto.randomUUID(), user: 'lora', content: response, time: Date.now() };
                this.addMessage(message);
            };
            this.socket.onclose = () => {
                this.isConnected = false;
                this.emitStatus(this.isError ? ConnectionStatus.ERROR : ConnectionStatus.DISCONNECTED);
            };
            this.socket.onerror = (event) => {
                this.isError = true;
                rejectPromise?.(event);
            };
        }
        catch (e) {
            console.error(e);
            return;
        }
        return promise;
    }
    sendMessage(message) {
        this.pushMessageToQueue(message);
        this.processQueue();
    }
    processQueue() {
        const message = this.messagesQueue.pop();
        if (!message)
            return;
        this.addMessage({ id: message.id, user: 'me', time: Date.now(), content: message.content });
        this.socket?.send(message?.content);
        message.status = MessageStatus.Sent;
    }
    pushMessageToQueue(message) {
        const id = crypto.randomUUID();
        this.messagesQueue.push({
            id,
            content: message,
            status: MessageStatus.Pending
        });
    }
    addMessage(message) {
        this.messages.push(message);
        this.emitMessage(message);
    }
    emitMessage(message) {
        this.listeners.message?.forEach(listener => {
            try {
                listener(message);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    emitStatus(status) {
        this.listeners.status?.forEach(listener => {
            try {
                listener(status);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }
    off(event, listener) {
        const data = this.listeners[event];
        const index = data.indexOf(listener);
        if (index >= 0) {
            this.listeners[event].splice(index, 1);
        }
    }
    getMessages() {
        return [...this.messages];
    }
    disconnect() {
        this.messages = [];
        this.messagesQueue = [];
        if (this.socket) {
            this.socket.close(1000, "Closed by client");
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: LoraClientService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: LoraClientService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: LoraClientService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9yYS1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb3JhLWNsaWVudC9zcmMvc2VydmljZXMvbG9yYS1jbGllbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDOztBQUcvQyxNQUFNLENBQU4sSUFBWSxnQkFLWDtBQUxELFdBQVksZ0JBQWdCO0lBQzFCLGlEQUE2QixDQUFBO0lBQzdCLDJDQUF1QixDQUFBO0lBQ3ZCLDZDQUF5QixDQUFBO0lBQ3pCLG1DQUFlLENBQUE7QUFDakIsQ0FBQyxFQUxXLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFLM0I7QUFFRCxJQUFLLGFBR0o7QUFIRCxXQUFLLGFBQWE7SUFDaEIsdURBQU8sQ0FBQTtJQUNQLGlEQUFJLENBQUE7QUFDTixDQUFDLEVBSEksYUFBYSxLQUFiLGFBQWEsUUFHakI7QUFXRCxNQUFNLE9BQU8saUJBQWlCO0lBQ3BCLEdBQUcsR0FBdUIsU0FBUyxDQUFDO0lBQ3BDLE1BQU0sR0FBcUIsSUFBSSxDQUFDO0lBQ2hDLFdBQVcsR0FBWSxLQUFLLENBQUM7SUFDN0IsT0FBTyxHQUFZLEtBQUssQ0FBQztJQUN6QixRQUFRLEdBQW9CLEVBQUUsQ0FBQztJQUMvQixhQUFhLEdBQTBCLEVBQUUsQ0FBQztJQUUxQyxTQUFTLEdBQTRDLEVBQUUsQ0FBQztJQUVoRSxPQUFPLENBQUMsR0FBVztRQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZCxNQUFNLElBQUksV0FBVyxDQUFDLCtDQUErQyxDQUFDLENBQUM7UUFDekUsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFD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O2tCQUQ3QixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NsaWVudE1lc3NhZ2V9IGZyb20gXCIuLi90eXBlcy9DbGllbnRNZXNzYWdlXCI7XG5pbXBvcnQgQ2xpZW50RXJyb3IgZnJvbSBcIi4uL3R5cGVzL0NsaWVudEVycm9yXCI7XG5cblxuZXhwb3J0IGVudW0gQ29ubmVjdGlvblN0YXR1cyB7XG4gIERJU0NPTk5FQ1RFRCA9ICdkaXNjb25uZWN0ZWQnLFxuICBDT05ORUNURUQgPSAnY29ubmVjdGVkJyxcbiAgQ09OTkVDVElORyA9ICdjb25uZWN0aW5nJyxcbiAgRVJST1IgPSAnZXJyb3InLFxufVxuXG5lbnVtIE1lc3NhZ2VTdGF0dXMge1xuICBQZW5kaW5nLFxuICBTZW50LFxufVxuXG50eXBlIE1lc3NhZ2VRdWV1ZU1lc3NhZ2UgPSB7IGlkOiBzdHJpbmcsIGNvbnRlbnQ6IGFueSwgc3RhdHVzOiBNZXNzYWdlU3RhdHVzIH07XG50eXBlIEV2ZW50cyA9ICdtZXNzYWdlJyB8ICdzdGF0dXMnO1xuXG5pbnRlcmZhY2UgRXZlbnRMaXN0ZW5lcnMge1xuICBtZXNzYWdlOiAobWVzc2FnZTogQ2xpZW50TWVzc2FnZSkgPT4gdm9pZDtcbiAgc3RhdHVzOiAoc3RhdHVzOiBDb25uZWN0aW9uU3RhdHVzKSA9PiB2b2lkO1xufVxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBMb3JhQ2xpZW50U2VydmljZSB7XG4gIHByaXZhdGUgdXJsOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgc29ja2V0OiBXZWJTb2NrZXQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBpc0Nvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBtZXNzYWdlczogQ2xpZW50TWVzc2FnZVtdID0gW107XG4gIHByaXZhdGUgbWVzc2FnZXNRdWV1ZTogTWVzc2FnZVF1ZXVlTWVzc2FnZVtdID0gW107XG5cbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6IHsgW0sgaW4gRXZlbnRzXT86IEV2ZW50TGlzdGVuZXJzW0tdW10gfSA9IHt9O1xuXG4gIGNvbm5lY3QodXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICBpZiAoIXRoaXMudXJsKSB7XG4gICAgICB0aHJvdyBuZXcgQ2xpZW50RXJyb3IoJ0NhbiBub3Qgc3RhcnQgY29ubmVjdGlvbjogc2VydmVyIHVybCBub3Qgc2V0LicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNvY2tldCAmJiB0aGlzLnNvY2tldC5yZWFkeVN0YXRlICE9PSBXZWJTb2NrZXQuQ0xPU0VEKSB7XG4gICAgICB0aHJvdyBuZXcgQ2xpZW50RXJyb3IoJ1dlYlNvY2tldCBjb25uZWN0aW9uIGlzIGFscmVhZHkgb3BlbiBvciBvcGVuaW5nLicpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZTogKHZhbHVlPzogdW5rbm93bikgPT4gdm9pZDtcbiAgICBsZXQgcmVqZWN0UHJvbWlzZTogKHZhbHVlPzogYW55KSA9PiB2b2lkO1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgICByZWplY3RQcm9taXNlID0gcmVqZWN0O1xuXG4gICAgfSlcbiAgICB0aGlzLmVtaXRTdGF0dXMoQ29ubmVjdGlvblN0YXR1cy5DT05ORUNUSU5HKTtcbiAgICB0aGlzLmlzRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ29ubmVjdGVkID0gZmFsc2U7XG5cbiAgICB0cnkge1xuICAgICAgdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KHRoaXMudXJsKTtcbiAgICAgIHRoaXMuc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5pc0Nvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdFN0YXR1cyhDb25uZWN0aW9uU3RhdHVzLkNPTk5FQ1RFRCk7XG5cbiAgICAgICAgcmVzb2x2ZVByb21pc2UoKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuc29ja2V0Lm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgIGlmIChyZXNwb25zZSA9PT0gJ3BpbmcnIHx8IHJlc3BvbnNlID09PSAncG9uZycpIHJldHVybjtcblxuICAgICAgICBjb25zdCBtZXNzYWdlID0ge2lkOiBjcnlwdG8ucmFuZG9tVVVJRCgpLCB1c2VyOiAnbG9yYScsIGNvbnRlbnQ6IHJlc3BvbnNlLCB0aW1lOiBEYXRlLm5vdygpfTtcbiAgICAgICAgdGhpcy5hZGRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5zb2NrZXQub25jbG9zZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5pc0Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXRTdGF0dXModGhpcy5pc0Vycm9yID8gQ29ubmVjdGlvblN0YXR1cy5FUlJPUiA6IENvbm5lY3Rpb25TdGF0dXMuRElTQ09OTkVDVEVEKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuc29ja2V0Lm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5pc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgcmVqZWN0UHJvbWlzZT8uKGV2ZW50KTtcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMucHVzaE1lc3NhZ2VUb1F1ZXVlKG1lc3NhZ2UpO1xuICAgIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG4gIH1cblxuICBwcml2YXRlIHByb2Nlc3NRdWV1ZSgpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5tZXNzYWdlc1F1ZXVlLnBvcCgpO1xuICAgIGlmICghbWVzc2FnZSkgcmV0dXJuO1xuXG4gICAgdGhpcy5hZGRNZXNzYWdlKHtpZDogbWVzc2FnZS5pZCwgdXNlcjogJ21lJywgdGltZTogRGF0ZS5ub3coKSwgY29udGVudDogbWVzc2FnZS5jb250ZW50fSlcbiAgICB0aGlzLnNvY2tldD8uc2VuZChtZXNzYWdlPy5jb250ZW50KTtcbiAgICBtZXNzYWdlLnN0YXR1cyA9IE1lc3NhZ2VTdGF0dXMuU2VudDtcbiAgfVxuXG4gIHByaXZhdGUgcHVzaE1lc3NhZ2VUb1F1ZXVlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGNvbnN0IGlkID0gY3J5cHRvLnJhbmRvbVVVSUQoKTtcblxuICAgIHRoaXMubWVzc2FnZXNRdWV1ZS5wdXNoKHtcbiAgICAgIGlkLFxuICAgICAgY29udGVudDogbWVzc2FnZSxcbiAgICAgIHN0YXR1czogTWVzc2FnZVN0YXR1cy5QZW5kaW5nXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZE1lc3NhZ2UobWVzc2FnZTogQ2xpZW50TWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZXMucHVzaChtZXNzYWdlKTtcblxuICAgIHRoaXMuZW1pdE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRNZXNzYWdlKG1lc3NhZ2U6IENsaWVudE1lc3NhZ2UpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5tZXNzYWdlPy5mb3JFYWNoKGxpc3RlbmVyID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxpc3RlbmVyKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0U3RhdHVzKHN0YXR1czogQ29ubmVjdGlvblN0YXR1cykge1xuICAgIHRoaXMubGlzdGVuZXJzLnN0YXR1cz8uZm9yRWFjaChsaXN0ZW5lciA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBsaXN0ZW5lcihzdGF0dXMpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb248VCBleHRlbmRzIEV2ZW50cz4oZXZlbnQ6IFQsIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyc1tUXSkge1xuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbZXZlbnRdKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0gPSBbXTtcbiAgICB9XG4gICAgKHRoaXMubGlzdGVuZXJzW2V2ZW50XSBhcyBhbnlbXSkucHVzaChsaXN0ZW5lcik7XG4gIH1cblxuICBvZmY8SyBleHRlbmRzIEV2ZW50cz4oZXZlbnQ6IEssIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyc1tLXSkge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmxpc3RlbmVyc1tldmVudF0gYXMgYW55W107XG4gICAgY29uc3QgaW5kZXggPSBkYXRhLmluZGV4T2YobGlzdGVuZXIpO1xuXG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICh0aGlzLmxpc3RlbmVyc1tldmVudF0gYXMgW10pLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TWVzc2FnZXMoKSB7XG4gICAgcmV0dXJuIFsuLi50aGlzLm1lc3NhZ2VzXTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICAgIHRoaXMubWVzc2FnZXNRdWV1ZSA9IFtdO1xuICAgIGlmICh0aGlzLnNvY2tldCkge1xuICAgICAgdGhpcy5zb2NrZXQuY2xvc2UoMTAwMCwgXCJDbG9zZWQgYnkgY2xpZW50XCIpO1xuICAgIH1cbiAgfVxufVxuIl19