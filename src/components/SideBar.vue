<!-- 侧边栏 -->
<template>
  <div
    class="sideBar"
    :class="{ 'is-zoom': isZoom }"
  >
    <el-menu
      :default-active="activeMenuItem"
      class="el-menu-vertical-demo"
      :default-openeds="['/home']"
      @select="selectHandler"
      :collapse="isZoom"
    >
      <el-submenu index="/home">
        <template slot="title">
          <img
            v-if="activeMenuItem.includes('home')"
            src="@/assets/images/common/home.png"
            alt=""
            class="sideBar-img"
          />
          <img
            v-else
            src="@/assets/images/common/home-disabled.png"
            alt=""
            class="sideBar-img"
          />
          <span class="menu-title">主页</span>
        </template>
        <el-menu-item
          index="/home-dome1"
          class="menu-title menu-item-sub"
        >主页1</el-menu-item>
        <el-menu-item
          index="/home-dome2"
          class="menu-title menu-item-sub"
        >主页2</el-menu-item>
      </el-submenu>
      <el-menu-item
        index="/set"
        :class="activeMenuItem.includes('set') ? 'is-active' : ''"
      >
        <img
          v-if="activeMenuItem.includes('set')"
          src="@/assets/images/common/set.png"
          alt=""
          class="sideBar-img"
        />
        <img
          v-else
          src="@/assets/images/common/set-disabled.png"
          alt=""
          class="sideBar-img"
        />
        <span
          slot="title"
          class="menu-title"
        >设置</span>
      </el-menu-item>
    </el-menu>
    <div
      class="icon-arrow"
      @click="zoomController"
    >
      <img
        src="@/assets/images/common/arrow.png"
        alt=""
        :style="isZoom ? 'transform: rotate(180deg);' : ''"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideBar',
  data() {
    return {
      isZoom: false,
      activeMenuItem: ''
    }
  },

  created() {},
  methods: {
    zoomController() {
      // 收起展开
      let isZoom = !this.isZoom
      this.$store.commit('isZoomList', isZoom)
    },
    selectHandler(index, indexPath) {
      // this.activeMenuItem = index;
      this.$router.push({ path: index, query: {} })
    }
  },
  computed: {
    ...mapGetters(['isZoomList'])
  },
  watch: {
    isZoomList(val) {
      //展开收起判断
      this.isZoom = val
    },
    $route: {
      handler(v) {
        this.activeMenuItem = v.path
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}
.is-zoom {
  width: 64px !important;
}

.sideBar {
  position: relative;
  width: 220px;
  height: 100%;
  flex-shrink: 0;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transition: all 0.5s;

  .sideBar-img {
    width: 26px;
  }

  .el-menu {
    border-right: none;
  }

  .el-menu-item.is-active {
    background: rgba(3, 110, 213, 1);
    color: #ffffff;

    .menu-title {
      padding-left: 14px;
      color: #ffffff;
    }
  }

  .menu-title {
    padding-left: 14px;
    color: #606266;
  }

  .menu-item-sub {
    padding-left: 59px !important;
  }
}

.icon-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 35%;
  right: -12px;
  width: 12px;
  height: 40px;
  background: #e0e2e4;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  z-index: 99;

  img {
    width: 10px;
    transition: all 0.5s;
  }
}

@keyframes shrinkLeft {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}

@keyframes shrinkright {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
</style>
