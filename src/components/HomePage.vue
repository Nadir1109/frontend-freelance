<template>
  <div>
    <h1>Welkom op het Freelance Platform!</h1>
    <div v-if="isLoggedIn">
      <h2>Gebruikersinformatie</h2>
      <p><strong>Naam:</strong> {{ userName }}</p>
      <p><strong>Email:</strong> {{ userEmail }}</p>
      <p><strong>Rol:</strong> {{ userRole }}</p>
    </div>
    <div v-else>
      <p>Log in om uw gegevens te bekijken.</p>
      <button @click="redirectToLogin">Ga naar inloggen</button>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios.js'; // Gebruik de geconfigureerde Axios-instantie

export default {
  data() {
    return {
      userName: '',
      userEmail: '',
      userRole: '',
      isLoggedIn: false, // Boolean om inlogstatus te controleren
    };
  },
  methods: {
    redirectToLogin() {
      // Redirect de gebruiker naar de login-pagina
      this.$router.push('/login');
    },
    async fetchUserInfo() {
      try {
        // Controleer of de gebruiker is ingelogd
        const token = localStorage.getItem('authToken'); // Haal het token op uit localStorage
        if (!token) {
          this.isLoggedIn = false;
          return;
        }

        // Voeg token toe aan Axios headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Haal gebruikersinformatie op via de backend
        const response = await axios.get('/auth/me');
        const data = response.data;

        // Zet de opgehaalde gegevens in de state
        this.userName = data.name || 'Onbekend';
        this.userEmail = data.email || 'Onbekend';
        this.userRole = data.role || 'Onbekend';
        this.isLoggedIn = true; // Markeer gebruiker als ingelogd
      } catch (error) {
        console.error('Fout bij ophalen gebruikersinfo:', error);
        this.isLoggedIn = false; // Markeer gebruiker als uitgelogd bij een fout
      }
    },
  },
  mounted() {
    // Haal informatie op wanneer de component geladen wordt
    this.fetchUserInfo();
  },
  watch: {
    // Monitor routewijzigingen en haal informatie opnieuw op
    $route(to, from) {
      if (to.name === 'Home') {
        this.fetchUserInfo();
      }
    },
  },
};
</script>

<style scoped>
/* Voeg hier je eigen styling toe */
button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
