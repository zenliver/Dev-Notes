<template lang="html">
  <div class="front_page">

    <FrontHeader></FrontHeader>
    <router-view></router-view>

  </div>
</template>

<script>
  import FrontHeader from './../components/Header.vue';

  export default {
    components: {
      FrontHeader,
    },
  }
</script>

<style lang="css" scoped>
</style>
