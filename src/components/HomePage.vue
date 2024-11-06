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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      userEmail: '',
      userRole: ''
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.userName && !!this.userRole && !!this.userEmail;
    }
  },
  mounted() {
    // Haal gegevens op uit localStorage wanneer de component wordt geladen
    this.userName = localStorage.getItem('name') || '';
    this.userEmail = localStorage.getItem('email') || '';
    this.userRole = localStorage.getItem('role') || '';
  }
};
</script>

<style scoped>
/* Voeg hier je eigen styling toe */
</style>
