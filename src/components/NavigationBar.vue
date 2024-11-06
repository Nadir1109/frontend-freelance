<template>
  <nav class="navbar">
    <div class="nav-container">
      <a href="#" class="nav-logo">Freelance-Platform</a>
      <button class="hamburger" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <ul :class="['nav-menu', { 'nav-menu-active': isMenuActive }]">
        <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
        <li class="nav-item"><router-link to="/jobs" class="nav-link">Opdrachten</router-link></li>
        <li class="nav-item" v-if="!isLoggedIn"><router-link to="/login" class="nav-link">Login</router-link></li>
        <li class="nav-item" v-if="isLoggedIn"><a @click="logout" class="nav-link">Logout</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuActive: false,
      isLoggedIn: !!localStorage.getItem('authToken') // Check of de gebruiker is ingelogd
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    logout() {
      localStorage.removeItem('authToken');
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
