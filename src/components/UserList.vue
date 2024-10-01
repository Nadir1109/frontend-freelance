<template>
  <div>
    <h2>Gebruikerslijst</h2>
    <table class="user-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Gebruikersnaam</th>
        <th>E-mail</th>
        <th>Acties</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>
          <router-link :to="'/edit/' + user.id">
            <button>Bewerken</button>
          </router-link>
          <button class="delete" @click="deleteUser(user.id)">Verwijderen</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Er is iets misgegaan bij het ophalen van de gebruikers.', error);
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`/api/users/${id}`);
        this.fetchUsers();
      } catch (error) {
        console.error('Er is iets misgegaan bij het verwijderen van de gebruiker.', error);
      }
    }
  }
};
</script>
