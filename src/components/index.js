import Header from './Header.vue'
import SideBar from './SideBar.vue'
import Scroll from './Scroll.vue'
import Skeleton from './Skeleton.vue'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

export default {
  install(Vue) {
    Vue.component(Header.name, Header)
    Vue.component('SideBar', SideBar)
    Vue.component(Scroll.name, Scroll)
    Vue.component(Skeleton.name, Skeleton)
    
    Vue.use(VueVirtualScroller)
  },
}
