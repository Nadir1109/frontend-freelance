<template>
  <div class="notification-box">
    <h3>Berichtenbox</h3>
    <ul v-if="notifications.length > 0">
      <li v-for="notification in notifications" :key="notification.id" class="notification-item">
        <p>
          {{ notification.message }}
          <button @click="markAsRead(notification.id)">Markeer als gelezen</button>
          <button @click="goToJob(notification.relatedJobId)">Bekijk opdracht</button>
        </p>
      </li>
    </ul>
    <p v-else>Geen nieuwe meldingen</p>
  </div>
</template>

<script>
import { connectWebSocket } from "@/WebSocketService"; // Zorg dat je WebSocket-service correct is

export default {
  name: "NotificationBox",
  data() {
    return {
      notifications: [], // Meldingen die worden opgehaald
    };
  },
  methods: {
    // Haal meldingen op uit de backend
    fetchNotifications() {
      this.$axios
          .get("/api/notifications")
          .then((response) => {
            this.notifications = response.data;
          })
          .catch((error) => {
            console.error("Fout bij het ophalen van meldingen:", error);
          });
    },
    // Markeer een melding als gelezen
    markAsRead(notificationId) {
      this.$axios
          .put(`/api/notifications/${notificationId}/mark-read`)
          .then(() => {
            // Verwijder de melding uit de lijst
            this.notifications = this.notifications.filter(
                (notification) => notification.id !== notificationId
            );
          })
          .catch((error) => {
            console.error("Fout bij markeren als gelezen:", error);
          });
    },
    // Navigeer naar een specifieke opdracht
    goToJob(jobId) {
      if (jobId) {
        this.$router.push(`/jobs/${jobId}`);
      } else {
        console.error("Geen jobId beschikbaar voor deze melding");
      }
    },
    // Verwerk nieuwe meldingen via WebSocket
    handleNewNotification(notification) {
      this.notifications.unshift(notification); // Voeg nieuwe melding toe bovenaan
    },
  },
  mounted() {
    this.fetchNotifications(); // Meldingen ophalen bij laden
    const socket = connectWebSocket(); // Verbind WebSocket
    socket.subscribe("/topic/messages", (message) => {
      const notification = JSON.parse(message.body);
      this.handleNewNotification(notification); // Nieuwe melding verwerken
    });
  },
};
</script>

<style scoped>
.notification-box {
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-width: 400px;
  margin: 20px auto;
}
.notification-item {
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
.notification-item button {
  margin-left: 10px;
}
</style>
