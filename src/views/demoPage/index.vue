<template>
  <div>
    <header></header>
    <main>
      <el-row>
        <el-col :span="12">
          <cardChart
            type="histogram"
            shadow="hover"
            :chartData="chartMapData"
            title="柱状图"
          >
            <template v-slot:title><i class="el-icon-s-data"></i></template>
            <template v-slot:footer>柱状图</template>
          </cardChart>
        </el-col>
        <el-col :span="12">
          <cardChart shadow="hover" :chartData="chartData" title="【图表标题】">
            <template v-slot:title>【头部插槽，可自定义图标】</template>
            <template v-slot:footer>底部插槽，自定义内容</template>
          </cardChart>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <ctable :tableData="tableData" :columns="columns" tooltipEffect="dark" :total="100" :stripe="true">
            <span slot="pagination-slot">【分页插槽，需在layout中列出slot】</span>
          </ctable>
        </el-col>
      </el-row>
      <el-row class="borderRownone">
        <time-Slot ref="timeSlot"></time-Slot>
      </el-row>
    </main>
    <footer></footer>
  </div>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
import cardChart from "../../components/cardChart/index.vue";
import ctable from "../../components/ctable/index.vue";
import timeSlot from "../../components/timeSlot/index.vue"
export default {
  components: { cardChart, ctable, timeSlot },
  data() {
    return {
      crumbs: [{ name: "组件示例", path: "" }],
      tableData:[
        {
          // date: '2016-05-02',
          name: '李笑笑',
          address: '杭州市萧山区',
          phone: '12345678901'
        }, {
          date: '2016-05-04',
          // name: '王小虎',
          address: '杭州市西湖区',
          phone: '16666666666'
        }, {
          // date: '2016-05-01',
          name: '小红花',
          address: '杭州市拱墅区杭州市拱墅区杭州市拱墅区杭州市拱墅区杭州市拱墅区杭州市拱墅区杭州市拱墅区杭州市拱墅区杭州市拱墅区杭州市拱墅区杭州市拱墅区杭州市拱墅区杭州市拱墅区',
          // phone: '12345678901'
        }, {
          date: '2016-05-03',
          // name: '王小虎',
          address: '杭州市余杭区',
          phone: '12222333556'
        }
      ],
      columns:[
        {
          type:'selection'
        },
        {
          title:'序号',
          type:'index',
          index: 20
        },
        // {
        //   title:'拓展',
        //   type:'expand'
        // },
        {
          title: "时间",
          key: "date",
          // sortable: true,
          width:'120',
          resizable:true
        },
        {
          title: "名称",
          key: "name",
          width: "120",
        },
        {
          title: "地点",
          key: "address",
          showTooltip:true,
        },
        {
          title: "联系方式",
          key: "phone",
          fixed:'right',
        }
      ],
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
        columns: ["日期", "折线1", "折线2", "折线3"],
        rows: [
          { 日期: "1/1", 折线1: 1393, 折线2: 93, 折线3: 100 },
          { 日期: "1/2", 折线1: 3530, 折线2: 1230, 折线3: 200 },
          { 日期: "1/3", 折线1: 2923, 折线2: 2003, 折线3: 400 },
          { 日期: "1/4", 折线1: 1723, 折线2: 4003, 折线3: 800 },
          { 日期: "1/5", 折线1: 3792, 折线2: 1662, 折线3: 1600 },
          { 日期: "1/6", 折线1: 4593, 折线2: 3333, 折线3: 3200 },
        ],
      },

    };
  },
  created() {
    this.$store.commit("SET_CRUMB", this.crumbs);
  },
  computed: {
    // ...mapState(['userInfo'])
  },
  mounted() {},
  methods: {
    submit(){
      this.$refs.timeSlot.getData()
    }
  },
};
</script>
<style lang="less" scoped>
</style>
<style lang="less">
header {
}

main {
  padding: 20px;
  .el-table thead th {
    background: #f3f3f3;
  }
  .borderRownone {
    display: flex;
    align-items: center;
  }
}

footer {
}

</style>

