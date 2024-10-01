<template>
  <div>
    <h2>Registreer een nieuwe gebruiker</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Gebruikersnaam</label>
        <input type="text" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" v-model="email" required />
      </div>
      <button type="submit">Registreer</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  name: "Register",
  data() {
    return {
      username: '',
      email: '',
      message: null
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('/users/register', {
          username: this.username,
          email: this.email
        });
        this.message = 'Gebruiker succesvol geregistreerd!';
      } catch (error) {
        this.message = 'Er is iets misgegaan bij het registreren.';
      }
    }
  }
};
</script>
