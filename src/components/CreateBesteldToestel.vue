<template>
  <div v-if="isLoaded">
    <div class="container mt-3 pl-0">
      <p class="text-danger">
        {{ message }}
      </p>
      <form class="w-50" @submit.prevent="create">
        <label for="naam">Naam:</label><br />
        <input
          type="text"
          class="form-control"
          v-model="besteldToestel.naam"
          id="naam"
          name="naam"
          placeholder="Toestelnaam"
        /><br />
        <label for="aankoopdatum">AankoopDatum:</label><br />
        <input
          type="date"
          class="form-control"
          v-model="besteldToestel.aankoopdatum"
          id="aankoopdatum"
          name="aankoopdatum"
        /><br />
        <label for="prijs">Prijs:</label><br />
        <input
          type="number"
          class="form-control"
          v-model="besteldToestel.prijs"
          step="any"
          id="prijs"
          name="prijs"
        /><br /><br />

        <input type="submit" class="btn btn-success mr-2" value="Submit" />
        <router-link tag="button" class="btn btn-primary" to="/"
          >Keer terug naar overview</router-link
        >
      </form>

      <div v-if="planningId != null">
        <div class="container mt-3 pl-0">
          <h1>Details van planning</h1>
          <p>Naam : {{ planning.name }}</p>
        </div>
      </div>

      <div
        v-else-if="planningId == null && besteldToestel.besteldToestelId !== 0"
      >
        <router-link
          tag="button"
          class="btn btn-primary mt-3"
          :to="{
            name: 'CreatePlanning',
            params: { besteldToestelId: besteldToestel.besteldToestelId },
          }"
        >
          Create planning</router-link
        >
      </div>
      <div v-else></div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
/* import VueAxios from 'vue-axios'*/

import * as axios from "axios";

export default {
  name: "BesteldToestel.vue",
  data() {
    return {
      besteldToestel: {
        besteldToestelId: 0,
        naam: "",
        aankoopdatum: null,
        prijs: 0,
        planningId: null,
      },
      url: "",
      toEditToestel: null,
      message: "",
      planning: {
        planningId: 0,
        name: "",
      },
      planningId: null,
      isLoaded: false,
    };
  },

  created() {
    if (this.$route.params.besteldToestelId != null) {
      // edit existing

      this.getToestelById(this.$route.params.besteldToestelId);
      this.planningId = this.besteldToestel.planningId;
      this.planning = this.getPlanningById(this.$route.params.besteldToestelId);
    }
  },
  mounted() {
    // Bij opstart....
    this.isLoaded = true;
    this.url = "";
  },
  methods: {
    create() {
      if (this.besteldToestel.aankoopdatum != null)
        this.besteldToestel.aankoopdatum = new Date(
          this.besteldToestel.aankoopdatum
        ).getTime();
      this.besteldToestel.prijs = parseFloat(this.besteldToestel.prijs);
      const url = "http://localhost:8081/besteldtoestel/createBesteldToestel";
      const headers = {
        withCredentials: true,
      };

      axios
        .post(url, this.besteldToestel, headers)
        .then((response) => {
          this.message = response.data;
          if (response.status === 200) {
            this.$router.push({ name: "Waardebon" }, () => {
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

    createPlanning() {
      const url = "http://localhost:8082/planning/createPlanning";
      const headers = {
        withCredentials: true,
      };

      axios
        .post(url, this.planning, headers)
        .then((response) => {
          this.message = response.data;
          if (response.status === 200) {
            window.location.reload();
          } else if (response.status === 500) {
            // ---redirect naar 404 view
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

    getToestelById(toestelId) {
      this.url = "http://localhost:8081/besteldtoestel/" + toestelId;

      axios
        .get(this.url)
        .then((response) => {
          this.toEditToestel = response.data;
          this.planningId = this.toEditToestel.planningId;
          this.isLoaded = true;
          if (response.status === 204) {
            // entry not found
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
  watch: {
    toEditToestel: function (val) {
      if (val !== null) {
        this.besteldToestel = val;
      }
    },
  },
};
</script>

<style scoped></style>
