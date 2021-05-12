const getters = {
  userInfo: state => state.userInfo.userInfo,
  userName: state => (state.userInfo.userInfo.name && state.userInfo.userInfo.name) || '',
  userId: state => (state.userInfo.userInfo.id && state.userInfo.userInfo.id) || ''
}
export default getters
