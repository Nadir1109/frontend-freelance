<template>
  <div class="register-container">
    <h2 class="form-title">Maak je account aan.</h2>
    <form @submit.prevent="registerUser" class="register-form">
      <div class="form-group">
        <label for="name">Naam:</label>
        <input
            type="text"
            v-model="userData.name"
            id="name"
            placeholder="vul je volledige naam in"
            data-testid="name-input"
            required
        />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
            type="email"
            v-model="userData.email"
            id="email"
            placeholder="vul een geldig emailadres in"
            data-testid="email-input"
            required
        />
      </div>
      <div class="form-group">
        <label for="password">Wachtwoord:</label>
        <input
            type="password"
            v-model="userData.password"
            id="password"
            placeholder="voer een veilig wachtwoord in"
            data-testid="password-input"
            required
        />
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <select
            v-model="userData.role"
            id="role"
            data-testid="role-input"
            required
        >
          <option value="CLIENT">Client</option>
          <option value="FREELANCER">Freelancer</option>
        </select>
      </div>
      <button type="submit" class="register-button" data-testid="register-button">
        Registeren
      </button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from '@/plugins/axios.js';

export default {
  data() {
    return {
      userData: {
        name: '',
        email: '',
        password: '',
        role: 'CLIENT', // Default role
      },
      message: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('/auth/register', JSON.stringify(this.userData), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 201 || response.status === 200) {
          this.message = 'Registration successful! Redirecting to home...';
          setTimeout(() => {
            this.$router.push('/');
          }, 2000);
        } else {
          this.message = 'Registration failed. Please try again.';
        }
      } catch (error) {
        console.error(error);
        this.message = 'An error occurred. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.register-form .form-group {
  margin-bottom: 20px;
}

.register-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.register-form input,
.register-form select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.register-form input:focus,
.register-form select:focus {
  border-color: #007bff;
  outline: none;
}

.register-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 20px;
  text-align: center;
  color: green;
  font-weight: bold;
}

@media (max-width: 768px) {
  .register-container {
    padding: 15px;
  }

  .form-title {
    font-size: 1.5rem;
  }

  .register-button {
    font-size: 1rem;
  }
}
</style>
