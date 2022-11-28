<template>
  <div class="help">
    <yy-markdown-directory :el="el"></yy-markdown-directory>
    <VueShowdown
      ref="markdown-body"
      class="markdown-body"
      :markdown="markdownValue"
      tag="div"
    />
  </div>
</template>

<script>
import hljs from 'highlight.js'
// import "highlight.js/styles/tomorrow-night-eighties.css";
// import "highlight.js/styles/tomorrow-night-bright.css";
// import "highlight.js/styles/rainbow.css";
// import "highlight.js/styles/railscasts.css";
// import "highlight.js/styles/hybrid.css";
// import "highlight.js/styles/atom-one-dark.css";
import 'highlight.js/styles/gruvbox-dark.css'
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'Help',
  data() {
    return {
      el: null,
      markdownValue: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      vm.setSideBarVisible(false)
      await vm.getHelp()
    })
  },
  beforeRouteLeave(to, from, next) {
    this.setSideBarVisible(true)
    this.el = null
    next()
  },
  methods: {
    ...mapMutations(['setSideBarVisible']),
    ...mapActions(['GetHelpCenter']),
    async getHelp() {
      try {
        this.$utils.showLoading()
        let res = await this.GetHelpCenter({
          appType: this.$route.query.appType
        })
        this.markdownValue = res.data || ''
        await this.$nextTick()
        let blocks = this.$refs['markdown-body'].$el.querySelectorAll('pre code')
        blocks.forEach((block) => {
          hljs.highlightBlock(block)
        })
        blocks = null
        this.el = this.$refs['markdown-body'].$el
        this.$utils.hideLoading()
      } catch (error) {
        this.$utils.hideLoading()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.help {
  display: flex;
  height: 100%;
  text-align: left;

  /deep/.markdown-body {
    flex: 1;
    overflow: auto;
    padding: 0 0 0 80px;

    pre {
      background: #282c34;
    }
  }
}
</style>
