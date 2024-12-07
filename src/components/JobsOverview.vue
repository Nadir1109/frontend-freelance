<template>
  <div class="page-container">
    <h1 class="title">Available Jobs</h1>

    <!-- Plus icon to add new job -->
    <div v-if="isClient" class="add-job-container" @click="goToAddJobPage">
      <img src="@/assets/img/plus-icon.png" alt="Add Job" class="add-job-icon" />
      <span class="add-job-text">Nieuwe Job Toevoegen</span>
    </div>

    <div class="jobs-container">
      <div v-for="job in jobs" :key="job.id" class="job-card">
        <!-- Bewerk icoon alleen tonen als ingelogde gebruiker de eigenaar is -->
        <div
            v-if="job.userEmail === loggedInUserEmail"
            class="edit-icon"
            @click="goToEditJobPage(job.id)"
        >
          ✏️
        </div>
        <h2>{{ job.title }}</h2>
        <p><strong>Budget:</strong> ${{ job.budget }}</p>
        <p><strong>Deadline:</strong> {{ new Date(job.deadline).toLocaleDateString() }}</p>
        <p>{{ job.description }}</p>
        <p><strong>Gemaakt door:</strong> {{ job.userName }} ({{ job.userEmail }})</p>
        <button class="more-info-button" @click="showJobDetails(job.id)">
          Meer Informatie
        </button>
        <button
            v-if="!isClient"
            class="respond-job-button"
            @click="respondToJob(job.id)"
        >
          Reageer op Job
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/plugins/axios.js";

export default {
  data() {
    return {
      jobs: [],
      loggedInUserEmail: localStorage.getItem("userEmail"), // Haal ingelogde gebruiker op
      isClient: localStorage.getItem("userRole") === "CLIENT", // Controleer of de gebruiker een client is
    };
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    fetchJobs() {
      axios
          .get("/jobs")
          .then((response) => {
            this.jobs = response.data; // Jobs ophalen vanuit de backend
          })
          .catch((error) => {
            console.error("Er was een fout bij het ophalen van de jobs!", error);
          });
    },
    goToAddJobPage() {
      if (this.isClient) {
        this.$router.push("/add-job");
      } else {
        alert("Alleen clients mogen jobs toevoegen.");
      }
    },
    goToEditJobPage(jobId) {
      const job = this.jobs.find((job) => job.id === jobId);

      // Controleer of de ingelogde gebruiker de eigenaar van de job is
      if (job.userEmail === this.loggedInUserEmail) {
        this.$router.push(`/jobs/${jobId}/edit`);
      } else {
        alert("Je mag alleen je eigen jobs bewerken.");
      }
    },
    showJobDetails(jobId) {
      console.log(`Toon details voor job met ID: ${jobId}`);
    },
    respondToJob(jobId) {
      console.log(`Reageer op job met ID: ${jobId}`);
    },
  },
};
</script>
<style>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.add-job-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
}

.add-job-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-right: 10px;
}

.add-job-text {
  font-size: 1.2rem;
  color: #007bff;
  font-weight: bold;
}

.add-job-container:hover .add-job-text {
  text-decoration: underline;
}

.jobs-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.job-card {
  width: 30%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  background: #fff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 1.2rem;
}

.more-info-button,
.respond-job-button {
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.more-info-button {
  background-color: #007bff;
  color: white;
}

.more-info-button:hover {
  background-color: #0056b3;
}

.respond-job-button {
  background-color: #28a745;
  color: white;
}

.respond-job-button:hover {
  background-color: #1c7c31;
}
</style>
