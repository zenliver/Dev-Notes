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
    },
  }
</script>

<style lang="css">
</style>
