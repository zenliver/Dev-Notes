<template lang="html">
  <div id="header" class="mlr-15 pl15 pr15">

    <h1>
      <router-link :to="{ name: 'index', params: {} }">NodeJS Blog</router-link>
    </h1>

    <h4 class="pt10 pb10">后端：nodejs, express, mysql 前端：vue</h4>

    <div class="menu clearfix">
      <div class="menu_item left">
        <router-link :to="{ name: 'index', params: {} }">首页</router-link>
      </div>
      <div class="menu_item left">
        <router-link :to="{ name: 'admin_post_list', params: {} }" target="_blank">后台管理</router-link>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="less" scoped>
  #header {
    border-bottom: 1px solid #ddd;
    .menu {

    }
    .menu_item {
      padding: 10px 20px;
      font-size: 18px;
    }
  }
</style>
