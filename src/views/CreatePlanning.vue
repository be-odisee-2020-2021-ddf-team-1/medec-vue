<template>
  <div class="container" id="create">
    <h1>Create Planning</h1>

    <CreatePlanning />
  </div>
</template>

<script>
import CreatePlanning from "../components/CreatePlanning.vue";

export default {
  name: "create",
  components: {
    CreatePlanning,
  },
};
</script>
