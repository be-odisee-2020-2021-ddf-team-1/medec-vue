<template>
    <div id="NewWaardebon" class="container mt-3">
        <b-alert :show="showInfo" variant="dark">
            U krijgt een gratis waardebon van Jaegher. Vul uw gegevens in en Jaegher bezorgt u uw waardebon.
        </b-alert>
        <b-alert :show="showDone" variant="success">
            Gegevens overgedragen! U krijgt zo snel mogelijk uw waardebon.<br>
            <router-link to="/">Keer terug naar overzicht</router-link>
        </b-alert>
        <div id="showForm">
            <form class="w-50" @submit.prevent="submitting" ref="form">
                <label for="voornaam">Voornaam:</label><br>
                <input type="text" class="form-control" id="voornaam" name="naam" placeholder="Uw voornaam" v-model="persoon.naam"><br>
                <label for="achternaam">Achternaam:</label><br>
                <input type="text" class="form-control" id="achternaam" name="achternaam" placeholder="Uw achternaam" v-model="persoon.achternaam"><br>
                <label for="email">E-mail:</label><br>
                <input type="text" class="form-control" id="email" name="email" placeholder="Emailadres@email.be" v-model="persoon.email"><br>
                <label for="adres">Adres:</label><br>
                <input type="text" class="form-control" id="adres" name="adres" placeholder="Straat nummer, Gemeente postcode" v-model="persoon.addres"><br>
                <label for="geboortemaand">Geboortemaand:</label><br>
                <input type="date" class="form-control" id="geboortemaand" name="geboortemaand" v-model="persoon.geboortedatum"><br>
                <input type="submit" class="btn btn-primary" value="Submit">
            </form>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "NewWaardebon.vue",
        data() {
            return {
                persoon:{
                    "naam":'',
                    "achternaam":'',
                    "email":'',
                    "geboortedatum":'',
                    "addres":''
                },
                "showInfo":true,
                "showDone":false
            };
        },
        methods: {
            submitting() {
                const headers = {
                    withCredentials: true
                };
                //TODO connecteren met Team 3 API
                axios.post('http://localhost:8080/jaegherrest/createklant', this.persoon, headers)
                    .then(response => {
                        this.showDone=true;
                        this.showInfo=false;
                        document.getElementById("showForm").style.display="none";

                        // success
                        console.log(response);

                    })
                    .catch(response => {
                    //error
                        console.log(response)
                    })
            }
        },

    }
</script>

<style scoped>

</style>