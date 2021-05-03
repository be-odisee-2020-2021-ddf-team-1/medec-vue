<template>
    <div id="BesteldToestel" class="container mt-3">
        <router-link to="/Create" class="btn btn-primary mb-3" tag="button">New toestel</router-link>
        <button @click="deleteToestel" class="btn btn-danger mx-3 p-2 float-right">Delete</button>
        <button @click="toDetails" class="btn btn-secondary mx-3 p-2 float-right">Details</button>

        <!--        <ul id="besteldtoestellen">
                    <li v-for="toestel in besteldtoestellen" :key="toestel.besteldToestelId">
                        {{toestel.naam}} - {{toestel.prijs}} &#45;&#45; {{toestel.besteldToestelId}}

                        <button v-if="toestel.besteldToestelId!==0" type="submit" class="btn btn-secondary btn-md"
                                @click.prevent="details" name="details" >Details</button>
                        <button v-if="toestel.besteldToestelId!==0" type="button"  class="btn btn-danger btn-md"
                                @click.prevent="deleteToestel(toestel.besteldToestelId)" name="delete" >Delete</button>
                    </li>
                </ul>-->
        <b-table
                hover :items="besteldtoestellen"
                :fields="fields"
                :select-mode="selectMode"
                responsive="sm"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                sort-icon-left
                selectable
                @row-selected="onRowSelected">
        </b-table>

        <p>
            Selected Row:<br>
            {{ selected }}
        </p>
        <p class="text-danger" v-if="errorMsg">
            {{errorMsg}}
        </p>
    </div>

</template>

<script>

    import * as axios from 'axios';
    /* import VueAxios from 'vue-axios'*/
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
                selected: null,
                selectMode: 'single',
                sortBy: 'besteldToestelId',
                sortDesc: false,
                besteldtoestellen: [],
                fields: [
                    {
                        key: 'naam',
                        sortable: true

                    },
                    {
                        key: 'aankoopdatum',
                        label: 'Aankoopdatum',
                        sortable: true
                    },
                    {
                        key: 'prijs',
                        label: 'Prijs',
                        sortable: true,
                    }
                ],
                status: null,
                errorMsg: null
            };
        },
        mounted() {
            this.show()
        },
        methods: {
            show() {
                this.url = 'http://localhost:8080/besteldtoestel/besteldetoestellen'
                axios
                    .get(this.url)
                    .then(response => (
                        this.besteldtoestellen = response.data,
                            this.status = response.status
                    ))
                    .catch(error => (
                        this.besteldtoestellen = "fout",
                            this.status = error.response.status,
                            this.errorMsg = error.response.data.message
                    ))
            },
            navigateToCreate() {
                this.$router.push({name: 'Create'}, () => {
                    this.$router.go()
                })
            },
            deleteToestel() {
                const url = 'http://localhost:8080/besteldtoestel/deleteBesteldToestel';
                const headers = {
                    withCredentials: true
                };
                //console.log(this.selected)
                if (this.selected == null) {
                    this.errorMsg = "Gelieve een toestel te selecteren"
                } else {
                    this.besteldToestel.besteldToestelId = this.selected.besteldToestelId;
                    console.log(this.besteldToestel);

                    axios.post(url, this.besteldToestel, headers)
                        .then((response) => {
                            this.message = response.data;
                            //this.componentKey += 1;
                            if (response.status === 200) {
                                console.log("Succeeded");
                                console.log(response.data)
                                this.show();
                            }
                        })
                        .catch(function (error) {
                            if (error.response.status === 403) {
                                // entry forbidden for user
                                // noinspection JSPotentiallyInvalidUsageOfThis
                                this.message = "Entry with id " + this.$route.params.entryId + " is forbidden";
                                // noinspection JSPotentiallyInvalidUsageOfThis
                                //this.newForm();
                            } else {
                                // some other problem
                                console.log("Yes! There is something rotten in the state of Denmark!");
                                console.log(error.message);
                            }
                        });
                }

            },
            onRowSelected(item) {
                this.selected = item[0]
                this.errorMsg = ""
                //console.log(this.selected.besteldToestelId)
            },
            toDetails() {
                console.log(this.selected)
                if (this.selected == null) {
                    this.errorMsg = "Gelieve een toestel te selecteren"
                } else {
                    this.$router.push({path: `/Details/${this.selected.besteldToestelId}`})
                    console.log(this.selected.besteldToestelId)
                }
            }
        }
    }
</script>

<style scoped>

</style>