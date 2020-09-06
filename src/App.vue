<template>
  <div id="app">
    <navbar></navbar>
    <weatherDisplayGeneral></weatherDisplayGeneral>
    <weatherDisplayDetailed></weatherDisplayDetailed>
    <footerComponent></footerComponent>

  </div>
</template>

<script>
import navbar from './components/navbar.vue'
import weatherDisplayGeneral from './components/weatherDisplayGeneral.vue'
import footerComponent from './components/footerComponent.vue'


export default {
  name: 'App',
  components: {
    navbar,
    weatherDisplayGeneral,
    footerComponent

  },
  data() {
    return {
      
    }
  },
 
}
</script>

<style>
body{

  background-color: #fffae0;
}
</style>
