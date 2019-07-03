<!-- ECharts学习 -->
<template lang="html">
  <div id="echarts_study">
    <VcLine :data="chartData" :settings="chartSettings" :extend="extend"></VcLine>
    <VcRing :data="chartData2" :settings="chartSettings2"></VcRing>
  </div>
</template>

<script>
  import VcLine from 'v-charts/lib/line.common.js';
  import VcRing from 'v-charts/lib/ring.common.js';

  export default {
    components: {
      VcLine,
      VcRing
    },
    data () {
      return {
        chartSettings: {
          dimension: ['date'],
          metrics: ['saleNum','saleAmount','saleRate'],
          labelMap: {
            'saleNum': '成交数',
            'saleAmount': '销售额',
            'saleRate': '成交率'
          },
          axisSite: {
            right: ['saleRate']
          },
          yAxisType: ['KMB','percent'],
          yAxisName: ['额度','百分比'],
          area: true,
        },
        extend: {
          'xAxis.0.axisLabel.rotate': 45
        },
        chartData: {
          columns: ['date','saleNum','saleAmount','saleRate'],
          rows: [
            {
              'date': '1月1日',
              'saleNum': 24242,
              'saleAmount': 242420,
              'saleRate': 0.25
            },
            {
              'date': '1月2日',
              'saleNum': 235255,
              'saleAmount': 2352550,
              'saleRate': 0.36
            },
            {
              'date': '1月3日',
              'saleNum': 74942,
              'saleAmount': 749420,
              'saleRate': 0.31
            },
            {
              'date': '1月4日',
              'saleNum': 54242,
              'saleAmount': 542420,
              'saleRate': 0.18
            }
          ],
        },
        chartData2: {
          columns: ['option','num'],
          rows: [
            {
              'option': '已读',
              'num': 1250
            },
            {
              'option': '未读',
              'num': 630
            }
          ],
        },
        chartSettings2: {
          dimension: 'option',
          metrics: 'num',
          label: {
            show: true,
            formatter: '{b}: {d}%'
          },
        },
      };
    },
    methods: {

    },
    mounted () {

    },
  }
</script>

<style lang="scss" scoped>
  #echarts_study {
    width: 800px;
    margin: 0 auto;
  }
</style>
