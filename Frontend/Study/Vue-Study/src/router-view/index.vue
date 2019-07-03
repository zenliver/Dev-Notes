<template>
  <div id="router-view">
    <h1>首页</h1>
    <p>
      <button type="button" name="button" @click="callFooterAlert">执行Footer中的alert</button>
    </p>
    <Footer ref="footer" :testFunc="testFunc"></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
  import Footer from './../components/footer.vue';

  export default {
    name: 'index',
    components: {
      Footer
    },
    data() {
      return {
        testFunc: function () {
          alert('这是通过props传入的函数执行的结果');
        },
      };
    },
    methods: {
      callFooterAlert() {
        this.prop1 = 'prop1_modified';
        // this.$refs.footer.Alert();
        console.log(this.$refs.footer.msgFromHeader);
        console.log(this.$refs.footer.clickCount);
        console.log(this.$refs.footer.prop1);
      },
    },
    mounted () {
      window.localStorage.testItem = 'TEST';
    },
  }
</script>
