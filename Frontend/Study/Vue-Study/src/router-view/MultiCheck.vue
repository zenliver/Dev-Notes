<template lang="html">
  <div class="multi_check">

    <div class="list">
      <div class="item" v-for="(item,index) in data" :key="item.id">
        <p>
          <input type="checkbox" name="" value="" v-model="item.isChecked" @change="selectAll(index)"> 全选
        </p>
        <div class="check_list clearfix">
          <CheckItem class="float-left" v-for="stu in item.list" :key="stu.id" :stuData="stu" v-model="stu.isChecked"></CheckItem>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import CheckItem from './../components/CheckItem.vue';

  export default {
    components: {
      CheckItem
    },
    data () {
      return {
        data: [
          {
            id: 1,
            isChecked: false,
            checkedList: [],
            list: [
              {
                id: 11,
                isChecked: false
              },
              {
                id: 12,
                isChecked: false
              },
              {
                id: 13,
                isChecked: false
              }
            ]
          },
          {
            id: 2,
            isChecked: false,
            checkedList: [],
            list: [
              {
                id: 21,
                isChecked: false
              },
              {
                id: 22,
                isChecked: false
              },
              {
                id: 23,
                isChecked: false
              }
            ]
          },
          {
            id: 3,
            isChecked: false,
            checkedList: [],
            list: [
              {
                id: 31,
                isChecked: false
              },
              {
                id: 32,
                isChecked: false
              },
              {
                id: 33,
                isChecked: false
              }
            ]
          }
        ],
      };
    },
    methods: {
      selectAll(index) {
        console.log(index);
        console.log(this.data[index].isChecked);

        if (this.data[index].isChecked) { // 全选
          this.data[index].list.forEach( (stu) => {
            stu.isChecked = true;
          });
        } else { // 全不选
          this.data[index].list.forEach( (stu) => {
            stu.isChecked = false;
          });
        }

      },
    },
    mounted () {

    },
    watch: {
      'data': {
        deep: true,
        handler: function (newVal,oldVal) {
          // console.log(newVal);
        },
      }
    },
  }
</script>

<style lang="css" scoped>
  input {
    width: 20px;
    height: 20px;
  }
  .multi_check {
    padding: 20px;
  }
</style>
