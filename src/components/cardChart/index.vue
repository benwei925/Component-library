<template>
  <div>
    <el-card class="box-card" :shadow="shadow">
      <div class="title"><slot name="title"></slot>{{title}}</div>
      <ve-histogram :data="chartData" :width="chartWidth" :height="chartHeight" v-if="type=='histogram'"></ve-histogram>
      <ve-line :data="chartData" :width="chartWidth" :height="chartHeight" v-if="type=='line'"></ve-line>
    </el-card>
  </div>
</template>
<script>
import VeHistogram from "v-charts/lib/histogram";
import VeLine from "v-charts/lib/line";
export default {
  components: { VeHistogram, VeLine },
  props:{
    type:{
      type: String,
      default: 'line'
    },
    shadow:{
      type: String,
      default: 'always'
    },
    title:{
      type: String,
      default: '图表标题'
    },
    chartData:{
      type : Object,
      default: {}
    },
    chartWidth:{
      type:String,
      default: '100%'
    },
    chartHeight:{
      type: String,
      default: '300px'
    }
  },
  watch:{},
  data() {
    return {}
  },
  mounted(){
  },
  methods:{
  }
}
</script>
<style lang="less" scoped>
.box-card{
  .title{
    font-size: 16px;
    font-weight: 400;
    color: #333333;
    line-height: 22px;
    margin-top: 4px;
  }
}
</style>
