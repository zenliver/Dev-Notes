<template lang="html">
  <div class="admin_post_list">

    <el-table border :data="postList">

      <el-table-column label="序号" type="index" width="60"></el-table-column>
      <el-table-column label="标题" width="400">
        <template slot-scope="scope">
          <router-link :to="{ name: 'post_detail', params: {id: scope.row.id} }">{{scope.row.title}}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="作者" prop="author"></el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime | dateSecond}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{ name: 'admin_post_edit', params: {id: scope.row.id} }">编辑</router-link>
          <a class="ml15" href="javascript:;" @click="delPost(scope.row.id)">删除</a>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import PostMixin from './../../../mixins/PostMixin.js';
  import DateFilter from './../../../filters/DateFilter.js';

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
      delPost(id) {

        this.$confirm('确定要删除此文章吗？','提示',{
          type: 'warning'
        }).then( () => {

          let params = {
            id: id
          };

          this.$axios.post('/api/posts/del',params).then( (response) => {
            console.log(response);

            if (response.data.status) {
              this.$message.success('删除成功');

              this.getPosts('postList');
            } else {
              this.$message.error('删除失败');
            }

          }).catch( (error) => {
            console.log(error);

            this.$message.error('接口异常');
          });

        });

      },
    },
    mounted () {
      this.getPosts('postList');
    },
  }
</script>

<style lang="css" scoped>
</style>
