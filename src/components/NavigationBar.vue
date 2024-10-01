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

<style scoped>
.navbar {
  background-color: #333;
  padding: 15px;
  color: white;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 24px;
  color: white;
  text-decoration: none;
}

.navbar-nav {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.navbar-nav a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.navbar-nav a:hover {
  color: #FF5722;
}
</style>
