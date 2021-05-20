<style lang="less">
.c-table {
  &-main {
    .el-table {
      thead {
        color: #333;
        font-size: 12px;
        th {
          background: #F3F3F3;
        }
        .cell {
          line-height: 24px;
        }
      }
    }
  }
  &-footer {
    padding: 18px 20px;
    .el-pagination ul li {
      height: 28px;
      line-height: 28px;
      font-size: 13px;
      font-weight: 400;
    }
    .el-pager li{
      &.active {
        color: #EDA063;
      }
      &:not(.active) {
        color: #606266;
      }
    }
  }
}
</style>
<template>
  <div class="c-table">
    <slot name="header"></slot>
    <div class="c-table-main">
      <slot name="table-title"/>
      <el-table
        :data="tableData"
        :height="height"
        :max-height="maxHeight"
        :stripe="stripe"
        :border="border"
        :size="size"
        :fit="fit"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        :current-row-key="currentRowKey"
        :row-class-name="rowclassName"
        :row-style="rowStyle"
        :cell-class-name="cellClassName"
        :cell-style="cellStyle"
        :header-row-class-name="headerRowClassName"
        :header-row-style="headerRowStyle"
        :header-cell-class-name="headerCellClassName"
        :header-cell-style="headerCellStyle"
        :row-key="rowKey"
        :empty-text="emptyText"
        :default-expand-all="defaultExpandAll"
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        :span-method="spanMethod"
        :select-on-indeterminate="selectOnIndeterminate"
        :indent="indent"
        :lazy="lazy"
        :load="load"
        :tree-props="treeProps"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectionChange"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        @cell-click="cellClick"
        @cell-dblclick="cellDblclick"
        @row-click="rowClick"
        @row-contextmenu="rowContextmenu"
        @row-dblclick="rowDblclick"
        @header-click="headerClick"
        @header-contextmenu="headerContextmenu"
        @sort-change="sortChange"
        @filter-change="filterChange"
        @current-change="currentChange"
        @header-dragend="headerDragend"
        @expand-change="expandChange"
      >
        <el-table-column
          v-for="item in columnss"
          :type="item.type"
          :index="item.type=='index'&&(typeof item.index=='number'||typeof item.index=='function')?item.index:null"
          :label="item.title"
          :prop="item.key"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :key="item.key"
          :sortable="item.sortable"
          :sort-orders="item.sortable?item.sortOrders:['ascending', 'descending', null]"
          :resizable="border?item.resizable:false"
          :formatter="item.formatter"
          :show-overflow-tooltip="tooltipEffect?item.showTooltip:false"
          :align="item.align"
          :header-align="item.headerAlign"
          :class-name="item.className"
          :label-class-name="item.labelClassName"
          :selectable="item.type=='selection'?item.selectable:null"
          :filters="item.filters"
          :filter-placement="item.filterPlacement"
          :filter-multiple="item.filterMultiple"
          :filter-method="item.filterMethod"
          :filtered-value="item.filteredValue"
        >
        </el-table-column>
    </el-table>
    </div>
    <div class="c-table-footer">
      <el-pagination
        :style="{'text-align':paginationAlgin}"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        :small="paginationSize"
        :background="paginationBackground"
        :page-size="currentPageSize"
        :total="currentTotal"
        :page-count="pageCount"
        :pager-count="pagerCount"
        :current-page="currentPage"
        :layout="layout"
        :page-sizes="currentPageSizes"
        :popper-class="popperClass"
        :prev-text="prevText"
        :next-text="nextText"
        :disabled="paginationDisabled"
        :hide-on-single-page="hideSinglePage"
      >
        <slot name="pagination-slot"></slot>
      </el-pagination>
    </div>
    <!-- <slot name="footer"></slot> -->
  </div>
