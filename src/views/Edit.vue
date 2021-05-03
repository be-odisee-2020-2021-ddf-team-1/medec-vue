<template>
    <div class="container" id="details">
        <h1> Details </h1>
        <Edit />
    </div>
</template>

<script>
    import Edit from '../components/CreateBesteldToestel.vue'

    export default {
        name: 'edit',
        components: {
            Edit
        }
    }
</script>
