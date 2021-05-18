<template>
  <div>
    <!-- <el-button type="primary">主要按钮</el-button>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-calendar v-model="value"> </el-calendar> -->
    <el-row>
      <el-col :span="12">
        <cardChart
          type="histogram"
          shadow="hover"
          :chartData="chartMapData"
          title="地域分析"
        >
          <template v-slot:title><i class="el-icon-s-data"></i></template>
        </cardChart>
      </el-col>
      <el-col :span="12">
        <cardChart
          shadow="hover"
          :chartData="chartData"
          title="下单分析"
        ></cardChart>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card class="box-card" shadow="always" style="padding: 0 8%">
          <ve-map
            :data="mapChartData"
            :settings="chartSettings"
            width="100%"
            height="380px"
            style="margin: 0px auto"
            :legend-visible="false"
          ></ve-map>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line";
import VeMap from "v-charts/lib/map.common";
import cardChart from "../../components/cardChart/index.vue";
export default {
  name: "dataAnalysis",
  components: { VeLine, VeMap, cardChart },
  data() {
    return {
      msg: "Welcome",
      input: "",
      value: new Date(),
      crumbs: [{ name: "数据分析", path: "" }],
      chartMapData: {
        columns: ["位置", "领养数", "性别"],
        rows: [
          { 位置: "吉林", 领养数: 123, 性别: 123 },
          { 位置: "北京", 领养数: 1223, 性别: 2123 },
          { 位置: "上海", 领养数: 2123, 性别: 1243 },
          { 位置: "浙江", 领养数: 4123, 性别: 5123 },
          { 位置: "河南", 领养数: 6223, 性别: 3123 },
          { 位置: "山东", 领养数: 9123, 性别: 5243 },
          { 位置: "海南", 领养数: 3123, 性别: 1153 },
        ],
      },
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },
      mapChartData: {
        columns: ["位置", "people"],
        rows: [
          { 位置: "南阳市", people: 123 },
          { 位置: "洛阳市", people: 1223 },
          { 位置: "周口市", people: 2123 },
          { 位置: "商丘市", people: 4123 },
          { 位置: "濮阳市", people: 8123 },
          { 位置: "三门峡市", people: 8123 },
        ],
      },
      chartSettings: {
        position: "province/henan", //位置  默认china  填写省市 要带province
        labelMap: {
          people: "人口", //修改指标名称
        },
        itemStyle: {
          normal: {
            //不选中样式
            borderColor: "#fff",
            areaColor: "#E6EFFF", //背景颜色
          },
          emphasis: {
            //选中样式
            areaColor: "#6A9FFF",
          },
        },
        label: {
          //文本设置
          show: true,
          fontSize: 8,
          fontWeight: 300,
          color: "#000000",
        },
      },
    };
  },
  created() {
    this.$store.commit("SET_CRUMB", this.crumbs);
  },
  methods: {
    changeSettings() {
      this.timer = Date.now();
      console.log("触发 watch");
    },
    afterConfig() {
      console.log(arguments);
      console.log("绘制延迟时间", Date.now() - (this.timer || Date.now()));
      return arguments[arguments.length - 1];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
<style lang="less" scoped>
.font-dinCondensed {
  font-family: "DinCondensed";
}
.num {
  font-size: 38px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 45px;
  margin: 14px 0 0 20px;
}
.el-row {
  .el-col {
    // margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
    .el-card {
      // margin-bottom: 5px;
    }
  }
}
</style>
