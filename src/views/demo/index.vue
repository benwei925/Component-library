<template>
  <div class="flex">
    <el-row>
      <SearchTable
        :search-col="searchCol"
        :table-col="tableCol">
      </SearchTable>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="hover">
          <h5>...mapState(['userInfo'])</h5>
          <h5>...mapMutations(['SET_USERINFO'])</h5>
          <el-tag type="info">{{userInfo.userInfo.name}}</el-tag>
          <el-tag type="info">{{userInfo.userInfo.password}}</el-tag>
          <el-input v-model="name" placeholder="请输入账号"></el-input>
          <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
          <el-button type="primary" @click="sumbit">提交</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <h5>this.$store.state.userInfo.userInfo</h5>
          <h5>this.$store.commit('SET_USERINFO',params)</h5>
          <el-tag type="info">{{userInfomation.name}}</el-tag>
          <el-tag type="info">{{userInfomation.password}}</el-tag>
          <el-input v-model="nameT" placeholder="请输入账号"></el-input>
          <el-input type="password" v-model="passwordT" placeholder="请输入密码"></el-input>
          <el-button type="primary" @click="sumbitInfo">提交</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import SearchTable from '../../components/searchTable/index.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  components:{ SearchTable },
  data() {
    return {
      userInfomation:{},
      name:'',
      password:'',
      nameT:'',
      passwordT:'',
      crumbs: [{ name: '广告管理', path: '' }, { name: 'CPC定价', path: '' }],
      searchCol: [
        // {
        //   title: '广告状态',
        //   dataKey: 'putState',
        //   valueEnum: advStatusOptsMerge
        // },
        // {
        //   title: '投放渠道',
        //   dataKey: 'putChannel',
        //   valueEnum: channelsList
        // },
        // {
        //   title: '广告名称',
        //   dataKey: 'advertName'
        // }
      ],
      tableCol: [
        { title: '', dataKey: 'advertEnable', minWidth: 60, slot: 'advertEnable' },
        { title: '广告名称', dataKey: 'advertName', width: 210, slot: 'advertName' },
        { title: '状态', dataKey: 'shulanPutInStatus', slot: 'shulanPutInStatus', minWidth: 100, attrs: { align: 'center' } },
        {
          title: '操作',
          edit: true,
          minWidth: 160,
          renderBtns: [
            {
              name: '编辑',
              click: scope => this.editAdvert(scope.row)
            },
            {
              name: '开启托管',
              hide: scope => scope.row.trusteeshipStatus == 0,
              click: scope => this.openTru(scope.row)
            },
            {
              name: '关闭托管',
              hide: scope => scope.row.trusteeshipStatus != 0,
              click: scope => this.closeTru(scope.row)
            }
          ]
        },
        // { title: '所属店铺', dataKey: 'shopName', minWidth: 160 },
        { title: '付费方式', dataKey: 'paymentType', minWidth: 80, slot: 'paymentType' },
        { title: '广告日预算', dataKey: 'totalAdvertBudget', minWidth: 100, attrs: { align: 'right' } },
        { title: '曝光量', dataKey: 'exposure', minWidth: 110, attrs: { sortable: 'custom', align: 'right' } },
        { title: '点击量', dataKey: 'hits', minWidth: 110, attrs: { sortable: 'custom', align: 'right' } },
        { title: '点击率', dataKey: 'clickThroughRate', minWidth: 110, format: this.formatRate, attrs: { sortable: 'custom', align: 'right' } },
        { title: '点击均价', dataKey: 'averageClickPrice', minWidth: 110, attrs: { sortable: 'custom', align: 'right' } },
        { title: '花费', dataKey: 'cost', minWidth: 110, attrs: { sortable: 'custom', align: 'right' } }
      ],
    };
  },
  created () {
    this.$store.commit('SET_CRUMB', this.crumbs)
  },
  computed:{
    ...mapState(['userInfo'])
  },
  mounted(){
    this.userInfomation = this.$store.state.userInfo.userInfo
    this.getInfo()
    // console.log('this.$store.state',this.$store.state.userInfo.userInfo)
  },
  methods: {
    ...mapMutations(['SET_USERINFO']),
    getInfo(){
    },
    sumbit(){
      if(this.name==''||this.password==''){
        this.$message.error('请输入信息')
      }else{
        let params = {
          name: this.name,
          password: this.password
        }
        this.SET_USERINFO(params)
        // this.userInfomation = this.$store.state.userInfo.userInfo
      }
    },
    sumbitInfo(){
      if(this.nameT==''||this.passwordT==''){
        this.$message.error('请输入信息')
      }else{
        let params = {
          name: this.nameT,
          password: this.passwordT
        }
        this.$store.commit('SET_USERINFO',params)
        // this.userInfomation = this.$store.state.userInfo.userInfo
      }
    },
    editAdvert(val){},
    openTru(val){},
    closeTru(val){}
  },
};
</script>
<style lang="less">
.flex {
  .el-input {
    width: 200px;
  }
}
</style>

