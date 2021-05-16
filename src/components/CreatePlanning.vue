<template>
  <div v-if="isLoaded">
    <div class="container mt-3 pl-0">
      <p class="text-danger">
        {{ message }}
      </p>
      <form class="w-50" @submit.prevent="createPlanning">
        <label for="name">Name:</label><br />
        <input
          type="text"
          class="form-control"
          v-model="planning.name"
          id="name"
          name="name"
          placeholder="PlanningNaam"
        />
        <br />
        <input type="submit" class="btn btn-success mr-2" value="Submit" />
        <router-link tag="button" class="btn btn-primary" to="/"
          >Keer terug naar overview</router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
/* import VueAxios from 'vue-axios'*/

import * as axios from "axios";

export default {
  name: "CreatePlanning.vue",
  data() {
    return {
      url: "",
      toEditToestel: null,
      message: "",
      planning: {
        planningId: 0,
        name: "",
      },
      isLoaded: false,
    };
  },

  created() {},
  mounted() {
    // Bij opstart....
    this.isLoaded = true;
    this.url = "";
    this.getToestelById(this.$route.params.besteldToestelId);
  },
  methods: {
    createPlanning() {
      const url = "http://localhost:8082/planning/createPlanning";
      const headers = {
        withCredentials: true,
      };

      axios
        .post(url, this.planning, headers)
        .then((response) => {
          this.message = "succesfully created planning";
          this.planning = response.data;
          if (response.status === 200) {
            this.toEditToestel.planningId = this.planning.planningId;
            this.create(this.toEditToestel);
          } else if (response.status === 500) {
            console.log("i was triggered ?");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    toOverview() {
      console.log("I accessed");
      this.$router.push({ name: "Overview" }, () => {
        this.$router.go();
      });
    },
    getPlanningById(toestelId) {
      this.url = "http://localhost:8082/planning/" + toestelId;

      axios
        .get(this.url)
        .then((response) => {
          this.planning = response.data;
          if (response.status === 200) {
            console.log("succes");
          }
        })
        .catch(
          (error) => (
            (this.status = error.response.status), (this.isLoaded = true)
          )
        );
    },
    create(toestelUpdate) {
      const url = "http://localhost:8081/besteldtoestel/createBesteldToestel";
      const headers = {
        withCredentials: true,
      };
      this.toEditToestel.planningId = this.planning.planningId;
      axios
        .post(url, toestelUpdate, headers)
        .then((response) => {
          this.message = response.data;
          if (response.status === 200) {
            this.$router.push({ name: "Overview" }, () => {
              this.$router.go();
            });
          } else if (response.status === 500) {
            // ---redirect naar 404 view
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getToestelById(toestelId) {
      this.url = "http://localhost:8081/besteldtoestel/" + toestelId;

      axios
        .get(this.url)
        .then((response) => {
          this.toEditToestel = response.data;
          this.isLoaded = true;
          if (response.status === 200) {
            console.log("yes i did it correctly");
          } else if (response.status === 204) {
            this.isLoaded = true;
            this.message = "Toestel with id " + toestelId + " was not found";
          }
          this.status = response.status;
        })
        .catch(
          (error) => (
            (this.toEditToestel = null),
            (this.status = error.response.status),
            (this.message = error.response.data.message),
            (this.isLoaded = true)
          )
        );
    },
  },
};
</script>

<style scoped></style>
