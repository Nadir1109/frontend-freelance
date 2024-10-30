<template>
  <div class="edit-page-container">
    <h1>Job Bewerken</h1>
    <form @submit.prevent="updateJob">
      <div>
        <label>Titel:</label>
        <input v-model="job.title" type="text" required />
      </div>
      <div>
        <label>Budget:</label>
        <input v-model="job.budget" type="number" required />
      </div>
      <div>
        <label>Deadline:</label>
        <input v-model="job.deadline" type="date" required />
      </div>
      <div>
        <label>Beschrijving:</label>
        <textarea v-model="job.description"></textarea>
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
      }
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
