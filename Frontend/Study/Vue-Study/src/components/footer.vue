<template lang="html">
  <div id="footer" v-if="showFooter">
    <h1>Footer</h1>
    <p>从Header组件传递过来的数据：{{msgFromHeader}}</p>
    <p>Header组件中的按钮点击了 {{clickCount}} 次</p>
    <p>按钮点击数自增后的值：{{countPlus}}</p>
    <p>按钮点击数自增两次后的值：{{countPlusPlus}}</p>
    <p>mapState的值：{{mapStateValue}}</p>
    <p>mapGetters的值：{{mapGettersValue1}} {{mapGettersValue2}}</p>
    <p>显示store中存储的ajax数据：{{$store.state.ajaxData}}</p>
  </div>
</template>

<script>
  import {EventBus} from './../event-bus.js';
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';

  export default {
    props: {
      testFunc: {
        type: Function
      },
    },
    data () {
      return {
        msgFromHeader: '',
        showFooter: true,
      };
    },
    computed: {
      clickCount () {
        return this.$store.state.count;
      },
      countPlus () {
        return this.$store.getters.countPlus;
      },
      countPlusPlus () {
        return this.$store.getters.countPlusPlus;
      },
      ...mapState([
        'mapStateValue'
      ]),
      ...mapGetters([
        'mapGettersValue1',
        'mapGettersValue2'
      ])
    },
    methods: {
      ...mapMutations([
        'alert'
      ]),
      ...mapActions([
        'asyncAlert'
      ]),
      recieveMessage () {
        EventBus.$on('messageSent', (message) => { // 这里的message是形式参数，它的实质内容就是从Header组件传过来的this.msg
          this.msgFromHeader = message;

          // this.$store.commit('increase');
          // this.$store.commit('increase2',10);
          // this.$store.commit('increase3',{
          //   price: 100,
          //   number: 5
          // });
          // this.alert('Header组件中的按钮点击了');

          this.$store.dispatch('increase3Action');
          // this.$store.dispatch('asyncAlert');

          this.asyncAlert();

          console.log(this.$store.state.count);
        });
      },
      getAjaxData () {
        this.$axios.get('https://www.gdszip.com/wp-content/themes/gdszip/data/appdataver-json-cors.php').then( (response) => {
          console.log(response);
          if (response.status === 200) {
            this.$store.commit('setAjaxData',response.data.optionVer);
          }
        });
      },
      Alert() {
        alert('TEST');
      },
    },
    created() {
      console.log('Footer组件已创建');
    },
    mounted () {
      console.log(this);
      this.recieveMessage();
      this.getAjaxData();

      // this.testFunc();

      EventBus.$on('hideFooter', () => {
        this.showFooter = false;
      });

    },
    updated() {
      console.log('Footer组件已重新渲染');
    },
    destroyed() {
      console.log('Footer组件已销毁');
    },
  }
</script>

<style lang="css">
  #footer {
    padding: 20px;
    border: 1px solid #ccc;
  }
</style>
