<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/header.vue';
  export default {
    components: {
      Header,
    }
  }
</script>

<style lang="less">

</style>
