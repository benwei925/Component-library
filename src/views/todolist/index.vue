<template>
  <div class="todolist">
    <header>
      <section class="section-header">
        <label for="title">ToDoList</label>
        <p>
          <el-input v-model="thing" placeholder="添加ToDo" @change="addThing"></el-input>
          <el-button icon="el-icon-delete" circle @click="clearAllData"></el-button>
        </p>
    </section>
    </header>
    <main>
      <section>
        <h2>正在进行 <span>{{doinglist.length || 0}}</span></h2>
        <ol class="doinglist demo-box">
          <li v-for="(item,index) in doinglist" :key="item+index">
            <input type="checkbox" @click="selectThing(item,index,true)"/>
            {{item}}
            <span class="delect" @click="delect(index,true)"></span>
          </li>
        </ol>
        <h2>已经完成 <span>{{donelist.length || 0}}</span></h2>
        <ul class="donelist">
          <li v-for="(item,index) in donelist" :key="item+index">
            <input type="checkbox" checked="checked" @click="selectThing(item,index,false)"/>
            {{item}}
            <span class="delect" @click="delect(index,false)"></span>
          </li>
        </ul>
      </section>
    </main>
    <footer>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      crumbs: [{ name: "todolist", path: "" }],
      thing:'',
      doinglist: [],
      donelist: [],
      todoData: [],
    };
  },
  created() {
    this.$store.commit("SET_CRUMB", this.crumbs);
  },
  mounted(){
    this.doinglist = this.getDoingData()
    this.donelist = this.getDoneData()
  },
  methods:{
    addThing(){
      this.doinglist.push(this.thing)
      this.saveData(this.doinglist,true)
      this.doinglist = this.getDoingData()
      this.thing = ''
    },
    selectThing(item,index,state){
      state?this.doinglist.splice(index, 1):this.donelist.splice(index, 1)
      state?this.saveData(this.doinglist,true):this.saveData(this.donelist,false)
      state?this.donelist.push(item):this.doinglist.push(item)
      state?this.saveData(this.donelist,false):this.saveData(this.doinglist,true)
    },
    getDoingData() {
      let data = localStorage.getItem('todolistDoing')
      if (data !== null) {
        return JSON.parse(data)
      } else {
        return []
      }
    },
    getDoneData() {
      let data = localStorage.getItem('todolistDone')
      if (data !== null) {
        return JSON.parse(data)
      } else {
        return []
      }
    },
    saveData (data,state) {
      localStorage.setItem(state?'todolistDoing':'todolistDone', JSON.stringify(data))
      this.doinglist = this.getDoingData()
      this.donelist = this.getDoneData()
    },
    delect(index,type){
      type?this.doinglist.splice(index, 1):this.donelist.splice(index, 1)
      type?this.saveData(this.doinglist,true):this.saveData(this.donelist,false)
    },
    clearAllData(){
      this.saveData([],true)
      this.saveData([],false)
    }
  },
};
</script>
<style lang="less" scoped>
.todolist{
  margin: 0;
  padding: 0;
  font-size: 16px;
  background: #cdcdcd;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  // section {
  //   margin: 0 auto;
  // }
  header {
    width: 100%;
    height: 50px;
    background: #333;
    background: rgba(47, 47, 47, 0.98);
    display: flex;
    justify-content: center;
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      label {
        width: 100px;
        line-height: 50px;
        color: #ddd;
        font-size: 24px;
        cursor: pointer;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      }
      p{
        width: calc(~"100% - 200px");
        margin:0;
      }
      .el-button.is-circle {
        padding: 4px;
      }
      .el-input {
        width:  calc(~"100% - 41px");
        height: 26px;
        margin-right: 12px;
        border-radius: 5px;
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.24),0 1px 6px rgba(0, 0, 0, 0.45) inset;
        border: none;
        &:focus {
          outline-width: 0;
        }
      }
    }
  }
  main {
    section {
      margin: 0 auto;
      h2 {
        display: flex;
        justify-content: space-between;
        span {
          display: inline-block;
          padding: 0 5px;
          height: 20px;
          border-radius: 20px;
          background: #e6e6fa;
          line-height: 22px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
      }
      ol,
      ul {
        padding: 0;
        list-style: none;
      }
      ol li {
        cursor: move;
      }
      ul li {
        border-left: 5px solid #999;
        opacity: 0.5;
      }
      li {
        min-height: 32px;
        line-height: 32px;
        background: #fff;
        position: relative;
        margin-bottom: 10px;
        padding: 0 45px;
        border-radius: 3px;
        border-left: 5px solid #629a9c;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07);
        input {
          position: absolute;
          top: 2px;
          left: 10px;
          width: 22px;
          height: 22px;
          cursor: pointer;
        }
        .delect{
          position: absolute;
          top: 2px;
          right: 5px;
          display: inline-block;
          width: 14px;
          height: 12px;
          border-radius: 14px;
          border: 6px double #fff;
          background: #ccc;
          line-height: 14px;
          text-align: center;
          color: #fff;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
}

@media screen and (max-device-width: 620px) {
  section {
    width: 96%;
    padding: 0 2%;
  }
}
@media screen and (min-width: 620px) {
  section {
    width: 600px;
    padding: 0 10px;
  }
}
</style>
<style lang="less">
.todolist{
  .el-input__inner {
    width: 100%;
    height: 26px;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.24),0 1px 6px rgba(0, 0, 0, 0.45) inset;
    border: none;
    &:focus {
      outline-width: 0;
    }
  }
}
</style>
