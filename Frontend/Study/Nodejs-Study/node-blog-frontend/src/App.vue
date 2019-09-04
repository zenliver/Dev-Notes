<template lang="html">
  <div id="app" class="container">

    <router-view></router-view>
    <Footer></Footer>

  </div>
</template>

<script>
  import Footer from './components/Footer.vue';

  export default {
    components: {
      Footer
    },
    data () {
      return {

      };
    },
    computed: {

    },
    methods: {

    },
    mounted () {

    },
  }
</script>

<style lang="less" scoped>
  #app {
    background-color: #fff;
  }
</style>

<style lang="less">
  body {
    background-color: #ddd !important;
  }
</style>
