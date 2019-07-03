import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    mapStateValue: 'mapStateValue',
    ajaxData: 'test'
  },
  getters: {
    countPlus (state) {
      return state.count+1;
    },
    countPlusPlus (state,getters) {
      return getters.countPlus+1;
    },
    mapGettersValue1 () {
      return 'mapGettersValue1';
    },
    mapGettersValue2 () {
      return 'mapGettersValue2';
    }
  },
  mutations: {
    increase (state) {
      state.count++;
    },
    increase2 (state,payload) {
      state.count += payload;
    },
    increase3 (state,payload) {
      state.count += payload.price*payload.number;
    },
    alert (state,payload) {
      window.alert(payload+' '+state.count+' 次');
    },
    setAjaxData (state,payload) {
      state.ajaxData = payload;
    }
  },
  actions: {
    increase3Action (context) {
      context.commit('increase3',{
        price: 1,
        number: 1
      });
    },
    asyncAlert (context) {
      window.setTimeout(function () {
        context.commit('alert','Header组件中的按钮点击了');
      },300);
    }
  }
})
