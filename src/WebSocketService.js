import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";

let stompClient = null;

export function connectWebSocket() {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
        console.log("Verbonden met WebSocket");
    });
    return stompClient;
}
