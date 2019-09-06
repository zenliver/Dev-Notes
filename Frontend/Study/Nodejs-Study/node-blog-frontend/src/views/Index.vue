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

    <div class="text-center pt30">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNum" :page-sizes="[3, 10, 20, 50, 100]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount"></el-pagination>
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
        page: {
          pageNum: 1,
          pageSize: 3,
          totalCount: 0
        },
      };
    },
    mixins: [
      PostMixin,
      DateFilter
    ],
    methods: {
      handleSizeChange(payload) {
        console.log(payload);

        this.page.pageSize = payload;
        this.page.pageNum = 1;

        this.getPosts('postList',this.getPostsCallback);
      },
      handleCurrentChange(payload) {
        console.log(payload);

        this.page.pageNum = payload;

        this.getPosts('postList',this.getPostsCallback);
      },
      getPostsCallback(response) {
        this.page.totalCount = response.data.data.totalCount;
      },
    },
    mounted () {
      this.getPosts('postList',this.getPostsCallback);
    },
  }
</script>

<style lang="css" scoped>
</style>
