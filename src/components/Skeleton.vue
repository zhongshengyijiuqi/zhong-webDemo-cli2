<!-- 骨架屏 -->
<template>
  <el-skeleton animated>
    <template slot="template">
      <el-skeleton-item style="height: 64px" />
      <div style="display: flex; align-items: flex-start">
        <div style="width: 220px; height: 1000px">
          <el-skeleton-item
            variant="text"
            style="width: 220px; height: 1000px"
          />
        </div>
        <div style="margin-left: 20px">
          <el-skeleton-item
            variant="text"
            style="width: 1650px; height: 150px; margin-bottom: 20px"
            v-for="row in 5"
            :key="row"
          />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script>
export default {
  name: 'Skeleton'
}
</script>

<style lang="scss" scoped>
</style>