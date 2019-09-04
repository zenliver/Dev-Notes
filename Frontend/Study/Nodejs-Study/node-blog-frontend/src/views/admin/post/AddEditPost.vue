<!-- node-blog - 后台管理 - 添加文章 -->
<template lang="html">
  <div id="admin_post_add">

    <h4>添加文章</h4>

    <el-form class="pt20" style="width: 80%;" size="small" :model="form" label-width="80px">

      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="摘要">
        <el-input type="textarea" autosize v-model="form.summary"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <el-input type="textarea" autosize v-model="form.content"></el-input>
      </el-form-item>

      <el-form-item label="作者">
        <el-input v-model="form.author"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="savePost">保存</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import PostMixin from './../../../mixins/PostMixin.js';

  export default {
    data () {
      return {
        form: {
          title: '',
          summary: '',
          content: '',
          author: ''
        },
        postDetail: {},
      };
    },
    mixins: [
      PostMixin
    ],
    methods: {
      savePost() {

        let apiUrl = '/api/posts/add';

        let params = {
          title: this.form.title,
          summary: this.form.summary,
          content: this.form.content,
          author: this.form.author
        };

        if (this.$route.name === 'admin_post_edit') { // 编辑模式
          apiUrl = '/api/posts/edit';
          params.id = Number(this.$route.params.id);
        }

        console.log(params);

        this.$axios.post(apiUrl,params).then( (response) => {
          console.log(response);

          if (response.data.status) {
            this.$message.success('保存成功');

            this.$router.push({
              name: 'admin_post_list',
            });

          } else {
            this.$message.error('保存失败');
          }

        }).catch( (error) => {
          console.log(error);

          this.$message.error('接口异常');

        });

      },
      getPostDetailCallback() {

        // 数据回填
        this.form.title = this.postDetail.title;
        this.form.summary = this.postDetail.summary;
        this.form.content = this.postDetail.content;
        this.form.author = this.postDetail.author;

      },
    },
    mounted () {

      if (this.$route.name === 'admin_post_edit') {
        this.getPostDetail('postDetail',this.getPostDetailCallback);
      }

    },
    watch: {
      '$route': function (to,from) {
        console.log(to);

        if (to.name === 'admin_post_add') {
          // 清空旧数据
          this.form.title = '';
          this.form.summary = '';
          this.form.content = '';
          this.form.author = '';
        }

      },
    },
  }
</script>

<style lang="css" scoped>
</style>
