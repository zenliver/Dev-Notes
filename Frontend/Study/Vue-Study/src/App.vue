<template>
  <div id="app" class="pt15 pb15 pl15 pr15">
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