</template>
<script>
export default {
  props:{
    /**
     * 表格属性
     */
    tableData:{ //显示的数据
      type: Array,
      default () {
        return [];
      }
    },
    columns:{
      type: Array,
      default () {
        return [];
      }
    },
    height:{  //Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
      type: [String,Number],
      default: null
    },
    maxHeight:{ //Table 的最大高度。合法的值为数字或者单位为 px 的高度。
      type: [String,Number],
      default: null
    },
    stripe:{  //是否为斑马纹 table
      type: Boolean,
      default: false
    },
    border:{  //是否带有纵向边框
      type: Boolean,
      default: false
    },
    size:{  //Table 的尺寸 可选(medium , small , mini)
      type: String
    },
    fit:{ //列的宽度是否自撑开
      type: Boolean,
      default: true
    },
    showHeader:{  //是否显示表头
      type: Boolean,
      default: true
    },
    highlightCurrentRow:{ //是否要高亮当前行
      type: Boolean,
      default: false
    },
    currentRowKey:{ //当前行的 key，只写属性
      type: [String,Number],
      default: null
    },
    rowclassName:{  //行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
      type: [Function,String]
    },
    rowStyle:{  //	行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
      type: [Function,Object]
    },
    cellClassName:{ //单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
      type: [Function,String]
    },
    cellStyle:{ //单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
      type: [Function,Object]
    },
    headerRowClassName:{  //表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      type: [Function,String]
    },
    headerRowStyle:{  //表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
      type: [Function,Object]
    },
    headerCellClassName:{ //表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
      type: [Function,String]
    },
    headerCellStyle:{ //表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
      type: [Function,Object]
    },
    rowKey:{  //行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
      type: [Function,String]
    },
    emptyText:{ //空数据时显示的文本内容，也可以通过 slot="empty" 设置
      type:String,
      default: "暂无数据"
    },
    defaultExpandAll:{  //是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
      type: Boolean,
      default: false
    },
    // expandRowKeys:{ //可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
    //   type: Array,
    //   default () {
    //     return [];
    //   }
    // },
    defaultSort:{ //默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序
      type: Object
    },
    tooltipEffect:{ //tooltip effect 属性 可选(	dark,light)
      type: String,
      default: null
    },
    showSummary:{ //是否在表尾显示合计行
      type: Boolean,
      default: false
    },
    sumText:{ //	合计行第一列的文本
      type:String,
      default: "合计"
    },
    summaryMethod:{ //自定义的合计计算方法
      type: Function
    },
    spanMethod:{  //	合并行或列的计算方法
      type: Function
    },
    selectOnIndeterminate:{ //在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行
      type: Boolean,
      default: true
    },
    indent:{
      type: Number, //展示树形数据时，树节点的缩进
      default: 16
    },
    lazy:{
      type: Boolean,  //是否懒加载子节点数据
      default: null
    },
    load:{  //加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
      type: Function
    },
    treeProps:{ //	渲染嵌套数据的配置选项
      type: Object,
      default() {
        return { hasChildren: 'hasChildren', children: 'children' };
      }
    },
    selection:{
      type: Boolean,
      default: false
    },

    /**
     * 分页属性
     */

    paginationAlgin:{ //分页位置，可选(left,center,right)
      type: String,
      default: 'right'
    },
    paginationSize: { //是否使用小型分页样式
      type: Boolean,
      default: false
    },
    paginationBackground: { //是否为分页按钮添加背景色
      type: Boolean,
      default: false
    },
    layout: { //组件布局，子组件名用逗号分隔
      type: String,
      default:"total, sizes, prev, pager, next, jumper, slot"
    },
    current:{ //当前页数，支持 .sync 修饰符
      type: Number,
      default: 1
    },
    pageSizes:{ //	每页显示个数选择器的选项设置
      type: Array,
      default(){
        return [10, 20, 50, 100]
      }
    },
    pageSize:{  //每页显示条目个数，支持 .sync 修饰符
      type: Number,
      default:10
    },
    total: {  //总条目数
      type: Number,
      default:0
    },
    pageCount:{ //总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性
      type: Number
    },
    pagerCount:{  //页码按钮的数量，当总页数超过该值时会折叠
      type: Number,
      default: 7
    },
    popperClass: {  //每页显示个数选择器的下拉框类名
      type: String,
      default:''
    },
    prevText: { //替代图标显示的上一页文字
      type: String,
      default: ''
    },
    nextText: { //替代图标显示的下一页文字
      type: String,
      default: ''
    },
    paginationDisabled: { //是否禁用
      type: Boolean,
      default: false
    },
    hideSinglePage:{  //只有一页时是否隐藏
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      columnss:this.columns,
      currentPage:this.current,
      currentPageSizes:this.pageSizes,
      currentPageSize:this.pageSize,
      currentTotal:this.total
    }
  },
  watch: {
    total (val) {
      let maxPage = Math.ceil(val / this.currentPageSize);
      if (maxPage < this.currentPage && maxPage > 0) {
        this.currentPage = maxPage;
      }
      this.currentTotal = val;
    },
    tableData: {
      handler (item) {
        this.getNull(item)
      },
      deep: true
    },
    current (val) {
      this.currentPage = val;
    },
    pageSize (val) {
      this.currentPageSize = val;
    },
    columns (val) {
      this.columnss = val;
    }
  },
  mounted(){
    this.getNull(this.tableData)
  },
  methods:{
    getNull(item){  //数据为空替换
      for(let values of item.values()) {
        // let keyArr = Reflect.ownKeys(values) //存储数据对象键名
        for(let valuess of this.columnss.values()) {
          values[valuess.key] = (values[valuess.key] == null || values[valuess.key]==="")?'--':values[valuess.key]  //将列表直接赋值的数据，为空替换
        }
      }
    },
    select(selection, row){ //当用户手动勾选数据行的 Checkbox 时触发的事件
    this.$emit('select',selection, row)
    },
    selectAll(selection){ //当用户手动勾选全选 Checkbox 时触发的事件
      this.$emit('selectAll',selection)
    },
    selectionChange(selection){  //当选择项发生变化时会触发该事件
    this.$emit('selectionChange',selection)
    },
    cellMouseEnter(row, column, cell, event){ //当单元格 hover 进入时会触发该事件
      this.$emit('cellMouseEnter',row, column, cell, event)
    },
    cellMouseLeave(row, column, cell, event){ //当单元格 hover 退出时会触发该事件
      this.$emit('cellMouseLeave',row, column, cell, event)
    },
    cellClick(row, column, cell, event){  //当某个单元格被点击时会触发该事件
      this.$emit('cellClick',row, column, cell, event)
    },
    cellDblclick(row, column, cell, event){ //当某个单元格被双击击时会触发该事件
      this.$emit('cellDblclick',row, column, cell, event)
    },
    rowClick(row, column, event){ //当某一行被点击时会触发该事件
      this.$emit('rowClick',row, column, event)
    },
    rowContextmenu(row, column, event){ //当某一行被鼠标右键点击时会触发该事件
      this.$emit('rowContextmenu',row, column, event)
    },
    rowDblclick(row, column, event){  //当某一行被双击时会触发该事件
      this.$emit('rowDblclick',row, column, event)
    },
    headerClick(column, event){ //当某一列的表头被点击时会触发该事件
      this.$emit('headerClick',column, event)
    },
    headerContextmenu(column, event){ //当某一列的表头被鼠标右键点击时触发该事件
      this.$emit('headerContextmenu',column, event)
    },
    sortChange(column, prop, order){ //当表格的排序条件发生变化的时候会触发该事件
      this.$emit('sortChange',column, prop, order)
    },
    filterChange(filters){  //当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。
      this.$emit('filterChange',filters)
    },
    currentChange(currentRow, oldCurrentRow){ //当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
      this.$emit('currentChange',currentRow, oldCurrentRow)
    },
    headerDragend(newWidth, oldWidth, column, event){ //当拖动表头改变了列的宽度的时候会触发该事件
      this.$emit('headerDragend',newWidth, oldWidth, column, event)
    },
    expandChange(row, expandedRows){  //当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）
      this.$emit('expandChange',row, expandedRows)
    },
    handleSizeChange(val) { //pageSize 改变时会触发,回调参数(每页条数)
      this.$emit('handleSizeChange',val)
    },
    handleCurrentChange(val) {  //currentPage 改变时会触发,回调参数(当前页)
      this.$emit('handleCurrentChange',val)
    },
    handlePrevClick(val) {  //用户点击上一页按钮改变当前页后触发
      this.$emit('handlePrevClick',val)
    },
    handleNextClick(val) {  //用户点击下一页按钮改变当前页后触发
      this.$emit('handleNextClick',val)
    }
  }
}
</script>

