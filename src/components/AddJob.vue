<template>
  <div class="add-job-container">

    <form @submit.prevent="submitJob">
      <div class="form-group">
        <label for="title">Titel:</label>
        <input
            type="text"
            v-model="job.title"
            maxlength="40"
            id="title"
            required
            placeholder="Maximaal 40 karakters"
        />
      </div>

      <div class="form-group">
        <label for="budget">Budget:</label>
        <input
            type="number"
            v-model.number="job.budget"
            min="0"
            step="1"
            id="budget"
            required
        />
      </div>

      <div class="form-group">
        <label for="deadline">Deadline:</label>
        <input
            type="date"
            v-model="job.deadline"
            :min="today"
            id="deadline"
            required
        />
      </div>

      <div class="form-group">
        <label for="description">Beschrijving:</label>
        <textarea v-model="job.description" id="description" required placeholder="Voeg een omschrijving toe..."></textarea>
      </div>

      <button type="submit" class="submit-button">Job Toevoegen</button>
    </form>
  </div>
</template>

<script>
import axios from '@/plugins/axios.js'; // Gebruik je axios-configuratie

export default {
  data() {
    return {
      job: {
        title: '',
        budget: '',
        deadline: '',
        description: ''
      },
      today: new Date().toISOString().split('T')[0] // Alleen toekomstgerichte datums
    };
  },
  methods: {
    async submitJob() {
      try {
        const response = await axios.post('/jobs', this.job);
        alert('Job succesvol toegevoegd!');
        this.$router.push('/jobs'); // Ga naar de jobs-overzichtspagina (aanpassen naar jouw route)
      } catch (error) {
        console.error("Er is een fout opgetreden bij het toevoegen van de job!", error);
        alert('Er is iets misgegaan. Controleer de invoer en probeer opnieuw.');
      }
    }
  }
};
</script>

<style>
.add-job-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.page-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

input, textarea {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus {
  border-color: #007bff;
  outline: none;
}

textarea {
  resize: vertical;
  height: 120px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #388e3c;
}
</style>
