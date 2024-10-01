<template>
  <div id="app">
    <NavigationBar />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: "App",
  components: {
    NavigationBar
  }
};
</script>
