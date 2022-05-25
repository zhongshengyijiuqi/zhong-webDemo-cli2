<template>
  <div class="set">set</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "set",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isZoomList"])
  },
  created() { },
  methods: {
    ...mapMutations([]),
    ...mapActions([]),
  },
  watch: {
    isZoomList(val) {
      console.log('val', val)
    },
  },
};
</script>

<style lang="scss" scoped>
.set {}
</style>
