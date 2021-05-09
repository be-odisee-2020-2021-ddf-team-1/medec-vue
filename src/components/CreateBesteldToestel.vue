<template>
    <div class="container mt-3">
        <p class="text-danger">
            {{message}}
        </p>
        <form class="w-50" @submit.prevent="create">
            <label for="naam">Naam:</label><br>
            <input type="text" class="form-control" v-model="besteldToestel.naam" id="naam" name="naam" placeholder="Toestelnaam"><br>
            <label for="aankoopdatum">AankoopDatum:</label><br>
            <input type="date" class="form-control" v-model="besteldToestel.aankoopdatum" id="aankoopdatum" name="aankoopdatum"><br>
            <label for="prijs">Prijs:</label><br>
            <input type="number" class="form-control" v-model="besteldToestel.prijs" step="any" id="prijs" name="prijs"><br><br>
            <input type="submit" class="btn btn-primary" value="Submit">
        </form>
    </div>
</template>


<script>

    /* import VueAxios from 'vue-axios'*/

    import * as axios from "axios";

    export default {
        name: "BesteldToestel.vue",
        data() {
            return {
                "besteldToestel": {
                    "besteldToestelId": 0,
                    "naam": '',
                    "aankoopdatum": null,
                    "prijs": 0,
                },
                url: '',
                toEditToestel: null,
                "message": "",
            };
        },

        created() {
            if (this.$route.params.besteldToestelId != null) { // edit existing
                //console.log(this.$route.params.besteldToestelId + 'heyyyy')
                this.getToestelById(this.$route.params.besteldToestelId)
            }

        },
        mounted() {
            // Bij opstart....
            this.url = ''
        },
        methods: {
            create() {

                if ((this.besteldToestel.aankoopdatum) != null) this.besteldToestel.aankoopdatum = new Date(this.besteldToestel.aankoopdatum).getTime();
                this.besteldToestel.prijs = parseFloat(this.besteldToestel.prijs);
                console.log(this.besteldToestel.aankoopdatum);
                const url = 'http://localhost:8080/besteldtoestel/createBesteldToestel';
                const headers = {
                    withCredentials: true
                };

                axios.post(url, this.besteldToestel, headers)
                    .then((response) => {
                        this.message = response.data;
                        console.log(response);
                        console.log(response.status);
                        if (response.status === 200) {
                            this.toOverview();
                        } else if (response.status === 500) {
                            // ---redirect naar 404 view
                        }

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
            toOverview() {
                console.log("I accessed");
                this.$router.push({name: 'Overview'}, () => {
                    this.$router.go()
                })
            },
            getToestelById(toestelId) {
                this.url = 'http://localhost:8080/besteldtoestel/' + toestelId
                axios
                    .get(this.url)
                    .then((response) => {
                        this.toEditToestel = response.data
                        console.log(response.status)
                        if (response.status === 204) {
                            // entry not found
                            this.message = "Toestel with id " + toestelId + " was not found";
                        }
                        this.status = response.status
                    })
                    .catch(error => (
                        this.toEditToestel = null,
                            this.status = error.response.status,
                            this.message = error.response.data.message
                    ))
            }

        },
        watch: {
            toEditToestel: function (val) {
                if (val !== null) {
                    console.log(val)
                    this.besteldToestel = val
                }

            },
        }
    }
</script>

<style scoped>

</style>