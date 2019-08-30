<template lang="html">
  <div id="header">

    <div id="nav">
      <router-link :to="{ name: 'index', params: {} }">首页</router-link>
      <router-link :to="{ name: 'about', params: {} }">关于</router-link>
      <router-link :to="{ name: 'echarts', params: {} }">ECharts</router-link>
      <router-link :to="{ name: 'array_order', params: {} }">数组排序</router-link>
      <router-link :to="{ name: 'scroll_load', params: {} }">滚动加载</router-link>
      <router-link :to="{ name: 'multi_check', params: {} }">多选</router-link>
    </div>

    <div class="header" v-if="routeName === 'index'">
      <h1>Header</h1>
      <p>
        <button type="button" name="button" @click="sendMessage">向Footer组件发送数据</button>
      </p>
      <p>
        <button type="button" name="button" @click="hideFooter">隐藏Footer组件</button>
      </p>
      <p>显示store中存储的ajax数据：{{$store.state.ajaxData}}</p>
    </div>

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
    computed: {
      routeName () {
        return this.$route.name;
      },
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

<style lang="less">
  #header {
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 20px;
    #nav {
      a {
        + a {
          margin-left: 10px;
        }
      }
    }
  }
</style>
