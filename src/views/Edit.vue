<template>
  <div class="container" id="details">
    <h1>Details</h1>
    <Edit />

    <Planning />
  </div>
</template>

<script>
import Edit from "../components/CreateBesteldToestel.vue";
import Planning from "../components/Planning.vue";

export default {
  name: "edit",
  components: {
    Edit,
    Planning,
  },
};
</script>
