<!-- node-blog - 文章详情页面 -->
<template lang="html">
  <div class="post_detail" v-if="postDetailLoaded">

    <h3 class="post_title text-center pt10">{{postDetail.title}}</h3>
    <div class="post_info text-center pt10 pb20">
      <span class="mr20">作者：{{postDetail.author}}</span>
      <span>发布时间：{{postDetail.updateTime | dateSecond}}</span>
    </div>
    <div class="post_content" v-html="postDetail.content"></div>

  </div>
</template>

<script>
  import PostMixin from './../mixins/PostMixin.js';
  import DateFilter from './../filters/DateFilter.js';

  export default {
    data () {
      return {
        postDetail: {},
        postDetailLoaded: false,
      };
    },
    mixins: [
      PostMixin,
      DateFilter
    ],
    methods: {

    },
    mounted () {
      this.getPostDetail('postDetail', () => {
        this.postDetailLoaded = true;
      });
    },
  }
</script>

<style lang="css" scoped>
  .post_content {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    font-size: 18px;
  }
</style>
