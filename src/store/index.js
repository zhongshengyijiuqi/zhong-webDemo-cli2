import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import header from './header'
import localstoragePlugin from './plugin/local-storage.js'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = () => new Vuex.Store({
  modules: {
    common,
    header
  },
  plugins: [localstoragePlugin],
  strict: debug,
})

export default store
