<template>
    <div id="overview">
    <h1> Overview van bestelde toestellen</h1>

        <BesteldToestel />

    </div>
</template>

<script>
    import BesteldToestel from '../components/BesteldToestel.vue'

    export default {
        name: 'Overview',
        components: {
            BesteldToestel
        }
    }
</script>
