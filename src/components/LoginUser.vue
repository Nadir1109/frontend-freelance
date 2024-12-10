<template>
  <div id="app">
    <div class="loginBox">
      <h1 class="title">Inloggen</h1>
      <form @submit.prevent="onSubmit">
        <div class="form">
          <input
              type="email"
              v-model="email"
              placeholder="Email"
              required
              class="input-field"
          />
          <input
              type="password"
              v-model="password"
              placeholder="Wachtwoord"
              required
              class="input-field"
          />
        </div>
        <button type="submit" class="submit-button">Inloggen</button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await axios.post('/auth/login', {
          email: this.email,
          password: this.password,
        });

        if (response.data.token && response.data.role) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('userRole', response.data.role);
          localStorage.setItem('userEmail', response.data.email);
          this.$router.push('/jobs');
        } else {
          this.error = 'Ongeldige inloggegevens. Controleer je gegevens en probeer het opnieuw.';
        }
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.error || 'Inloggen mislukt. Controleer je gegevens.';
        } else {
          this.error = 'Er is een onbekende fout opgetreden.';
        }
      }
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, rgba(96, 108, 136, 1) 0%, rgba(63, 76, 107, 1) 100%);
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.loginBox {
  background: #fff;
  border-radius: 15px;
  max-width: 400px;
  width: 100%;
  padding: 25px;
  animation: slideInTop 1s;
}

h1.title {
  text-align: center;
  margin-bottom: 20px;
}

.form {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}

@keyframes slideInTop {
  from {
    opacity: 0;
    transform: translateY(-30%);
  }

  to {
    opacity: 100;
    transform: translateY(0%);
  }
}
</style>
