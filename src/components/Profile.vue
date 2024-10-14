<template>
  <div class="profile">
    <h1>Profielpagina</h1>
    <div v-if="user">
      <p><strong>Gebruikersnaam:</strong> {{ user.username }}</p>
      <p><strong>E-mail:</strong> {{ user.email }}</p>
    </div>
    <div v-else>
      <p>Gebruikersgegevens worden geladen...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null, // Houd de gebruikersgegevens bij
    };
  },
  mounted() {
    this.getUserData(); // Haal de gebruikersgegevens op zodra de pagina wordt geladen
  },
  methods: {
    async getUserData() {
      try {
        // Maak een GET-aanvraag naar de API om de gebruikersgegevens op te halen
        const token = localStorage.getItem('authToken');  // Haal de token op
        const response = await axios.get('http://localhost:8080/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`  // Stuur de token mee in de Authorization-header
          }
        });
        this.user = response.data;  // Sla de gebruikersgegevens op in de user state
      } catch (error) {
        console.error('Er is iets misgegaan bij het ophalen van de gebruikersgegevens:', error);
      }
    }
  }
};
</script>

<style scoped>
.profile {
  padding: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
}
</style>
