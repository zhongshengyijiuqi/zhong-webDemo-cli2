import Vue from 'vue'
import VueShowdown from 'vue-showdown'
import 'github-markdown-css/github-markdown.css'
Vue.use(VueShowdown, {
    // 设置 showdown 默认 flavor
    flavor: 'github',
    // 设置 showdown 默认 options （会覆盖上面 flavor 的 options）
    options: {
      emoji: true,
      table:true
    },
})