<template>
  <div class="home">

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'home',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([])
  },
  created() {},
  methods: {
    ...mapMutations([]),
    ...mapActions([])
  }
}
</script>

<style lang="scss" scoped>
.home {
  div {
    width: 200px;
    height: 60px;
    line-height: 60px;
    border: 1px solid #eeeeee;
    text-align: center;
  }
}
</style>
