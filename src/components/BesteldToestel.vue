<template>
    <div id="BesteldToestel" class="container mt-3">
        <button @click="navigateToCreate" class="btn btn-primary">New </button>
        <ul id="besteldtoestellen">
            <li v-for="toestel in besteldtoestellen" :key="toestel.id">
                {{toestel.naam}} - {{toestel.prijs}} --

                <button v-if="toestel.id!==0" type="submit" class="btn btn-secondary btn-md"
                        @click="details" name="details" >Details</button>
                <button v-if="toestel.id!==0" type="button" class="btn btn-danger btn-md"
                        @click="deleteToestel" name="delete" >Delete</button>
            </li>
        </ul>
    </div>

</template>


<script>

    import * as axios from 'axios';
    /* import VueAxios from 'vue-axios'*/
    export default {
        name: "BesteldToestel.vue",
        data() {
            return {
                besteldtoestellen : [],
                status: null,
                errorMsg:null
            }
        },
        mounted() {
            this.show()
        },
        methods: {
            show() {
                this.url ='http://localhost:8080/besteldtoestel/besteldetoestellen'
                axios
                .get(this.url)
                .then(response => (
                    this.besteldtoestellen = response.data,
                    this.status = response.status
                ))
                .catch(error => (
                    this.besteldtoestellen = "fout",
                        this.status  = error.response.status,
                        this.errorMsg = error.response.data.message
                ))
            },
            navigateToCreate(){
                this.$router.push({ name : 'Create'}, () => { this.$router.go() } )
            },
            deleteToestel(){

            },
            details(){

            }
        }
    }
</script>

<style scoped>

</style>