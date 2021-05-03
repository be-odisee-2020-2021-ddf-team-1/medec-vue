<template>
    <div class="container" id="overview">
    <h4> Overzicht van besteld toestellen</h4>
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
