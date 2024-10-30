<template>
  <div class="users-view">
    <h1>Gebruikerslijst</h1>
    <div class="table-container"> <!-- Container voor scrollbare tabel -->
      <table class="users-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Gebruikersnaam</th>
          <th>Email</th>
          <th>Acties</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ user.id }}</td>

          <!-- Inline bewerken: Username -->
          <td>
            <input v-if="editingIndex === index" v-model="editUserData.username" />
            <span v-else>{{ user.username }}</span>
          </td>

          <!-- Inline bewerken: Email -->
          <td>
            <input v-if="editingIndex === index" v-model="editUserData.email" />
            <span v-else>{{ user.email }}</span>
          </td>

          <td>
            <button v-if="editingIndex === index" @click="saveUser(user.id)" class="save-btn">Opslaan</button>
            <button v-else @click="editUser(index, user)" class="edit-btn">Bewerken</button>
            <button @click="deleteUser(user.id)" class="delete-btn">Verwijderen</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsersView",
  data() {
    return {
      users: [], // Hier worden de gebruikers opgeslagen
      editingIndex: null, // Houdt bij welk rijnummer momenteel wordt bewerkt
      editUserData: { username: '', email: '' }, // Data die wordt bewerkt
    };
  },
  methods: {
    fetchUsers() {
      // Haal de gebruikers op via de API
      fetch("http://localhost:8080/api/user") // Pas de URL aan naar jouw backend API
          .then(response => response.json())
          .then(data => {
            this.users = data; // Sla de gebruikers op in de data
          })
          .catch(error => {
            console.error("Error fetching users:", error);
          });
    },
    editUser(index, user) {
      // Stel de huidige index in op de bewerkmodus en vul de velden
      this.editingIndex = index;
      this.editUserData = { username: user.username, email: user.email };
    },
    saveUser(id) {
      // API-aanroep om de gebruiker bij te werken
      fetch(`http://localhost:8080/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.editUserData),
      })
          .then(() => {
            this.users[this.editingIndex].username = this.editUserData.username;
            this.users[this.editingIndex].email = this.editUserData.email;
            this.editingIndex = null; // Stop met bewerken
          })
          .catch(error => {
            console.error("Error saving user:", error);
          });
    },
    deleteUser(id) {
      // Verwijder de gebruiker via de API en werk de lijst bij
      if (confirm("Weet je zeker dat je deze gebruiker wilt verwijderen?")) {
        fetch(`http://localhost:8080/api/user/${id}`, {
          method: "DELETE",
        })
            .then(() => {
              this.fetchUsers(); // Vernieuw de lijst met gebruikers na het verwijderen
            })
            .catch(error => {
              console.error("Error deleting user:", error);
            });
      }
    },
  },
  created() {
    // Haal de gebruikers op zodra de component wordt geladen
    this.fetchUsers();
  },
};
</script>

<style scoped>
.table-container {
  overflow-x: auto; /* Maakt de tabel horizontaal scrollbaar indien nodig */
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.users-table th, .users-table td {
  border: 1px solid #ddd;
  padding: 10px; /* Verminderde padding voor meer ruimte */
  text-align: left;
  white-space: nowrap; /* Voorkomt dat tekst naar de volgende regel gaat */
}

.users-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.users-table td {
  word-wrap: break-word; /* Voorkomt te brede tekst in cellen */
}

.edit-btn, .delete-btn, .save-btn {
  padding: 8px 15px;
  margin-right: 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.edit-btn {
  background-color: #4CAF50;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.save-btn {
  background-color: #2196F3;
  color: white;
}

.edit-btn:hover {
  background-color: #45a049;
}

.delete-btn:hover {
  background-color: #e31e0f;
}

.save-btn:hover {
  background-color: #0b7dda;
}
</style>
