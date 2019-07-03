<template lang="html">
  <div id="header">
    <div id="nav">
      <router-link :to="{ name: 'Index', params: {} }">首页</router-link>
      <router-link :to="{ name: 'About', params: {} }">关于</router-link>
      <router-link :to="{ name: 'echarts', params: {} }">ECharts</router-link>
    </div>
    <h1>Header</h1>
    <p>
      <button type="button" name="button" @click="sendMessage">向Footer组件发送数据</button>
    </p>
    <p>
      <button type="button" name="button" @click="hideFooter">隐藏Footer组件</button>
    </p>
    <p>显示store中存储的ajax数据：{{$store.state.ajaxData}}</p>
  </div>
</template>

<script>
  import {EventBus} from './../event-bus.js';
  export default {
    components: {

    },
    data () {
      return {
        msg: '我是来自Header组件的数据'
      };
    },
    methods: {
      sendMessage () {
        // console.log(EventBus);
        EventBus.$emit('messageSent',this.msg);
      },
      hideFooter() {
        EventBus.$emit('hideFooter');
      },
    },
    beforeCreate() {
      console.log('beforeCreate');
      console.log(this.$el);
    },
    created() {
      console.log('created');
      console.log(this.$el);

      this.$nextTick(function () {

      });
    },
    beforeMount() {
      console.log('beforeMount');
      console.log(this.$el);
    },
    mounted() {
      console.log('mounted');
      console.log(this.$el);

      this.$nextTick(function () {

      });
    },
    updated() {
      console.log('updated');
    },
    destroyed() {
      console.log('destroyed');
    },

  }
</script>

<style lang="css">
  #header {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
  }
</style>
