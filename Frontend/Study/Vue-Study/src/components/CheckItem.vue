<template lang="html">
  <div class="check_item" @click="selectStu" :class="{'selected': stuSelected}">
    <span>{{stuData.id}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      stuData: {
        type: Object
      },
      value: {
        type: Boolean
      }
    },
    data () {
      return {
        stuSelected: false,
      };
    },
    methods: {
      selectStu() {

        if (this.stuSelected) {
          this.stuSelected = false;
        } else {
          this.stuSelected = true;
        }

        this.$emit('input',this.stuSelected);

      },
    },
    mounted () {

    },
    watch: {
      'value': function (newVal,oldVal) {
        this.stuSelected = newVal;
      },
    },
  }
</script>

<style lang="less" scoped>
  .check_item {
    width: 100px;
    height: 100px;
    line-height: 100px;
    background-color: #ddd;
    text-align: center;
    margin: 10px;
    cursor: pointer;
    color: #000;
    &.selected {
      background-color: #000;
      color: #fff;
    }
  }
</style>
