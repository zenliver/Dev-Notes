<template lang="html">
  <div class="admin_page">

    <AdminHeader></AdminHeader>

    <div class="table_layout">
      <div class="table_col sidebar pl15 pr15">
        <AdminSidebar></AdminSidebar>
      </div>
      <div class="table_col main pl20 pr20">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import AdminHeader from './../../components/admin/Header.vue';
  import AdminSidebar from './../../components/admin/Sidebar.vue';

  export default {
    components: {
      AdminHeader,
      AdminSidebar
    },
  }
</script>

<style lang="less" scoped>
  .admin_page {
    .sidebar {
      width: 10%;
      border-right: 1px solid #ddd;
    }
    .main {
      width: 90%;
    }
  }
</style>
