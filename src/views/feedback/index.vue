<template>
  <div class="content">
    <header>
      <el-form :inline="true" :model="searchForm" class="top-form">
        <el-row class="row">
            <el-form-item label="选择日期：">
              <el-date-picker
                v-model="searchForm.startDate"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="选择客户：">
              <el-input v-model.trim="searchForm.companyName" clearable ></el-input>
            </el-form-item>
            <el-form-item label="选择广告：">
              <el-input v-model.trim="searchForm.accountName" clearable ></el-input>
            </el-form-item>
            <el-form-item label="选择状态：">
              <el-select v-model="searchForm.transitState">
                <el-option value="" label="全部"></el-option>
                <el-option :value="1" label="开启"></el-option>
                <el-option :value="0" label="关闭"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class="search" type="primary" @click="search">筛选</el-button>
            </el-form-item>
        </el-row>
      </el-form>
    </header>
    <main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="customerID"
          label="客户ID"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="customerName"
          show-overflow-tooltip
          label="客户名称"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="advertisementName"
          show-overflow-tooltip
          label="广告名称"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="channel"
          label="投放渠道"
          min-width="140">
        </el-table-column>
        <el-table-column
          prop="CPCPrice"
          label="CPC价格"
          show-overflow-tooltip
          min-width="100">
          <template slot-scope="scope">
            {{ scope.row.CPCPrice ? scope.row.CPCPrice:'-' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="itemState"
          label="状态"
          align="center"
          min-width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.itemState===0">待定价</span>
            <span v-if="scope.row.itemState===1">待客户确认</span>
            <span v-if="scope.row.itemState===2">已生效(2020-1-1 10:10:00)</span>
            <span v-if="scope.row.itemState===3">客户已拒绝</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="操作"
          align="center"
          fixed="right"
          min-width="80">
          <template slot-scope="scope">
            <div class="operation" v-if="scope.row.itemState===0 || scope.row.itemState===3">
              <span @click="sumbit(scope.row)">定价</span>
            </div>
            <!-- <div class="operation" v-else>
              <span @click="edit(scope.row)">编辑</span>
            </div> -->
          </template>
        </el-table-column>
      </el-table>
    </main>
    <footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[20, 40, 60]"
        :page-size="pageSize"
        layout="total, sizes,prev, pager, next , jumper,->"
        :total="total">
      </el-pagination>
    </footer>
    <el-dialog
      title="编辑价格"
      :visible.sync="dialogState"
      @close="dialogClose"
      width="500px"
      center>
      <el-input style="width:390px;margin-right:5px" type="number" v-model="editPrice"></el-input> 元/条
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
export default {
  components:{  },
  data() {
    return {
      crumbs: [{ name: '留言反馈', path: '' }, { name: '意见反馈', path: '' }],
      searchForm:{
        startDate:'',
        companyName:'',
        accountName:'',
        transitState:''
      },
      tableData:[],
      editPrice:'',
      dialogState:false,
      total:0,
      pageSize:0,
      pageNo: 1,
    };
  },
  created () {
    this.$store.commit('SET_CRUMB', this.crumbs)
  },
  computed:{
    // ...mapState(['userInfo'])
  },
  mounted(){
    this.getTabelData()
    // this.userInfomation = this.$store.state.userInfo.userInfo
  },
  methods: {
    // ...mapMutations(['SET_USERINFO']),
    // getInfo(){
    // },
    search(){
      console.log(this.searchForm)
    },
    sumbit(item){
      this.dialogState = true;
      this.editPrice = item.CPCPrice
    },
    save(){
      console.log(this.editPrice)
      if(this.editPrice==''){
        this.$message({
          message: '请输入价格',
          type: 'error'
        });
      }else{
        this.dialogState = false,
        this.editPrice = ''
      }
    },
    getTabelData(){
      this.tableData=[
        {date:'2021-5-12',customerID:'468744165849',customerName:'打工人',advertisementName:'打工人打工魂',channel:'腾讯视频',CPCPrice:'',itemState:0},
        {date:'2021-5-20',customerID:'786727454278',customerName:'干饭人',advertisementName:'干饭人干饭魂干饭人干饭魂干饭人干饭魂干饭人干饭魂干饭人干饭魂干饭人干饭魂干饭人干饭魂',channel:'微信公众号',CPCPrice:'1314',itemState:1},
        {date:'2021-5-12',customerID:'468744165849',customerName:'零零人',advertisementName:'零零人',channel:'抖音',CPCPrice:'342',itemState:2},
        {date:'2021-5-20',customerID:'786727454278',customerName:'华夏',advertisementName:'华夏儿女',channel:'快手',CPCPrice:'520',itemState:3}
      ]
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNo = 1
      this.getTabelData()
    },
    handleCurrentChange(val) {
      this.pageNo = val
      this.getTabelData()
    },
    dialogClose(){
      this.editPrice = ''
    }
  },
};
</script>
<style lang="less" scoped>
</style>
<style lang="less">
header {
  padding: 24px 16px 0;
}
main {
  padding: 0 16px;
}
.el-table {
    font-size: 12px;
    color: #333;
  thead th {
    background: #F3F3F3;
  }
}
footer .el-pagination {
  height: 64px;
  padding: 18px 20px;
  text-align: right;
  background-color: #fff;
  box-sizing: border-box;
  font-weight: 400;
}
.operation {
  cursor: pointer;
  font-size: 12px;
  color: #eda063;
}
/* Chrome浏览器 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
/* Firefox浏览器 */
input[type="number"]{
    -moz-appearance: textfield;
}
</style>

