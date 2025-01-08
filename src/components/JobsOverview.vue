<template>
  <div class="page-container">
    <h1 class="title" data-testid="page-title">Openstaande Opdrachten</h1>

    <!-- Plus icon to add new job -->
    <div v-if="isClient" class="add-job-container" @click="goToAddJobPage" data-testid="add-job-button">
      <img src="@/assets/img/plus-icon.png" alt="Add Job" class="add-job-icon" />
      <span class="add-job-text">Nieuwe Job Toevoegen</span>
    </div>

    <div class="jobs-container">
      <div v-for="job in jobs" :key="job.id" class="job-card" data-testid="job-card">
        <div
            v-if="job.userEmail === loggedInUserEmail"
            class="edit-icon"
            @click="goToEditJobPage(job.id)"
            data-testid="edit-job-button"
        >
          ✏️
        </div>
        <div
            v-if="job.userEmail === loggedInUserEmail"
            class="delete-icon"
            @click="showDeleteConfirmation(job.id)"
            data-testid="delete-job-button"
        >
          ❌
        </div>
        <h2 data-testid="job-title">{{ job.title }}</h2>
        <p><strong>Budget:</strong> ${{ job.budget }}</p>
        <p><strong>Deadline:</strong> {{ new Date(job.deadline).toLocaleDateString('nl-NL') }}</p>
        <p>{{ job.description }}</p>
        <p><strong>Gemaakt door:</strong> {{ job.userName }} ({{ job.userEmail }})</p>
        <button class="more-info-button" @click="showJobDetails(job.id)" data-testid="more-info-button">
          Meer Informatie
        </button>
        <button v-if="!isClient" class="respond-job-button" @click="respondToJob(job.id)" data-testid="respond-job-button">
          Reageer op Job
        </button>
      </div>
    </div>


    <div v-if="showModal" class="modal-overlay" data-testid="delete-modal">
      <div class="modal">
        <p>Weet je zeker dat je deze job wilt verwijderen?</p>
        <button @click="deleteJob" class="delete-button" id="delete-red-button" data-testid="confirm-delete-button">Ja, Verwijderen</button>
        <button @click="cancelDelete" class="cancel-button" data-testid="cancel-delete-button">Annuleren</button>
      </div>
    </div>


    <div v-if="showToastSuccess" class="toast success-toast" data-testid="success-toast">
      <p>{{ successMessage }}</p>
    </div>
  </div>
</template>


<script>
import axios from "@/plugins/axios.js";

export default {
  data() {
    return {
      jobs: [],
      loggedInUserEmail: localStorage.getItem("userEmail"),
      isClient: localStorage.getItem("userRole") === "CLIENT",
      showModal: false,
      jobIdToDelete: null,
      showToastSuccess: false,
      successMessage: "",
    };
  },
  mounted() {
    this.fetchJobs();

    const successMessage = localStorage.getItem("successMessage");
    if (successMessage) {
      this.successMessage = successMessage;
      this.showToastSuccess = true;
      setTimeout(() => {
        this.showToastSuccess = false;
      }, 3000); // Verberg de toast na 3 seconden

      // Verwijder de succesmelding na weergave
      localStorage.removeItem("successMessage");
    }
  },
  methods: {
    fetchJobs() {
      axios
          .get("/jobs")
          .then((response) => {
            this.jobs = response.data;
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
    showDeleteConfirmation(jobId) {
      this.jobIdToDelete = jobId;
      this.showModal = true; // Toon de modal
    },
    cancelDelete() {
      this.showModal = false; // Sluit de modal zonder te verwijderen
      this.jobIdToDelete = null;
    },
    deleteJob() {
      const job = this.jobs.find((job) => job.id === this.jobIdToDelete);
      if (job.userEmail === this.loggedInUserEmail) {
        // Verzoek om job te verwijderen
        axios
            .delete(`/jobs/${this.jobIdToDelete}`)
            .then((response) => {
              this.jobs = this.jobs.filter((job) => job.id !== this.jobIdToDelete); // Verwijder de job uit de lijst
              this.showModal = false; // Sluit de modal
              this.jobIdToDelete = null;

              // Toon de toast
              this.showToastSuccess = true;
              this.successMessage = "Job succesvol verwijderd!";

              // Verberg de toast na 3 seconden
              setTimeout(() => {
                this.showToastSuccess = false;
              }, 3000);
            })
            .catch((error) => {
              console.error("Er was een fout bij het verwijderen van de job", error);
              alert("Er is een fout opgetreden bij het verwijderen van de job.");
              this.showModal = false; // Sluit de modal bij fout
              this.jobIdToDelete = null;
            });
      } else {
        alert("Je mag alleen je eigen jobs verwijderen.");
        this.showModal = false;
        this.jobIdToDelete = null;
      }
    },
  },
};
</script>

<style scoped>
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
  position: relative;
  width: 30%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.delete-icon {
  position: absolute;
  top: 10px;
  right: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  color: red;
}

.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.2rem;
  cursor: pointer;
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

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.modal button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.modal button:nth-child(1) {
  background-color: #dc3545; /* Red for "Yes" */
  color: white;
}

.modal button:nth-child(2) {
  background-color: red; /* Gray for "Cancel" */
  color: white;
}

/* Toast message styling */
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  font-size: 16px;
}

.success-toast {
  background-color: #28a745; /* Green for success */
}
</style>
