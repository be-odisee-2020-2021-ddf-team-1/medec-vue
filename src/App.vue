<!--<template>
  <div class="container-fluid">
&lt;!&ndash;    <div id="nav">
      <router-link to="/CreateBesteldToestel">Create Toestel</router-link> |
      <router-link to="/BesteldToestel">Overzicht toestellen</router-link> |
    </div>
    <router-view/>&ndash;&gt;

      <div id="logo" class="d-flex justify-content-center">
          <img src="./assets/logo.png" alt="logo">
          <h1>Welkom</h1>
      </div>
    <BesteldToestel Msg="This is BesteldToestel view" />
      <CreateBesteldToestel/>
  </div>

</template>-->
<template>
    <div id="app">
        <div id="nav">
            <router-link to="/create">Create</router-link> |
            <router-link to="/">Overview</router-link>
        </div>
        <router-view/>
    </div>
</template>

<!--<script>

import CreateBesteldToestel from "./components/CreateBesteldToestel";
import BesteldToestel from "./components/BesteldToestel";

export default {
  name: "App",
  components: {
      BesteldToestel,
CreateBesteldToestel

  },
};
</script>-->

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
