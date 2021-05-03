<template>
    <div id="NewWaardebon" class="container mt-3">
        <b-alert show variant="dark">
            U krijgt een gratis waardebon van Jaegher. Vul uw gegevens in en Jaegher bezorgt u uw waardebon.
        </b-alert>
        <form class="w-50" @submit.prevent="submitting">
            <label for="voornaam">Voornaam:</label><br>
            <input type="text" class="form-control" id="voornaam" name="naam" placeholder="Uw voornaam" v-model="voornaam"><br>
            <label for="achternaam">Achternaam:</label><br>
            <input type="text" class="form-control" id="achternaam" name="achternaam" placeholder="Uw achternaam" v-model="achternaam"><br>
            <label for="email">E-mail:</label><br>
            <input type="text" class="form-control" id="email" name="email" placeholder="Emailadres@email.be" v-model="email"><br>
            <label for="adres">Adres:</label><br>
            <input type="text" class="form-control" id="adres" name="adres" placeholder="Straat nummer, Gemeente postcode" v-model="adres"><br>
            <label for="geboortemaand">Geboortemaand:</label><br>
            <input type="date" class="form-control" id="geboortemaand" name="geboortemaand" v-model="geboortemaand"><br>
            <input type="submit" class="btn btn-primary" value="Submit">
        </form>
    </div>
</template>

<script>

    /* import VueAxios from 'vue-axios'*/

    import * as axios from "axios";

    export default {
        name: "NewWaardebon.vue",
        data() {
            return {
                    "voornaam": '',
                    "achternaam": '',
                    "email": '',
                    "adres": '',
                    "geboortemaand": ''

            };
        },

        methods: {
            submitting() {
                //TODO connecteren met Team 3 API
            },
            getToestelById(toestelId) {
                this.url = 'http://localhost:8080/besteldtoestel/' + toestelId;
                axios
                    .get(this.url)

            }
        },

    }
</script>

<style scoped>

</style>