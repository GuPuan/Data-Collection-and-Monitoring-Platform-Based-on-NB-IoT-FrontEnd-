<template>
  <div>
    <div style="margin-bottom: 30px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Sample</el-breadcrumb-item>
        <el-breadcrumb-item>Curve Display</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="main" style="width: 1200px;height:580px;"></div>
  </div>
</template>

<script>

import * as echarts from "echarts";

export default {
  name: 'Echarts',

  mounted() {
    this.Echarts()
  },

  data() {
    return {
      dateX: [],
      valueY: [],
      chart: '',
    }
  },

  methods: {
    Echarts() {
      this.request.get("/data/find").then(res => {
            for (let i = 0; i < res.length; i++) {
              this.dateX.push(res[i].createDate)
              this.valueY.push(res[i].senValue)
            }
            console.log(this.dateX)
            console.log(this.valueY)
            this.chart = echarts.init(document.getElementById('main'))
            let option = {
              title: {
                text: 'Sample'
              },
              tooltip: {},
              legend: {
                data: ['Current Object Curve']
              },
              dataZoom: [
                {
                  show: true,
                  realtime: true,
                  start: 65,
                  end: 85
                },
                {
                  type: 'inside',
                  realtime: true,
                  start: 65,
                  end: 85,
                }
              ],
              xAxis: {
                type: 'category',
                data: this.dateX.map(function (str) {
                  return str.replace(' ', '\n');
                })
              },
              yAxis: {},
              series: [
                {
                  name: 'Temperature Curve',
                  type: 'line',
                  data: this.valueY
                }
              ]
            };
            this.chart.setOption(option);
          },
      );
    }
  },

}
</script>

<style>

</style>