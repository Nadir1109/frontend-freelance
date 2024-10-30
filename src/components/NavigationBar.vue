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
        <li class="nav-item"><router-link to="/about" class="nav-link">Over</router-link></li>
        <li class="nav-item"><router-link to="/contact" class="nav-link">Contact</router-link></li>
        <li class="nav-item"><router-link to="/jobs" class="nav-link">Opdrachten</router-link></li>
        <li class="nav-item"><router-link to="/users" class="nav-link">Gebruikers</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuActive: false,
      isLoggedIn: false
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('authToken');
    },
    logout() {
      localStorage.removeItem('authToken');
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  },
  watch: {

    '$route'() {
      this.checkLoginStatus();
    }
  }
};
</script>
