import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;

export function connectWebSocket() {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        console.log("Connected to WebSocket");

        // Subscribe op berichten van de server
        stompClient.subscribe("/topic/messages", (response) => {
            console.log("Received:", response.body);
        });

        // Stuur een testbericht naar de server
        stompClient.send("/app/test", {}, "Hallo WebSocket!");
    });
}

export function disconnectWebSocket() {
    if (stompClient) {
        stompClient.disconnect();
        console.log("Disconnected from WebSocket");
    }
}
