const crumb = {
  state: {
    lists: []
  },
  getters: {
    getCrumb: state => {
      return state.lists
    }
  },
  mutations: {
    SET_CRUMB (state, payload) {
      state.lists = payload
    }
  }
}

export default crumb
