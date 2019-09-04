<template lang="html">
  <div class="admin_sidebar">
    <ul>
      <li>
        <router-link :to="{ name: 'admin_post_add', params: {} }">添加文章</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'admin_post_list', params: {} }">文章列表</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
</style>
