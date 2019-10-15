<template lang="html">
  <div class="slot_component">

    <p>这是一个包含 slot 的组件</p>

    <slot name="header"></slot>
    <slot name="main" :prop1="prop1" :prop2="prop2" v-if="showMain"></slot>
    <slot name="footer"></slot>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        showMain: false,
        prop1: '这是prop1的值',
        prop2: '这是prop2的值'
      };
    },
    methods: {

    },
    mounted () {

      window.setTimeout( () => {
        this.showMain = true;
      },3000);

    },
  }
</script>

<style lang="css" scoped>
</style>
