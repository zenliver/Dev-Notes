<template lang="html">
  <div class="slot_test">

    <SlotComponent>

      <p slot="header">header</p>

      <template slot="main" slot-scope="scope">
        <!-- <p>{{scope.prop1}}</p> -->
        <!-- <p>{{scope.prop2}}</p> -->
        <MultiCheck :prop1="scope.prop1" :prop2="scope.prop2"></MultiCheck>
      </template>

      <template slot="footer">
        <p>footer</p>
      </template>

    </SlotComponent>

  </div>
</template>

<script>
  import SlotComponent from './../components/SlotComponent.vue';
  import MultiCheck from './MultiCheck.vue';

  export default {
    components: {
      SlotComponent,
      MultiCheck
    },
    data () {
      return {

      };
    },
    methods: {

    },
    mounted () {

    },
  }
</script>

<style lang="css" scoped>
</style>
