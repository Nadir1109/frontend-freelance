<template>
  <div class="add-job-container">
    <h1>Nieuwe Job Toevoegen</h1>
    <form @submit.prevent="submitJob">
      <label for="title">Titel:</label>
      <input type="text" v-model="job.title" id="title" required>

      <label for="budget">Budget:</label>
      <input type="number" v-model="job.budget" id="budget" required>

      <label for="deadline">Deadline:</label>
      <input type="date" v-model="job.deadline" id="deadline" required>

      <label for="description">Beschrijving:</label>
      <textarea v-model="job.description" id="description" required></textarea>

      <button type="submit">Job Toevoegen</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      job: {
        title: '',
        budget: '',
        deadline: '',
        description: ''
      }
    };
  },
  methods: {
    submitJob() {
      axios.post('http://localhost:8080/api/jobs/create', this.job)
          .then(response => {
            alert('Job succesvol toegevoegd!');
            this.$router.push('/'); // Verwijst terug naar de jobs-pagina
          })
          .catch(error => {
            console.error("Er is een fout opgetreden bij het toevoegen van de job!", error);
          });
    }
  }
};
</script>

<style>
.add-job-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input, textarea, button {
  width: 100%;
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
