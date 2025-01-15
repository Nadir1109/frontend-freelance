<template>
  <div class="home-page">
    <header class="header">
      <h1>Welkom op het Freelance Platform!</h1>
      <p>Het platform waar talent en kansen elkaar ontmoeten.</p>
    </header>

    <section class="welcome-section" v-if="!isLoggedIn">
      <div class="welcome-content">
        <h2>Waarom Freelance Platform?</h2>
        <ul class="features-list">
          <li><strong>Eenvoudig:</strong> Plaats en beheer opdrachten met gemak.</li>
          <li><strong>Betrouwbaar:</strong> Werk samen met gescreende professionals.</li>
          <li><strong>Flexibel:</strong> Vind opdrachten of freelancers op jouw voorwaarden.</li>
        </ul>
        <button @click="redirectToLogin" class="cta-button">Inloggen</button>
      </div>
      <img src="../assets/img/freelance-collab.jpeg" alt="Freelancers collaborating" class="welcome-image" />
    </section>

    <section v-if="isLoggedIn" class="redirect-section">
      <h1>Je bent al ingelogd!</h1>
      <p>We sturen je door naar de opdrachtenpagina.</p>
    </section>

    <footer class="footer">
      <div class="footer-links">
        <a href="/about">Over ons</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacybeleid</a>
      </div>
      <p>&copy; 2025 Freelance Platform. Alle rechten voorbehouden.</p>
    </footer>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js";
import NotificationBox from "@/components/NotificationBox.vue";
import { useToast } from "vue-toastification";

export default {
  components: {
    NotificationBox,
  },
  data() {
    return {
      userName: "",
      userEmail: "",
      userRole: "",
      isLoggedIn: false,
      toast: useToast(),
    };
  },
  methods: {
    redirectToLogin() {
      this.$router.push("/login");
    },
    redirectToRegister() {
      this.$router.push("/register");
    },
    redirectToJobs() {
      this.$router.push("/jobs");
    },
    async fetchUserInfo() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          this.isLoggedIn = false;
          return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get("/auth/me");
        const data = response.data;

        this.userName = data.name || "Onbekend";
        this.userEmail = data.email || "Onbekend";
        this.userRole = data.role || "Onbekend";
        this.isLoggedIn = true;

        this.toast.success("Je bent al ingelogd! Je wordt doorgestuurd naar de opdrachtenpagina.");
        setTimeout(() => {
          this.redirectToJobs();
        }, 2000);
      } catch (error) {
        console.error("Fout bij ophalen gebruikersinfo:", error);
        this.isLoggedIn = false;
      }
    },
  },
  mounted() {
    this.fetchUserInfo();
  },
  watch: {
    "$route"(to, from) {
      if (to.name === "Home") {
        this.fetchUserInfo();
      }
    },
  },
};
</script>

<style scoped>
.home-page {
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.8rem;
  color: #0070cc;
  margin-bottom: 10px;
}

.header p {
  font-size: 1.2rem;
  color: #555;
}

.welcome-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #0070cc, #0056a3);
  color: white;
  padding: 40px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.welcome-content {
  max-width: 50%;
}

.features-list {
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
}

.features-list li {
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.welcome-image {
  max-width: 40%;
  border-radius: 10px;
}

.cta-button {
  background-color: #ff8800;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #cc6e00;
}

.redirect-section {
  text-align: center;
  padding: 40px;
  background-color: #f1f1f1;
  border-radius: 10px;
}

.redirect-section h1 {
  font-size: 2rem;
  color: #0070cc;
}

.redirect-section p {
  font-size: 1.2rem;
  color: #333;
}

.footer {
  margin-top: 40px;
  text-align: center;
  background-color: #333;
  color: white;
  padding: 20px;
  border-radius: 10px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
}

.footer-links a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #ff8800;
}
</style>
