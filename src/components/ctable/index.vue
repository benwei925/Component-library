<template>
  <div>
    <slot name="header"></slot>
    <div class="table-box">
      <slot name="table-title"/>
      <el-table
      :data="tableData"
      :border="border"
      :stripe="stripe"
      :height="height"
      @select-all="selectAll"
      @sort-change="sortChange"
      >
        <el-table-column
          v-if="selection"
          type="selection"
          :width="selectionWidth">
        </el-table-column>
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.key"
          :label="item.title"
          :show-overflow-tooltip="showTooltip"
          :sortable="sortArr&&sortArr.includes(item.key)&&sortable"
        >
        </el-table-column>
    </el-table>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
  props:{
    border:{
      type: Boolean,
      default: false
    },
    stripe:{
      type: Boolean,
      default: false
    },
    height:{
      type: [String,Number],
      default: null
    },
    selection:{
      type: Boolean,
      default: false
    },
    selectionWidth:{
      type: [String,Number],
      default: 55
    },
    showTooltip:{
      type:Boolean,
      default: false
    },
    sortable:{
      type: Boolean,
      default: false
    },
    sortArr:{
      type: Array,
      default:null
    }
  },
  data(){
    return{
      tableData:[
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      columns:[
        {
          title: "时间",
          key: "date"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "地点",
          key: "address"
        }
      ]
    }
  },
  methods:{
    sortChange(item){ //排序
      this.$emit('sortChange',item)
    },
    selectAll(selection){ //全选
      this.$emit('selectAll',selection)
    }
  }
}
</script>
<style scoped>

</style>
