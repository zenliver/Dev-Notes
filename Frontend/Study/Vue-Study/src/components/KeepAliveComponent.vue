<template lang="html">
  <div class="keep_alive_component">
    <ul>
      <li v-for="(item,index) in list" :key="index">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [],
      };
    },
    methods: {
      getData() {
        this.$axios.get('https://www.gdszip.com/json-api/get_posts/?include=id,title,excerpt,date').then( (response) => {
          console.log(response);

          this.list = response.data.posts;
        }).catch( (error) => {
          console.log(error);
        });
      },
    },
    mounted () {
      this.getData();
    },
  }
</script>

<style lang="css" scoped>
</style>
