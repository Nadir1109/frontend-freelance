<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Freelance-Platform logo link aan de linkerkant -->
      <a href="/" class="nav-logo">Freelance-Platform</a>

      <!-- Navigation items - toegevoegd aan de rechterkant -->
      <div class="nav-links">
        <router-link to="/jobs" class="nav-link">Opdrachten</router-link>
        <router-link to="/profile" class="nav-link">Profiel</router-link>
        <router-link to="/settings" class="nav-link">Instellingen</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Login</router-link>
        <a v-if="isLoggedIn" @click="logout" class="nav-link-logout">Uitloggen</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('authToken') // Check if the user is logged in
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  },
  watch: {
    '$route'() {
      this.isLoggedIn = !!localStorage.getItem('authToken');
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #007bff;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.nav-logo {
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-link {
  color: #ecf0f1; /* Lichtgrijs voor de tekst */
  text-decoration: none;
  font-size: 1.1rem;
}

.nav-link:hover {
  text-decoration: underline;
}

 .nav-link-logout {
  background-color: #E74C3C; /* Rood-oranje */
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-decoration: none;
  display: inline-block;
}

.nav-link-logout:hover {
  background-color: #C0392B; /* Donkerder bij hover */
  transform: scale(1.05);
}
.nav-link-logout:active
{
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .nav-links.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #2980b9; /* Donkerblauw voor mobiele versie */
    width: 200px;
    padding: 20px;
  }
}
</style>
