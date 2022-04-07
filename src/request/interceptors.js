export default {
  install(Vue, axios) {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.defaults.headers.common.withCredentials = true
    axios.defaults.timeout = 15000

    axios.interceptors.request.use((config) => {
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    axios.interceptors.response.use(async (res) => {
      let result
      switch (res.data.code) {
        case undefined:
          result = res.data
          break;
        case 100:
          result = res.data
          break;
        default:
          Vue.prototype.$message.error(res.data.msg)
          result = Promise.reject(res.data);
          break;
      }
      return result
    }, (error) => {
      if (error.code === "ECONNABORTED" && error.message.includes('timeout')) {
        Vue.prototype.$message.error('网络请求超时,请检查网络')
      }
      if (error.response) {
        const status_error = error.response.status
        switch (status_error) {
          case 400:
            Vue.prototype.$message.error('请求参数有误')
            break;
          case 401:
            Vue.prototype.$message.error('账号未授权')
            break;
          case 403:
            Vue.prototype.$message.error('账号无权限')
            break
          case 404:
            Vue.prototype.$message.error('请求地址有误')
            break
          case 405:
            Vue.prototype.$message.error('请求方法有误')
            break
          case 500:
            Vue.prototype.$message.error('服务器出错')
            break
          default:
            Vue.prototype.$message.error(`发生异常：${status_error}`)
            break
        }
      }
      return Promise.reject();
    })
  },
}
