<template>
  <div>
    <h2>User Registration</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="userData.name" data-testid="name-input" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="userData.email" data-testid="email-input" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="userData.password" data-testid="password-input" required />
      </div>
      <div>
        <label for="role">Role:</label>
        <select v-model="userData.role" data-testid="role-input" required>
          <option value="CLIENT">Client</option>
          <option value="FREELANCER">Freelancer</option>
        </select>
      </div>
      <button type="submit" data-testid="register-button">Register</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        name: '',
        email: '',
        password: '',
        role: 'CLIENT', // Standaardwaarde is CLIENT
      },
      message: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.userData),
        });
        if (response.ok) {
          this.message = 'Registration successful!';
          this.$router.push('/');
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
/* Voeg je eigen styling toe hier */
</style>
