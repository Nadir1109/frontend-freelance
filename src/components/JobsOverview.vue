<template>
  <div class="page-container">
    <h1 class="title">Available Jobs</h1>
    <button v-if="isClient" @click="goToAddJobPage" class="add-job-button">Nieuwe Job Toevoegen</button>
    <div class="jobs-container">
      <div v-for="job in jobs" :key="job.id" class="job-card">
        <h2>{{ job.title }}</h2>
        <p><strong>Budget:</strong> ${{ job.budget }}</p>
        <p><strong>Deadline:</strong> {{ new Date(job.deadline).toLocaleDateString() }}</p>
        <p>{{ job.description }}</p>

        <!-- Alleen opdrachtgevers zien bewerken en verwijderen -->
        <button v-if="isClient && job.ownerId === userId" @click="goToEditJobPage(job.id)" class="edit-job-button">Job Bewerken</button>
        <button v-if="isClient && job.ownerId === userId" @click="deleteJob(job.id)" class="delete-job-button">Verwijder Job</button>

        <!-- Freelancers kunnen reageren -->
        <button v-if="isFreelancer" @click="respondToJob(job.id)" class="respond-job-button">Reageer op Job</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      jobs: [],
      userId: localStorage.getItem('userId'), // Zorg ervoor dat dit wordt opgeslagen bij inloggen
      userRole: localStorage.getItem('role')
    };
  },
  computed: {
    isClient() {
      return this.userRole === 'CLIENT';
    },
    isFreelancer() {
      return this.userRole === 'FREELANCER';
    }
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
    },
    respondToJob(jobId) {
      // Hier zou je de code kunnen toevoegen om een reactie op een job te sturen.
      axios.post(`http://localhost:8080/api/jobs/${jobId}/responses`, {
        freelancerId: this.userId
      })
          .then(() => {
            alert("Je reactie is verstuurd!");
          })
          .catch(error => {
            console.error("Er was een fout bij het reageren op de job!", error);
          });
    }
  }
};
</script>

<style>
/* Style blijft hetzelfde */
</style>
