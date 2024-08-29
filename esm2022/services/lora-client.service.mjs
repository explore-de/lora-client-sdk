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
const HEARTBEAT_INTERVAL = 12000;
export class LoraClientService {
    url = undefined;
    socket = null;
    isConnected = false;
    isError = false;
    messages = [];
    messagesQueue = [];
    listeners = {};
    heartBeatInterval = 0;
    connect(url, sessionId) {
        this.url = `${url}/${sessionId}`;
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
                this.startHeartBeat();
                this.emitStatus(ConnectionStatus.CONNECTED);
                resolvePromise();
            };
            this.socket.onmessage = (event) => {
                const response = event.data;
                if (response === 'ping' || response === 'pong')
                    return;
                if (typeof response === 'string') {
                    this.onSocketMessage(response);
                }
            };
            this.socket.onclose = () => {
                this.isConnected = false;
                this.stopHeartBeat();
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
    onSocketMessage(data) {
        let json = undefined;
        let content = '';
        let parts = [];
        try {
            json = JSON.parse(data);
            content = json.answer;
            parts = json.parts;
        }
        catch (e) {
            content = data;
        }
        const message = { id: crypto.randomUUID(), user: 'lora', content, parts, time: Date.now() };
        this.addMessage(message);
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
    sendHeartBeat() {
        if (this.isConnected) {
            this.socket?.send('ping');
        }
    }
    startHeartBeat() {
        this.heartBeatInterval = window.setInterval(() => {
            this.sendHeartBeat();
        }, HEARTBEAT_INTERVAL);
    }
    stopHeartBeat() {
        window.clearInterval(this.heartBeatInterval);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: LoraClientService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: LoraClientService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.2", ngImport: i0, type: LoraClientService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9yYS1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb3JhLWNsaWVudC9zcmMvc2VydmljZXMvbG9yYS1jbGllbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDOztBQUUvQyxNQUFNLENBQU4sSUFBWSxnQkFLWDtBQUxELFdBQVksZ0JBQWdCO0lBQzFCLGlEQUE2QixDQUFBO0lBQzdCLDJDQUF1QixDQUFBO0lBQ3ZCLDZDQUF5QixDQUFBO0lBQ3pCLG1DQUFlLENBQUE7QUFDakIsQ0FBQyxFQUxXLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFLM0I7QUFFRCxJQUFLLGFBR0o7QUFIRCxXQUFLLGFBQWE7SUFDaEIsdURBQU8sQ0FBQTtJQUNQLGlEQUFJLENBQUE7QUFDTixDQUFDLEVBSEksYUFBYSxLQUFiLGFBQWEsUUFHakI7QUFVRCxNQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQztBQUdqQyxNQUFNLE9BQU8saUJBQWlCO0lBQ3BCLEdBQUcsR0FBdUIsU0FBUyxDQUFDO0lBQ3BDLE1BQU0sR0FBcUIsSUFBSSxDQUFDO0lBQ2hDLFdBQVcsR0FBWSxLQUFLLENBQUM7SUFDN0IsT0FBTyxHQUFZLEtBQUssQ0FBQztJQUN6QixRQUFRLEdBQW9CLEVBQUUsQ0FBQztJQUMvQixhQUFhLEdBQTBCLEVBQUUsQ0FBQztJQUMxQyxTQUFTLEdBQTRDLEVBQUUsQ0FBQztJQUN4RCxpQkFBaUIsR0FBVyxDQUFDLENBQUM7SUFHdEMsT0FBTyxDQUFDLEdBQVcsRUFBRSxTQUFpQjtRQUNwQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZCxNQUFN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TUFBTTs7MkZBQ2xCLGlCQUFpQjtrQkFEN0IsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDbGllbnRNZXNzYWdlfSBmcm9tIFwiLi4vdHlwZXMvQ2xpZW50TWVzc2FnZVwiO1xuaW1wb3J0IENsaWVudEVycm9yIGZyb20gXCIuLi90eXBlcy9DbGllbnRFcnJvclwiO1xuXG5leHBvcnQgZW51bSBDb25uZWN0aW9uU3RhdHVzIHtcbiAgRElTQ09OTkVDVEVEID0gJ2Rpc2Nvbm5lY3RlZCcsXG4gIENPTk5FQ1RFRCA9ICdjb25uZWN0ZWQnLFxuICBDT05ORUNUSU5HID0gJ2Nvbm5lY3RpbmcnLFxuICBFUlJPUiA9ICdlcnJvcicsXG59XG5cbmVudW0gTWVzc2FnZVN0YXR1cyB7XG4gIFBlbmRpbmcsXG4gIFNlbnQsXG59XG5cbnR5cGUgTWVzc2FnZVF1ZXVlTWVzc2FnZSA9IHsgaWQ6IHN0cmluZywgY29udGVudDogYW55LCBzdGF0dXM6IE1lc3NhZ2VTdGF0dXMgfTtcbnR5cGUgRXZlbnRzID0gJ21lc3NhZ2UnIHwgJ3N0YXR1cyc7XG5cbmludGVyZmFjZSBFdmVudExpc3RlbmVycyB7XG4gIG1lc3NhZ2U6IChtZXNzYWdlOiBDbGllbnRNZXNzYWdlKSA9PiB2b2lkO1xuICBzdGF0dXM6IChzdGF0dXM6IENvbm5lY3Rpb25TdGF0dXMpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEhFQVJUQkVBVF9JTlRFUlZBTCA9IDEyMDAwO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBMb3JhQ2xpZW50U2VydmljZSB7XG4gIHByaXZhdGUgdXJsOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgc29ja2V0OiBXZWJTb2NrZXQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBpc0Nvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBtZXNzYWdlczogQ2xpZW50TWVzc2FnZVtdID0gW107XG4gIHByaXZhdGUgbWVzc2FnZXNRdWV1ZTogTWVzc2FnZVF1ZXVlTWVzc2FnZVtdID0gW107XG4gIHByaXZhdGUgbGlzdGVuZXJzOiB7IFtLIGluIEV2ZW50c10/OiBFdmVudExpc3RlbmVyc1tLXVtdIH0gPSB7fTtcbiAgcHJpdmF0ZSBoZWFydEJlYXRJbnRlcnZhbDogbnVtYmVyID0gMDtcblxuXG4gIGNvbm5lY3QodXJsOiBzdHJpbmcsIHNlc3Npb25JZDogc3RyaW5nKSB7XG4gICAgdGhpcy51cmwgPSBgJHt1cmx9LyR7c2Vzc2lvbklkfWA7XG4gICAgaWYgKCF0aGlzLnVybCkge1xuICAgICAgdGhyb3cgbmV3IENsaWVudEVycm9yKCdDYW4gbm90IHN0YXJ0IGNvbm5lY3Rpb246IHNlcnZlciB1cmwgbm90IHNldC4nKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zb2NrZXQgJiYgdGhpcy5zb2NrZXQucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0LkNMT1NFRCkge1xuICAgICAgdGhyb3cgbmV3IENsaWVudEVycm9yKCdXZWJTb2NrZXQgY29ubmVjdGlvbiBpcyBhbHJlYWR5IG9wZW4gb3Igb3BlbmluZy4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2U6ICh2YWx1ZT86IHVua25vd24pID0+IHZvaWQ7XG4gICAgbGV0IHJlamVjdFByb21pc2U6ICh2YWx1ZT86IGFueSkgPT4gdm9pZDtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgICAgcmVqZWN0UHJvbWlzZSA9IHJlamVjdDtcblxuICAgIH0pXG4gICAgdGhpcy5lbWl0U3RhdHVzKENvbm5lY3Rpb25TdGF0dXMuQ09OTkVDVElORyk7XG4gICAgdGhpcy5pc0Vycm9yID0gZmFsc2U7XG4gICAgdGhpcy5pc0Nvbm5lY3RlZCA9IGZhbHNlO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc29ja2V0ID0gbmV3IFdlYlNvY2tldCh0aGlzLnVybCk7XG4gICAgICB0aGlzLnNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNDb25uZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuc3RhcnRIZWFydEJlYXQoKTtcbiAgICAgICAgdGhpcy5lbWl0U3RhdHVzKENvbm5lY3Rpb25TdGF0dXMuQ09OTkVDVEVEKTtcblxuICAgICAgICByZXNvbHZlUHJvbWlzZSgpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5zb2NrZXQub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgaWYgKHJlc3BvbnNlID09PSAncGluZycgfHwgcmVzcG9uc2UgPT09ICdwb25nJykgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5vblNvY2tldE1lc3NhZ2UocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0aGlzLnNvY2tldC5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmlzQ29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RvcEhlYXJ0QmVhdCgpO1xuICAgICAgICB0aGlzLmVtaXRTdGF0dXModGhpcy5pc0Vycm9yID8gQ29ubmVjdGlvblN0YXR1cy5FUlJPUiA6IENvbm5lY3Rpb25TdGF0dXMuRElTQ09OTkVDVEVEKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuc29ja2V0Lm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5pc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgcmVqZWN0UHJvbWlzZT8uKGV2ZW50KTtcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMucHVzaE1lc3NhZ2VUb1F1ZXVlKG1lc3NhZ2UpO1xuICAgIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG4gIH1cblxuICBwcml2YXRlIG9uU29ja2V0TWVzc2FnZShkYXRhOiBzdHJpbmcpIHtcbiAgICBsZXQganNvbiA9IHVuZGVmaW5lZDtcbiAgICBsZXQgY29udGVudCA9ICcnO1xuICAgIGxldCBwYXJ0cyA9IFtdIGFzIHsgXCJhbmxhZ2VuS2VubnplaWNoZW5cIjogc3RyaW5nLCBcImdlb1wiOiBzdHJpbmcgfVtdO1xuICAgIHRyeSB7XG4gICAgICBqc29uID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIGNvbnRlbnQgPSBqc29uLmFuc3dlcjtcbiAgICAgIHBhcnRzID0ganNvbi5wYXJ0cztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb250ZW50ID0gZGF0YTtcbiAgICB9XG4gICAgY29uc3QgbWVzc2FnZSA9IHtpZDogY3J5cHRvLnJhbmRvbVVVSUQoKSBhcyBzdHJpbmcsIHVzZXI6ICdsb3JhJywgY29udGVudCwgcGFydHMsIHRpbWU6IERhdGUubm93KCl9O1xuICAgIHRoaXMuYWRkTWVzc2FnZShtZXNzYWdlKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc1F1ZXVlKCkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2VzUXVldWUucG9wKCk7XG4gICAgaWYgKCFtZXNzYWdlKSByZXR1cm47XG5cbiAgICB0aGlzLmFkZE1lc3NhZ2Uoe2lkOiBtZXNzYWdlLmlkLCB1c2VyOiAnbWUnLCB0aW1lOiBEYXRlLm5vdygpLCBjb250ZW50OiBtZXNzYWdlLmNvbnRlbnR9KVxuICAgIHRoaXMuc29ja2V0Py5zZW5kKG1lc3NhZ2U/LmNvbnRlbnQpO1xuICAgIG1lc3NhZ2Uuc3RhdHVzID0gTWVzc2FnZVN0YXR1cy5TZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBwdXNoTWVzc2FnZVRvUXVldWUobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgY29uc3QgaWQgPSBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuXG4gICAgdGhpcy5tZXNzYWdlc1F1ZXVlLnB1c2goe1xuICAgICAgaWQsXG4gICAgICBjb250ZW50OiBtZXNzYWdlLFxuICAgICAgc3RhdHVzOiBNZXNzYWdlU3RhdHVzLlBlbmRpbmdcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkTWVzc2FnZShtZXNzYWdlOiBDbGllbnRNZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuXG4gICAgdGhpcy5lbWl0TWVzc2FnZShtZXNzYWdlKTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdE1lc3NhZ2UobWVzc2FnZTogQ2xpZW50TWVzc2FnZSkge1xuICAgIHRoaXMubGlzdGVuZXJzLm1lc3NhZ2U/LmZvckVhY2gobGlzdGVuZXIgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGlzdGVuZXIobWVzc2FnZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRTdGF0dXMoc3RhdHVzOiBDb25uZWN0aW9uU3RhdHVzKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMuc3RhdHVzPy5mb3JFYWNoKGxpc3RlbmVyID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxpc3RlbmVyKHN0YXR1cyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvbjxUIGV4dGVuZHMgRXZlbnRzPihldmVudDogVCwgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXJzW1RdKSB7XG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xuICAgIH1cbiAgICAodGhpcy5saXN0ZW5lcnNbZXZlbnRdIGFzIGFueVtdKS5wdXNoKGxpc3RlbmVyKTtcbiAgfVxuXG4gIG9mZjxLIGV4dGVuZHMgRXZlbnRzPihldmVudDogSywgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXJzW0tdKSB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XSBhcyBhbnlbXTtcbiAgICBjb25zdCBpbmRleCA9IGRhdGEuaW5kZXhPZihsaXN0ZW5lcik7XG5cbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgKHRoaXMubGlzdGVuZXJzW2V2ZW50XSBhcyBbXSkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBnZXRNZXNzYWdlcygpIHtcbiAgICByZXR1cm4gWy4uLnRoaXMubWVzc2FnZXNdO1xuICB9XG5cbiAgZGlzY29ubmVjdCgpIHtcbiAgICB0aGlzLm1lc3NhZ2VzID0gW107XG4gICAgdGhpcy5tZXNzYWdlc1F1ZXVlID0gW107XG4gICAgaWYgKHRoaXMuc29ja2V0KSB7XG4gICAgICB0aGlzLnNvY2tldC5jbG9zZSgxMDAwLCBcIkNsb3NlZCBieSBjbGllbnRcIik7XG4gICAgfVxuICB9XG5cblxuICBwcml2YXRlIHNlbmRIZWFydEJlYXQoKSB7XG4gICAgaWYgKHRoaXMuaXNDb25uZWN0ZWQpIHtcbiAgICAgIHRoaXMuc29ja2V0Py5zZW5kKCdwaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGFydEhlYXJ0QmVhdCgpIHtcbiAgICB0aGlzLmhlYXJ0QmVhdEludGVydmFsID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMuc2VuZEhlYXJ0QmVhdCgpXG4gICAgfSwgSEVBUlRCRUFUX0lOVEVSVkFMKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RvcEhlYXJ0QmVhdCgpIHtcbiAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmhlYXJ0QmVhdEludGVydmFsKTtcbiAgfVxufVxuIl19