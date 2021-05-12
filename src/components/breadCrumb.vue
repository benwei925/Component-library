<template>
<div class="fixedcrumb" v-if="crumbs.length>0">
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item v-for="(item,index) in crumbs" :key="index">
  	<router-link v-if="item.path!=''" :to="item.path" >{{item.name}}</router-link>
  	<span v-else>{{item.name}}</span>
  </el-breadcrumb-item>
</el-breadcrumb>
</div>
</template>

<script>
export default {
  name: "breadCrumb",
//   props: {
//     crumbs: {
//       type: Array,
//       default: []
//     }
//   }
  computed: {
    crumbs() {
      return this.$store.state.crumb.lists;
    }
  }
};
</script>

<style lang="less">
// .fixedcrumb{
// 	position: fixed;
// 	top:28px;
// 	left:230px;
// 	.el-breadcrumb{
// 		color: #333 !important;
// 		font-size: 18px;
// 		line-height: 24px;
// 	}
// 	.el-breadcrumb__separator{
// 		font-weight: 400;
// 		color: #333;
// 	}
// 	.el-breadcrumb__inner{
// 		color: #333 !important;
// 	}
// 	.el-breadcrumb__inner a{
// 		color: #333 !important;
// 		font-size: 18px;
// 		font-weight: 400;
// 		&:hover{
// 			color: #2870FF !important;
// 		}
// 	}
// }
// @media screen and (max-width: 1500px) {
//   .fixedcrumb {
//     top: 23px;
//     .el-breadcrumb {
//       font-size: 16px;
//       line-height: 24px;
//     }
//   }
// }
.fixedcrumb{
	padding-bottom: 16px;
	.el-breadcrumb{
		color: #666 !important;
		font-size: 14px;
		line-height: 20px;
	}
	.el-breadcrumb__separator{
		font-weight: 400;
		color: #666;
	}
	.el-breadcrumb__inner{
		color: #666 !important;
	}

	.el-breadcrumb__inner a{
		cursor: pointer;
		color: #666 !important;
		font-size: 14px;
		font-weight: 400;
		&:hover{
			color: #EDA063 !important;
		}
	}
	.el-breadcrumb__item:last-child .el-breadcrumb__inner{
		color: #333 !important;
	}
}
</style>
