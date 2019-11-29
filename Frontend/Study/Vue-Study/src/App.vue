<template>
  <div id="app" class="pt15 pb15 pl15 pr15">

    <Header></Header>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"></router-view>

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
