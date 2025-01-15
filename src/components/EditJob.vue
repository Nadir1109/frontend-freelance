<template>
  <div class="edit-page-container" data-testid="edit-page-container">
    <!-- Terug knop als afbeelding met tekst -->
    <div class="back-button-container" @click="goBack" data-testid="back-button-container">
      <img
          src="@/assets/img/back-arrow.png"
          alt="Terug"
          class="back-button"
          data-testid="back-button"
      />
      <span class="back-button-text" data-testid="back-button-text">Ga terug naar alle opdrachten</span>
    </div>

    <h1 data-testid="edit-job-title">Job Bewerken</h1>
    <form @submit.prevent="updateJob" data-testid="edit-job-form">
      <div data-testid="title-field">
        <label for="title" data-testid="title-label">Titel:</label>
        <input
            id="title"
            v-model="job.title"
            type="text"
            maxlength="40"
            required
            placeholder="Maximaal 40 karakters"
            data-testid="title-input"
        />
      </div>

      <div data-testid="budget-field">
        <label for="budget" data-testid="budget-label">Budget:</label>
        <input
            id="budget"
            v-model.number="job.budget"
            type="number"
            min="1"
            step="1"
            required
            data-testid="budget-input"
        />
      </div>

      <div data-testid="deadline-field">
        <label for="deadline" data-testid="deadline-label">Deadline:</label>
        <input
            id="deadline"
            v-model="job.deadline"
            type="date"
            :min="today"
            required
            data-testid="deadline-input"
        />
      </div>

      <div data-testid="description-field">
        <label for="description" data-testid="description-label">Beschrijving:</label>
        <textarea
            id="description"
            v-model="job.description"
            rows="5"
            required
            data-testid="description-input"
        ></textarea>
      </div>

      <button type="submit" class="save-button" data-testid="edited-save-button">Opslaan</button>
    </form>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js";
import { useToast } from "vue-toastification"; // Zorg dat Vue Toastification is geïnstalleerd

export default {
  data() {
    return {
      job: {
        title: "",
        budget: 0,
        deadline: "",
        description: ""
      },
      today: new Date().toISOString().split("T")[0], // Alleen toekomstgerichte datums
      toast: useToast(),
    };
  },
  mounted() {
    const jobId = this.$route.params.id; // Haal ID van route op
    axios
        .get(`/jobs/${jobId}`)
        .then(response => {
          this.job = response.data;
          this.job.deadline = this.job.deadline.split("T")[0]; // Formatteer de datum naar enkel de dag
        })
        .catch(error => {
          console.error("Fout bij het ophalen van de job!", error);
        });
  },
  methods: {
    updateJob() {
      axios
          .put(`/jobs/${this.job.id}`, this.job)
          .then(() => {
            this.toast.success("Job succesvol bijgewerkt!"); // Gebruik een toast in plaats van een alert
            this.$router.push("/jobs"); // Ga terug naar de lijstweergave
          })
          .catch(error => {
            console.error("Fout bij het bijwerken van de job!", error);
            this.toast.error("Er is een fout opgetreden. Controleer de invoer en probeer opnieuw.");
          });
    },
    goBack() {
      this.$router.go(-1); // Hiermee ga je één stap terug in de browsergeschiedenis
    }
  }
};
</script>

<style scoped>
.edit-page-container {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form div {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

textarea {
  resize: none;
}

.save-button {
  display: block;
  width: 100%;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.save-button:hover {
  background-color: #388e3c;
}

/* Nieuwe styling voor de terug-knop */
.back-button-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
}

.back-button {
  width: 30px; /* Vergrote afbeelding */
  height: 30px;
  object-fit: contain;
  margin-right: 10px;
}

.back-button-text {
  font-size: 1.2rem;
  color: #007bff;
  font-weight: bold;
}

.back-button-container:hover .back-button-text {
  text-decoration: underline;
}
</style>
