<template>
  <div class="edit-page-container">
    <h1>Job Bewerken</h1>
    <form @submit.prevent="updateJob">
      <div>
        <label>Titel:</label>
        <input
            v-model="job.title"
            type="text"
            maxlength="40"
            required
            placeholder="Maximaal 40 karakters"
        />
      </div>

      <div>
        <label>Budget:</label>
        <input
            v-model.number="job.budget"
            type="number"
            min="0"
            step="1"
            required
        />
      </div>

      <div>
        <label>Deadline:</label>
        <input
            v-model="job.deadline"
            type="date"
            :min="today"
            required
        />
      </div>

      <div>
        <label>Beschrijving:</label>
        <textarea v-model="job.description" required></textarea>
      </div>

      <button type="submit" class="save-button">Opslaan</button>
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
        budget: 0,
        deadline: '',
        description: ''
      },
      today: new Date().toISOString().split('T')[0] // Alleen toekomstgerichte datums
    };
  },
  mounted() {
    const jobId = this.$route.params.id;
    axios.get(`http://localhost:8080/api/jobs/${jobId}`)
        .then(response => {
          this.job = response.data;
        })
        .catch(error => {
          console.error("Fout bij het ophalen van de job!", error);
        });
  },
  methods: {
    updateJob() {
      axios.put(`http://localhost:8080/api/jobs/${this.job.id}`, this.job)
          .then(() => {
            this.$router.push('/jobs');
          })
          .catch(error => {
            console.error("Fout bij het bijwerken van de job!", error);
          });
    }
  }
};
</script>

<style>
.edit-page-container {
  padding: 20px;
  text-align: center;
}

form div {
  margin-bottom: 15px;
}

.save-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #388E3C;
}
</style>
