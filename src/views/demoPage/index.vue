<template>
  <div>
    <header>
      222222222222222
    </header>
    <main>
    </main>
    <footer>
    </footer>
  </div>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
export default {
  components:{  },
  data() {
    return {
      crumbs: [{ name: '组件示例', path: '' }],
    };
  },
  created () {
    this.$store.commit('SET_CRUMB', this.crumbs)
  },
  computed:{
    // ...mapState(['userInfo'])
  },
  mounted(){
  },
  methods: {
  },
};
</script>
<style lang="less" scoped>
</style>
<style lang="less">
header {
}

main {
}

footer {
}
</style>

