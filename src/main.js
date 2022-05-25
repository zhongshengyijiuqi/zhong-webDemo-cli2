import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'
import VueCookie from 'vue-cookie'
import Components from '@/components'
import moment from 'moment'
import '@/plugins'


import Interceptors from '@/request/interceptors'
import filters from '@/extend/filters'
import directives from '@/extend/directives'
import mixins from '@/extend/mixins'
import utils from '@/utils'
import config from '@/config'
import yiyunComponents from 'library_component'
Vue.use(yiyunComponents)
import '@/assets/scss/main.scss'

Vue.config.productionTip = false

Vue.config.errorHandler = function (err, vm, info) {
  console.error(`Error：`, err)
  console.info(`Error-vm：`, vm)
  console.info(`Error-Info：`, info)
}
Vue.config.warnHandler = function (msg, vm, trace) {
  console.warn(`Warn：`, msg)
  console.info(`Warn-vm：`, vm)
  console.info(`Warn-Trace：`, trace)
}

window.addEventListener("unhandledrejection", function (e) {
  e.preventDefault()
  console.error('unhandledrejection：', e)
  return true
});
window.document.addEventListener("error", e => {
  if (e.target.tagName.toLowerCase() === 'img') {
    //有avatar代表头像
    if (e.target.getAttribute('avatar')) {
      e.target.src = "https://dl-yiyunappclient.effio.cn/resource/common/avatar.png"
    } else {
      e.target.src = "https://dl-yiyunappclient.effio.cn/resource/common/loadError.png"
    }
  }
}, true)
Object.assign(Vue.prototype, {
  $utils: utils,
  $config: config,
  $moment: moment,
  $_moment: (timestamp) => {
    // timestamp unit: ms
    return timestamp < 0 ? { format: () => "-" } : moment(timestamp)
  },
  $axios: axios,
})

Vue.use(Interceptors, axios)
Vue.use(VueLocalStorage, {
  name: 'ls'
})
Vue.use(VueCookie)
Vue.use(directives)
Vue.use(mixins)
Vue.use(filters)
Vue.use(Components)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
