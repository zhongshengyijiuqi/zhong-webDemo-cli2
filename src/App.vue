<template>
  <div class="app">
    <div
      class="app-container"
      v-if="userInfo.mbGuid"
    >
      <SHeader v-if="headerVisible" />
      <div class="app-container-body">
        <SideBar v-if="sideBarVisible" />
        <keep-alive
          :include="[]"
          :exclude="[]"
        >
          <router-view class="routerView" />
        </keep-alive>
      </div>
    </div>
    <!-- <Skeleton animated v-else /> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['headerVisible', 'sideBarVisible', 'tokenBar', 'userInfo'])
  },
  async created() {
    try {
      let params = this.$utils.parseUrlParams()
      if (!params.memberId || !params.organizationId) {
        this.$message.error('缺少授权信息')
        return
      }
      this.$utils.showLoading()
      let authorizeSDKRequest = {
        // token: params.memberToken,
        mbGuid: params.memberId,
        orgGuid: params.organizationId,
        appType: 8
      }
      //授权
      await this.AuthorizeSDK(authorizeSDKRequest)
      this.$axios.defaults.headers.common['Authorization'] = `${this.tokenBar.token_type} ${this.tokenBar.access_token}`
      await this.GetAppUserInfo()
      this.$message.success('授权成功')
      this.resetSDK(authorizeSDKRequest)
      this.$utils.hideLoading()
    } catch (error) {
      this.$utils.hideLoading()
    }
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['GetAppUserInfo', 'AuthorizeSDK']),
    resetSDK(authorizeSDKRequest) {
      let timer = setTimeout(async () => {
        await this.AuthorizeSDK(authorizeSDKRequest)
        this.$axios.defaults.headers.common['Authorization'] = `${this.tokenBar.token_type} ${this.tokenBar.access_token}`
        this.resetSDK(authorizeSDKRequest)
        clearTimeout(timer)
      }, 30 * 60 * 1000)
    }
  }
}
</script>

<style lang="scss">
.app {
  overflow: auto;
  height: 100%;
  min-width: 1400px;
  min-height: 800px;
  background: rgba(255, 255, 255, 1);
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.app-container-body {
  display: flex;
  justify-content: space-between;
  flex: 1;
  min-height: 0;
  min-width: 0;
}

.routerView {
  flex: 1;
  overflow: auto;
  transition: all 0.5s;
}
</style>
