<template>
  <div>
    <h1>Inloggen</h1>
    <form @submit.prevent="login">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Wachtwoord:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Inloggen</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from '@/plugins/axios.js'; // Gebruik je geconfigureerde Axios-instantie

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/auth/login', {
          email: this.email,
          password: this.password,
        });

        // Controleer of er een token in de response zit en sla het op
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          this.$router.push('/'); // Stuur de gebruiker naar de homepage
        } else {
          this.error = 'Inloggen mislukt: geen token ontvangen.';
        }
      } catch (error) {
        console.error('Login error:', error.response?.data || error);
        this.error = error.response?.data?.error || 'Inloggen mislukt. Controleer je gegevens.';
      }
    },
  },
};
</script>
