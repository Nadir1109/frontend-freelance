<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-left">
        <a href="/" class="nav-logo">Freelance-Platform</a>
        <router-link to="/jobs" class="nav-link">Opdrachten</router-link>
        <router-link to="/profile" class="nav-link">Profiel</router-link>
        <router-link to="/settings" class="nav-link">Instellingen</router-link>
      </div>
      <div class="nav-right">
        <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Login</router-link>
        <router-link v-if="!isLoggedIn" to="/register" class="nav-link">Registeren</router-link>
        <a v-if="isLoggedIn" @click="logout" class="nav-link logout">Uitloggen</a>
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
  background-color: #0070cc; /* Coolblue blauw */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.nav-left {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-right {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-logo {
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  background-color: #3ba1f5;
  color: black;/* Oranje bij hover */

}

.logout {
  background-color: #0070cc; /* Oranje */
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-decoration: none;
  cursor: pointer;
}

.logout:hover {
  background-color: lightcyan; /* Donkerder oranje bij hover */
  transform: scale(1.05);
}

.logout:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .nav-left, .nav-right {
    display: none;
  }

  .nav-left.active, .nav-right.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #0070cc; /* Blauw voor mobiele versie */
    width: 100%;
    padding: 20px;
  }
}
</style>
