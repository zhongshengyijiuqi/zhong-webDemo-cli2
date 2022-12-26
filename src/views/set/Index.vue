<template>
  <div class="set">set</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'set',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isZoomList'])
  },
  created() {},
  methods: {
    ...mapMutations([]),
    ...mapActions([])
  },
  watch: {
    async isZoomList(val) {
      await this.$utils.sleep(500) //echarts 自适应图表，要是页面有动画效果，动画多少秒，定时也是多少秒
      console.log('val', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.set {
}
</style>
