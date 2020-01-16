<template>
  <div id="router-view">
    <h1>首页</h1>
    <p>
      <button type="button" name="button" @click="callFooterAlert">执行Footer中的alert</button>
    </p>
    <p>
      <button type="button" name="button" @click="testMethod1">测试局部import</button>
    </p>
    <p>
      <button type="button" name="button" @click="testMethods">测试全部import</button>
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
        this.$refs.footer.Alert();
        console.log(this.$refs.footer.msgFromHeader);
        console.log(this.$refs.footer.clickCount);
      },
      testMethod1() {
        console.log(this.$testVar);
        console.log(this.$testVar1);
        this.$testMethod1();
      },
      testMethods() {
        console.log(this);
        console.log(this.$testMethod4);
        console.log(this.$testVar2);
        this.$testMethods.testMethod3();
      },
      crossDomainXHR() {

        this.$axios.post('http://ykt01.jxt189.com/appApi/login',{
          account: "wrrwwwr",
          loginKey: "wrwrww",
          captcha: "",
          captchaKey: ""
        }).then( (response) => {

        });

        this.$axios.get('http://ykt01.jxt189.com/api/nzp-core-openapi-server/rest/org/find_mywxcids.json?uid=166864').then( (response) => {
          
        });

      },
    },
    mounted () {
      window.localStorage.testItem = 'TEST';

      this.crossDomainXHR();
    },
  }
</script>
