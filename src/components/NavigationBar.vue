<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">Mijn Platform</router-link>
      <ul class="navbar-nav">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">Over</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/users">Gebruikers</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
};
</script>

