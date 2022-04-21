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
    ...mapGetters([]),
  },
  created() {},
  methods: {
    ...mapMutations([]),
    ...mapActions([]),
  },
};
</script>

<style lang="scss" scoped>
.set {}
</style>
