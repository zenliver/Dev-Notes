<template lang="html">
  <div class="keep_alive">

    <p>
      <button type="button" name="button" @click="toggle">切换</button>
    </p>

    <KeepAliveComponent v-if="showAsyncData"></KeepAliveComponent>
    <KeepAliveComponent2 v-else></KeepAliveComponent2>

  </div>
</template>

<script>
  import KeepAliveComponent from './../components/KeepAliveComponent.vue';
  import KeepAliveComponent2 from './../components/KeepAliveComponent2.vue';

  export default {
    components: {
      KeepAliveComponent,
      KeepAliveComponent2
    },
    data () {
      return {
        showAsyncData: true,
      };
    },
    methods: {
      toggle() {
        if (this.showAsyncData) {
          this.showAsyncData = false;
        } else {
          this.showAsyncData = true;
        }
      },
    },
    mounted () {

    },
  }
</script>

<style lang="css" scoped>
</style>
