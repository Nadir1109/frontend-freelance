<template>
  <div>
    <h2>User Login</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="userData.email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="userData.password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        email: '',
        password: ''
      },
      message: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.userData)
        });
        if (response.ok) {
          const data = await response.json();
          this.message = 'Login successful!';

          // Sla de gebruiker of token op in localStorage voor sessiebeheer
          localStorage.setItem('authToken', data.token || "dummyToken");

          // Navigeer naar de homepage
          this.$router.push('/');
        } else {
          this.message = 'Login failed. Please check your credentials.';
        }
      } catch (error) {
        console.error(error);
        this.message = 'An error occurred. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
/* Voeg hier je eigen styling toe */
</style>
