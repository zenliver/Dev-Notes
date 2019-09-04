<!-- node-blog - 首页 -->
<template lang="html">
  <div class="index">

    <h3 class="pt20">最新文章</h3>

    <div class="post_list">
      <div class="post_item mt20" v-for="post in postList" :key="post.id">
        <h4 class="post_title">
          <router-link :to="{ name: 'post_detail', params: {id: post.id} }">{{post.title}}</router-link>
        </h4>
        <div class="post_summary pt10 pb10" v-html="post.summary"></div>
        <div class="post_info">
          <span class="mr20">作者：{{post.author}}</span>
          <span>发布时间：{{post.updateTime | dateSecond}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import PostMixin from './../mixins/PostMixin.js';
  import DateFilter from './../filters/DateFilter.js';

  export default {
    data () {
      return {
        postList: [],
      };
    },
    mixins: [
      PostMixin,
      DateFilter
    ],
    methods: {

    },
    mounted () {
      this.getPosts('postList');
    },
  }
</script>

<style lang="css" scoped>
</style>
