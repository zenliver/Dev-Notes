<template lang="html">
  <div class="user_register">

    <h2 class="text-center mb30">注册</h2>

    <el-form :model="formData" label-width="100px">

      <el-form-item label="账号">
        <el-input v-model="formData.account"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        formData: {
          account: '',
          password: ''
        },
      };
    },
    methods: {
      register() {

        let params = {

        };

        this.$axios.post('/api/user/register',params).then( (response) => {
          console.log(response);

          if (response.data.status) {
            this.$message.success('注册成功');
          } else {
            this.$message.error(response.data.resmsg);
          }
        }).catch( (error) => {
          console.log(error);

          this.$message.error('接口异常');
        });

      },
    },
    mounted () {

    },
  }
</script>

<style lang="less" scoped>
  .user_register {
    padding-left: 350px;
    padding-right: 350px;
  }
</style>
