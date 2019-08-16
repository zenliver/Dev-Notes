<template lang="html">
  <div class="array_order">
    <ul v-if="renderList">
      <li v-for="(item,index) in arr" :key="index">
        <div class="li_inner">
          <div class="li_inner_content">{{item}}</div>
          <div class="li_inner_btns">
            <button type="button" name="button" @click="up(index)" v-if="index > 0">↑</button>
            <button type="button" name="button" @click="down(index)" v-if="index < (arr.length-1)">↓</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import UtilsMixin from './../mixins/UtilsMixin.js';

  export default {
    data () {
      return {
        arr: ['A','B','C','D','E'],
        renderList: true,
      };
    },
    mixins: [
      UtilsMixin
    ],
    methods: {
      up(index) {
        console.log(index);
        let curItem = this.arr[index];
        let prevItem = this.arr[index-1];

        this.arr.splice(index-1,1,curItem);
        this.arr.splice(index,1,prevItem);

        console.log(index);
      },
      down(index) {
        console.log(index);

        // let curItem = String(this.arr[index]);
        let curItem = this.arr[index];
        console.log(curItem);
        // let nextItem = String(this.arr[index+1]);
        let nextItem = this.arr[index+1];
        console.log(nextItem);

        // this.arr[index+1] = curItem;
        // this.arr[index] = nextItem;

        this.arr.splice(index+1,1,curItem);
        this.arr.splice(index,1,nextItem)
        console.log(this.arr);

      },
    },
    mounted () {

    },
  }
</script>

<style lang="less" scoped>
  .array_order {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 400px;
      li {
        + li {
          margin-top: 10px;
        }
        .li_inner_content, .li_inner_btns {
          display: inline-block;
        }
        .li_inner_content {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: center;
          width: 70%;
          margin-right: 10px;
        }
        .li_inner_btns {
          button {
            font-size: 20px;
            padding: 5px 10px;
            + button {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
</style>
