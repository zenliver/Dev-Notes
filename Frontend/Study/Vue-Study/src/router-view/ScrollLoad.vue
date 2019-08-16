<template lang="html">
  <div class="scroll_load">

    <Scroll
      ref="scroll"
      :auto-update="true"
      class="content"
      @pullingDown="loadRefresh"
      @pullingUp="loadMore">
      <ul>
        <li v-for="(item, index) in list" :key="index">{{ item.title }}</li>
        <li v-if="page === pageCount">已经到底了</li>
      </ul>
    </Scroll>

  </div>
</template>

<script>
  import axios from 'axios';
  import Scroll from 'vue-slim-better-scroll';

  export default {
    components: {
      Scroll
    },
    data () {
      return {
        list: [],
        apiBase: 'https://www.gdszip.com/json-api/get_category_posts/?include=id,title,excerpt,date,categories&id=4&page=',
        page: 1,
        dataLoading: false,
        pageCount: null,
      };
    },
    methods: {
      getData() {
        this.dataLoading = true;

        axios.get(this.apiBase+this.page).then( (response) => {
          console.log(response);
          this.dataLoading = false;
          this.list = this.list.concat(response.data.posts);
          this.pageCount = response.data.pages;
        });

      },
      loadMore(payload) {
        console.log(payload);

        if (!this.dataLoading && this.page < this.pageCount) {
          this.page ++;
          this.getData();
        } else {
          if (this.page === this.pageCount) {
            this.$refs.scroll.update(true);
          }
        }

      },
      loadRefresh() {
        console.log('loadRefresh');
      },
    },
    mounted () {
      this.getData();

      console.dir(document.body);

      let scroll_load = document.querySelector('.scroll_load');
      console.dir(scroll_load);

      window.addEventListener('scroll',function (event) {
        // console.log(event);
        // console.log(document.documentElement.scrollTop);

      });

    },
  }
</script>

<style lang="less" scoped>
  .scroll_load {
    // height: 100%;
  }
</style>

<style lang="less">
  html, body, #app {
    height: 100%;
  }
</style>
