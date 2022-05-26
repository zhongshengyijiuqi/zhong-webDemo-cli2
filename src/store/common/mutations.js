export default {
  setUserInfo(state, userInfo) {   //用户信息
    state.userInfo = userInfo
    document.title = userInfo.appName
    document.querySelector('#favicon').href = userInfo.appLogo
  },
  setTokenBar(state, tokenBar) {   //token
    state.tokenBar = tokenBar
  },
  setOssToken(state, ossToken) {
    state.ossToken = ossToken
  },
  setOssTokenRefreshTime(state, ossTokenRefreshTime) {
    state.ossTokenRefreshTime = ossTokenRefreshTime
  },
  setSideBarVisible(state, isVisible) {     //sidebar Controller
    state.sideBarVisible = isVisible
  },
  setHeaderVisible(state, isVisible) {     //header Controller
    state.headerVisible = isVisible
  },
  setUserRole(state, userRole) {   //用户本人权限
    state.userRole = userRole
  },
  isZoomList(state, isZoom) {   //侧边栏收起展开
    state.isZoom = isZoom
  },
}

