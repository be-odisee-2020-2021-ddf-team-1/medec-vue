<template>
    <div id="create">
        <h1> Create </h1>

        <CreateBesteldToestel />

    </div>
</template>

<script>
    import CreateBesteldToestel from '../components/CreateBesteldToestel.vue'

    export default {
        name: 'BesteldToestel',
        components: {
            CreateBesteldToestel
        }
    }
</script>
