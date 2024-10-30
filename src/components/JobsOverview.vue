<template>
  <div class="page-container">
    <h1 class="title">Available Jobs</h1>
    <button @click="goToAddJobPage" class="add-job-button">Nieuwe Job Toevoegen</button>
    <div class="jobs-container">
      <div v-for="job in jobs" :key="job.id" class="job-card">
        <h2>{{ job.title }}</h2>
        <p><strong>Budget:</strong> ${{ job.budget }}</p>
        <p><strong>Deadline:</strong> {{ new Date(job.deadline).toLocaleDateString() }}</p>
        <p>{{ job.description }}</p>
        <button @click="goToEditJobPage(job.id)" class="edit-job-button">Job Bewerken</button>
        <button @click="deleteJob(job.id)" class="delete-job-button">Verwijder Job</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      jobs: []
    };
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    fetchJobs() {
      axios.get('http://localhost:8080/api/jobs')
          .then(response => {
            this.jobs = response.data;
          })
          .catch(error => {
            console.error("Er was een fout bij het ophalen van de jobs!", error);
          });
    },
    goToAddJobPage() {
      this.$router.push('/add-job');
    },
    goToEditJobPage(jobId) {
      this.$router.push(`/jobs/${jobId}/edit`);
    },
    deleteJob(jobId) {
      axios.delete(`http://localhost:8080/api/jobs/${jobId}`)
          .then(() => {
            this.jobs = this.jobs.filter(job => job.id !== jobId);
          })
          .catch(error => {
            console.error("Er was een fout bij het verwijderen van de job!", error);
          });
    }
  }
};
</script>

<style>
.page-container {
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 2em;
  margin-bottom: 20px;
}

.add-job-button, .edit-job-button, .delete-job-button {
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

.add-job-button {
  background-color: #007bff;
}

.edit-job-button {
  background-color: #ffc107;
}

.delete-job-button {
  background-color: #d9534f;
}

.jobs-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.job-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
