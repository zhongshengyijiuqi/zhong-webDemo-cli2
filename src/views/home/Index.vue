<template>
  <div class="home">home</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters([]),
  },
  created() {},
  methods: {
    ...mapMutations([]),
    ...mapActions([]),
  },
};
</script>

<style lang="less" scoped>
.home {
}
</style>
