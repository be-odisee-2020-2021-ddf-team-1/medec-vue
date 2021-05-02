<template>
    <div class="container mt-3">
        <form @submit.prevent="create">
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
                url:'',
                "message": "Gelieve de velden in te vullen",
            };
        },
        mounted() {
            // Bij opstart....
            this.url =''
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
                    .then( (response) => {
                        this.message = response.data;
                        if (this.besteldToestel.besteldToestelId !== 0) {
                            this.besteldToestel.besteldToestelId = 0; // klaar voor nieuwe entry nu
                            this.ToOverview();
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
            ToOverview(){
                this.$router.push({ name : 'Overview'}, () => { this.$router.go() } )
            }
        }
    }
</script>

<style scoped>

</style>