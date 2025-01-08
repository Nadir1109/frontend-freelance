<template>
  <div id="app">
    <NavigationBar />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";


export default {
  name: "App",
  components: {
    NavigationBar
  },
  data() {
    return {
      stompClient: null, // WebSocket client
      messages: [] // Hier slaan we ontvangen berichten op
    };
  },
  mounted() {
    this.connectWebSocket(); // WebSocket verbinden bij laden van de app
  },
  methods: {
    connectWebSocket() {
      const socket = new SockJS("http://localhost:8080/ws");
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, () => {
        console.log("Connected to WebSocket");

        // Subscribe op berichten van de server
        this.stompClient.subscribe("/topic/messages", (response) => {
          console.log("Received:", response.body);
          this.messages.push(response.body); // Bericht opslaan
        });

        // Stuur een testbericht naar de server
        this.stompClient.send("/app/test", {}, "Hallo WebSocket!");
      });
    },
    disconnectWebSocket() {
      if (this.stompClient) {
        this.stompClient.disconnect();
        console.log("Disconnected from WebSocket");
      }
    }
  },
  beforeDestroy() {
    this.disconnectWebSocket(); // Verbreek verbinding bij sluiten van de app
  }
};
</script>

<style>
/* Optionele styling */
</style>
