<template>
  <div class="form-wrapper">
    <form class="registration-form" @submit.prevent="submitForm">
      <h1>Maak een account aan</h1>

      <label for="username">Gebruikersnaam</label>
      <input type="text" v-model="username" id="username" placeholder="Vul je gebruikersnaam in" required>

      <label for="email">E-mail</label>
      <input type="email" v-model="email" id="email" placeholder="Vul je e-mail in" required>

      <label for="password">Wachtwoord</label>
      <input type="password" v-model="password" id="password" placeholder="Vul je wachtwoord in" required>

      <label for="confirm-password">Herhaal Wachtwoord</label>
      <input type="password" v-model="confirmPassword" id="confirm-password" placeholder="Herhaal wachtwoord" required>

      <button type="submit">Registreren</button>

      <!-- Succes- en foutmeldingen -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

      <p>Heb je al een account? <a href="#">Log hier in</a>.</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async submitForm() {
      // Valideer of wachtwoord en herhaal wachtwoord hetzelfde zijn
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Wachtwoorden komen niet overeen.";
        this.successMessage = '';
        return;
      }

      // API-aanroep om de registratie te verwerken
      try {
        const response = await axios.post('http://localhost:8080/api/users/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });

        // Als het succesvol is, leeg de velden en toon een succesbericht
        this.successMessage = 'Registratie succesvol!';
        this.errorMessage = '';
        this.clearFields();  // Velden leegmaken
      } catch (error) {
        this.errorMessage = 'Er is iets misgegaan bij het registreren. Probeer opnieuw.';
        this.successMessage = '';
        console.error(error);
      }
    },
    clearFields() {
      // Alle velden leegmaken na een succesvolle registratie
      this.username = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    }
  }
};
</script>


