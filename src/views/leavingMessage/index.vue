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
            <el-form-item label="昵称：">
              <el-input v-model.trim="searchForm.companyName" clearable ></el-input>
            </el-form-item>
            <el-form-item label="内容：">
              <el-input v-model.trim="searchForm.accountName" clearable placeholder="输入内容，模糊搜索"></el-input>
            </el-form-item>
            <el-form-item label="选择状态：">
              <el-select v-model="searchForm.transitState">
                <el-option value="" label="全部"></el-option>
                <el-option :value="1" label="已回复"></el-option>
                <el-option :value="0" label="未回复"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class="search" type="primary" @click="search">搜索</el-button>
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
          prop="customerName"
          show-overflow-tooltip
          label="昵称"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="advertisementName"
          show-overflow-tooltip
          label="留言内容"
          min-width="500">
        </el-table-column>
        <el-table-column
          prop="itemState"
          label="状态"
          align="center"
          min-width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.itemState===0">已回复</span>
            <span v-if="scope.row.itemState===1">未回复</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="操作"
          align="center"
          fixed="right"
          min-width="80">
          <template slot-scope="scope">
            <div class="operation">
              <span v-if="scope.row.itemState===1" @click="reply(scope.row)">回复</span>
              <span v-else>查看</span>
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
      title="留言板"
      :visible.sync="dialogState"
      @close="dialogClose"
      width="500px"
      center>
      <div class="replyDialog">
        <p><span>留言内容：</span>{{text}}</p>
        <p>
          <span>回复留言：</span>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入回复内容"
            v-model="replyContent">
          </el-input>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
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
      crumbs: [{ name: '留言反馈', path: '' }, { name: '留言记录', path: '' }],
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
      text:'',
      replyContent:''
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
  },
  methods: {
    search(){
      console.log(this.searchForm)
    },
    reply(item){
      this.dialogState = true;
      this.text = item.advertisementName
      this.editPrice = item.CPCPrice
    },
    save(){
      console.log(this.editPrice)
    },
    getTabelData(){
      this.tableData=[
        {date:'2021-5-12',customerName:'打工人',advertisementName:'打工人打工魂打工人打工魂打工人打工魂打工人打工魂打工人打工魂打工人打工魂打工人打工魂打工人打工魂',itemState:0},
        {date:'2021-5-20',customerName:'零零人',advertisementName:'阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴',itemState:1}
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
.replyDialog {
  p {
    span {
      line-height: 30px;
    }
  }
}
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

