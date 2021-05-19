<template>
  <div id="app">
    <el-menu
      background-color="#ffffff"
      class="menu-main"
      text-color="#8D96A5"
      active-text-color="#3D6DF1"
      :default-active="activeIndex"
      router
    >
      <div class="menu-header">组件库</div>
      <NavMenu :navMenus="menuData"></NavMenu>
    </el-menu>
    <div class="mainBox">
      <breadCrumb></breadCrumb>
      <div class="main-box">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from "./components/navMenu/index.vue";
import breadCrumb from "@/components/breadCrumb";
export default {
  name: "App",
  components: { NavMenu, breadCrumb },
  data() {
    return {
      activeIndex: "homePage",
      menuData: [
        {
          //一级
          entity: {
            id: 0,
            name: "homePage",
            icon: "el-icon-s-home",
            alias: "首页",
          },
        },
        {
          entity: {
            id: 1,
            name: "dataAnalysis",
            icon: "el-icon-s-data",
            alias: "数据分析",
            value: { path: "/dataAnalysis" },
          },
        },
        {
          entity: {
            id: 2,
            name: "demoPage",
            icon: "el-icon-s-operation",
            alias: "组件示例",
            value: { path: "/demoPage" },
          },
        },
        {
          entity: {
            id: 3,
            name: "todolist",
            icon: "el-icon-notebook-1",
            alias: "待办事项",
            value: { path: "/todolist" },
          },
        },
        // {
        //   entity: {
        //     id: 1,
        //     name: "systemManagement",
        //     icon: "el-icon-s-custom",
        //     alias: "系统管理",
        //   },
        //   childs: [
        //     {
        //       entity: {
        //         id: 3,
        //         name: "userManagement",
        //         icon: "el-icon-user",
        //         alias: "用户管理",
        //         value: { path: "/hello" },
        //       },
        //     },
        //     {
        //       entity: {
        //         id: 4,
        //         name: "roleManagement",
        //         icon: "el-icon-user-solid",
        //         alias: "角色管理",
        //         value: "/system/role",
        //       },
        //     }
        //   ],
        // },
        //}
      ],
    };
  },
  //刷新不折叠导航
  mounted() {
    let start = window.location.href.lastIndexOf("/");
    let path = window.location.href.slice(start + 1);
    this.activeIndex = path;
  },
};
</script>

<style lang="less" scoped>
@import "./styles/common.less";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  .menu-main {
    // height: calc(~"100vh - 16px");
    height: 100vh;
    box-shadow: 0px 0px 4px 2px rgb(0 0 0/ 7%);
    .menu-header {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .mainBox {
    width: calc(~"100% - 240px");
    // min-height: 100vh;
    min-height: calc(~"100vh - 46px");
    border-radius: 4px;
    padding: 29px 20px 0;
    .main-box {
      // padding: 20px 0;
      // margin: 0 20px;
      // background: rgb(247,249,253);
      height: calc(~"100vh - 66px");
      overflow-y: scroll;
      box-shadow: 0px 2px 10px 2px #e5e5e5;
      // width: calc(~"100% - 200px");
    }
  }
}
.el-menu {
  width: 200px;
  border: none;
}
</style>
