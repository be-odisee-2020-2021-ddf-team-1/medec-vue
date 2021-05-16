<template>
  <div id="Planning" class="container mt-3"></div>
</template>

<script>
import * as axios from "axios";
/* import VueAxios from 'vue-axios'*/
export default {
  name: "Planning.vue",
  data() {
    return {
      planning: {
        planningId: 0,
        name: "",
      },
      planningtest: null,
      selected: null,
      selectMode: "single",
      sortBy: "planningId",
      sortDesc: false,
      planningen: [],
      fields: [
        {
          key: "planningId",
          label: "planningId",
          sortable: true,
        },
        {
          key: "name",
          label: "name",
          sortable: true,
        },
      ],
      status: null,
      errorMsg: null,
    };
  },
  mounted() {
    this.show();
  },
  methods: {
    show() {
      console.log(this);
      this.url = "http://localhost:8082/planning/1";

      axios
        .get(this.url)
        .then(
          (response) => (
            (this.planningtest = response.data),
            (this.status = response.status),
            console.log("xxxxxxyyyyyyy"),
            console.log(response.data),
            console.log(this.planningtest)
          )
        )
        .catch(
          (error) => (
            (this.planningen = "fout"),
            (this.status = error.response.status),
            (this.errorMsg = error.response.data.message)
          )
        );
    },
    navigateToCreate() {
      this.$router.push({ name: "Create" }, () => {
        this.$router.go();
      });
    },
    deleteToestel() {
      const url = "http://localhost:8081/besteldtoestel/deleteBesteldToestel";
      const headers = {
        withCredentials: true,
      };
      //console.log(this.selected)
      if (this.selected == null) {
        this.errorMsg = "Gelieve een toestel te selecteren";
      } else {
        this.besteldToestel.besteldToestelId = this.selected.besteldToestelId;
        console.log(this.besteldToestel);

        axios
          .post(url, this.besteldToestel, headers)
          .then((response) => {
            this.message = response.data;
            //this.componentKey += 1;
            if (response.status === 200) {
              console.log("Succeeded");
              console.log(response.data);
              this.show();
            }
          })
          .catch(function (error) {
            if (error.response.status === 403) {
              // entry forbidden for user
              // noinspection JSPotentiallyInvalidUsageOfThis
              this.message =
                "Entry with id " + this.$route.params.entryId + " is forbidden";
              // noinspection JSPotentiallyInvalidUsageOfThis
              //this.newForm();
            } else {
              // some other problem
              console.log(
                "Yes! There is something rotten in the state of Denmark!"
              );
              console.log(error.message);
            }
          });
      }
    },
    onRowSelected(item) {
      this.selected = item[0];
      this.errorMsg = "";
      //console.log(this.selected.besteldToestelId)
    },
    toDetails() {
      console.log(this.selected);
      if (this.selected == null) {
        this.errorMsg = "Gelieve een toestel te selecteren";
      } else {
        this.$router.push({
          path: `/Details/${this.selected.besteldToestelId}`,
        });
        console.log(this.selected.besteldToestelId);
      }
    },
  },
};
</script>

<style scoped></style>
