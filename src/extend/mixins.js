export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          mixinData: 'hello mixin'
        }
      },
      created() { 
        // this.mixinFunc()
      },
      methods: {
        mixinFunc() {
          console.log('mixinFunc')
        }
      }
    })
  }
}