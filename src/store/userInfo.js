const userInfo = {
  state: {
    userInfo: {
      name:localStorage.getItem('username')||'',
      password:localStorage.getItem('userpassword')||''
    },
    // token: window.localStorage.getItem('token') || '',
    // jurisdiction: null // 自定义数据包权限
  },
  getters: {
    getUserInfo: state => {
      return state.userInfo
    }
  },
  mutations: {
    SET_USERINFO (state, payload) {
      state.userInfo = payload
      window.localStorage.setItem('userInfo',payload);
      console.log(payload.name)
      window.localStorage.setItem('username',payload.name);
      window.localStorage.setItem('userpassword',payload.password);
    },
    // SET_TOKEN: (state, token) => {
    //   state.token = token
    //   window.localStorage.setItem('token', token)
    // },
    // SET_JURISDICTION (state, payload) {
    //   state.jurisdiction = payload
    // }
  }
}

export default userInfo
