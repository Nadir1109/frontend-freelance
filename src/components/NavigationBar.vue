<template>
  <nav class="navbar">
    <div class="nav-container">
      <a href="#" class="nav-logo">Mijn Platform</a>
      <button class="hamburger" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <ul :class="['nav-menu', { 'nav-menu-active': isMenuActive }]">
        <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
        <li class="nav-item"><router-link to="/about" class="nav-link">Over</router-link></li>
        <li class="nav-item"><router-link to="/contact" class="nav-link">Contact</router-link></li>
        <li class="nav-item"><router-link to="/users" class="nav-link">Gebruikers</router-link></li>

        <!-- Toon Register en Login alleen als de gebruiker NIET is ingelogd -->
        <li class="nav-item" v-if="!isLoggedIn"><router-link to="/register" class="nav-link">Register</router-link></li>
        <li class="nav-item" v-if="!isLoggedIn"><router-link to="/login" class="nav-link">Login</router-link></li>

        <!-- Toon Profiel en Uitloggen alleen als de gebruiker WEL is ingelogd -->
        <li class="nav-item" v-if="isLoggedIn"><router-link to="/profile" class="nav-link">Profiel</router-link></li>
        <li class="nav-item" v-if="isLoggedIn"><a href="#" @click="logout" class="nav-link">Uitloggen</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuActive: false,
      isLoggedIn: false  // Beheer de inlogstatus
    };
  },
  mounted() {
    this.checkLoginStatus();  // Controleer de inlogstatus bij het laden van de navigatie
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('authToken');  // Update inlogstatus gebaseerd op localStorage token
    },
    logout() {
      localStorage.removeItem('authToken');  // Verwijder de token bij uitloggen
      this.isLoggedIn = false;
      this.$router.push('/login');  // Redirect naar de loginpagina
    }
  },
  watch: {
    // Om ervoor te zorgen dat de navigatiebalk dynamisch wordt bijgewerkt wanneer de gebruiker inlogt of uitlogt
    '$route'() {
      this.checkLoginStatus();  // Hercontroleer de inlogstatus bij elke routewissel
    }
  }
};
</script>
