<template>
    <div class="container" id="create">
        <h1> Create </h1>

        <CreateBesteldToestel />

    </div>
</template>

<script>
    import CreateBesteldToestel from '../components/CreateBesteldToestel.vue'

    export default {
        name: 'create',
        components: {
            CreateBesteldToestel
        }
    }
</script>
