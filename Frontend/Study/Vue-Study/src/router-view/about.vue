<template lang="html">
  <div id="router-view">
    <input type="file" name="" value="" accept="image/*">
    <div class="vue_cropper_test" style="height: 100px;width: 100px;">
      <VueCropper ref="cropper" :img="imgUrl" :autoCrop="false" :autoCropWidth="100" :autoCropHeight="100" :canMove="false" :canMoveBox="false" :mode="'cover'"></VueCropper>
    </div>

    <TinymceEditor></TinymceEditor>

  </div>
</template>

<script>
  import {VueCropper} from 'vue-cropper';
  import axios from 'axios';
  import TinymceEditor from './../components/TinyMCE-Editor.vue';

  export default {
    components: {
      VueCropper,
      TinymceEditor
    },
    data () {
      return {
        imgUrl: 'https://cn.vuejs.org/images/lifecycle.png',
      };
    },
    methods: {

    },
    mounted () {
      this.$refs.cropper.startCrop();

      console.log(this.$refs.cropper.cropW);

      function getScrollTop(){
      　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      　　if(document.body){
      　　　　bodyScrollTop = document.body.scrollTop;
      　　}
      　　if(document.documentElement){
      　　　　documentScrollTop = document.documentElement.scrollTop;
      　　}
      　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      　　return scrollTop;
      }
      //文档的总高度
      function getScrollHeight(){
      　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
      　　if(document.body){
      　　　　bodyScrollHeight = document.body.scrollHeight;
      　　}
      　　if(document.documentElement){
      　　　　documentScrollHeight = document.documentElement.scrollHeight;
      　　}
      　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
      　　return scrollHeight;
      }
      function getWindowHeight(){
      　　var windowHeight = 0;
      　　if(document.compatMode == "CSS1Compat"){
      　　　　windowHeight = document.documentElement.clientHeight;
      　　}else{
      　　　　windowHeight = document.body.clientHeight;
      　　}
      　　return windowHeight;
      }
      window.onscroll = function(){
      　　if(getScrollTop() + getWindowHeight() == getScrollHeight()){
      　　　　alert("已经到最底部了！!");
      　　}
      };


    },
  }
</script>

<style lang="css">
</style>
