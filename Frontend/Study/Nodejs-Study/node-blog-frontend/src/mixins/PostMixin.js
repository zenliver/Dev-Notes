export default {
  methods: {
    getPosts(dataKey) {

      this.$axios.get('/api/posts/list').then( (response) => {
        console.log(response);

        if (response.data.status) {
          this[dataKey] = response.data.data;
        } else {
          this.$message.error('列表失败');
        }

      }).catch( (error) => {
        console.log(error);

        this.$message.error('接口异常');

      });

    },
    getPostDetail(dataKey,callback) {

      this.$axios.get('/api/posts/detail/'+this.$route.params.id).then( (response) => {
        console.log(response);

        if (response.data.status) {
          this[dataKey] = response.data.data[0];

          if (callback) {
            callback();
          }

        } else {
          this.$message.error('获取文章详情失败：'+response.data.resmsg);
        }

      }).catch( (error) => {
        console.log(error);

        this.$message.error('接口异常');
      });

    },

  }
};
