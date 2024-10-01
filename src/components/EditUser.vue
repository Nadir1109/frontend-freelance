<template>
  <div>
    <h2>Bewerk gebruiker</h2>
    <form @submit.prevent="submitEditForm">
      <div class="form-group">
        <label for="username">Gebruikersnaam</label>
        <input type="text" v-model="user.username" required />
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" v-model="user.email" required />
      </div>
      <button type="submit">Opslaan</button>
    </form>
  </div>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  name: "EditUser",
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      const userId = this.$route.params.id;
      try {
        const response = await axios.get(`/api/users/${userId}`);
        this.user = response.data;
      } catch (error) {
        console.error('Er is iets misgegaan bij het ophalen van de gebruiker.', error);
      }
    },
    async submitEditForm() {
      const userId = this.$route.params.id;
      try {
        await axios.put(`/api/users/${userId}`, this.user);
        this.$router.push({ name: 'UserList' });
      } catch (error) {
        console.error('Er is iets misgegaan bij het bewerken van de gebruiker.', error);
      }
    }
  }
};
</script>
