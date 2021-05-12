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
import breadCrumb from '@/components/breadCrumb'
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
            id: 20,
            name: "dataAnalysis",
            icon: "el-icon-s-data",
            alias: "数据分析",
            value: { path: "/dataAnalysis" },
          },
        },
        {
          entity: {
            id: 1,
            name: "systemManagement",
            icon: "el-icon-s-custom",
            alias: "系统管理",
          },
          childs: [
            {
              entity: {
                id: 3,
                name: "userManagement",
                icon: "el-icon-user",
                alias: "用户管理",
                value: { path: "/hello" },
              },
            },
            {
              entity: {
                id: 4,
                name: "roleManagement",
                icon: "el-icon-user-solid",
                alias: "角色管理",
                value: "/system/role",
              },
            }
          ],
        },
        {
          //一级
          entity: {
            id: 6,
            name: "userManage",
            icon: "el-icon-news",
            alias: "宠物信息管理",
          },
          //二级
          childs: [
            {
              entity: {
                id: 7,
                name: "accountManage",
                icon: "el-icon-phone-outline\r\n",
                alias: "帐号管理",
                value: "",
              },
              //三级
              childs: [
                {
                  entity: {
                    id: 14,
                    name: "emailManage",
                    icon: "el-icon-sold-out\r\n",
                    alias: "邮箱管理",
                    value: "/content/email",
                  },
                },
                {
                  entity: {
                    id: 13,
                    name: "passManage",
                    icon: "el-icon-service\r\n",
                    alias: "密码管理",
                    value: "/content/pass",
                  },
                },
              ],
            },
            {
              entity: {
                id: 8,
                name: "integralManage",
                icon: "el-icon-picture",
                alias: "积分管理",

                value: "/user/integral",
              },
            },
          ],
        },
        {
          entity: {
            id: 22,
            name: "留言反馈",
            icon: "el-icon-s-custom",
            alias: "留言反馈",
            value: { path: "/feedbackMessage" },
          },
          childs: [
            {
              entity: {
                id: 23,
                name: "feedback",
                icon: "el-icon-user",
                alias: "意见反馈",
                value: { path: "/feedback" },
              },
            },
            {
              entity: {
                id: 24,
                name: "leavingMessage",
                icon: "el-icon-user-solid",
                alias: "留言记录",
                value: { path: "/leavingMessage" },
              },
            }
          ],
        },
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  .menu-main {
    // height: calc(~"100vh - 16px");
    height: 100vh;
    box-shadow: 0px 0px 4px 2px rgb(0 0 0/ 7%);
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
