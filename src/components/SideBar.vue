<template>
  <div class="sideBar" :class="{ 'is-zoom': isZoom }">
    <el-menu :default-active="activeMenuItem" class="el-menu-vertical-demo" :default-openeds="['/home']"
      @select="selectHandler" :collapse="isZoom">
      <el-submenu index="/home">
        <template slot="title">
          <img v-if="activeMenuItem.includes('home')" src="@/assets/images/common/home.png" alt=""
            class="sideBar-img" />
          <img v-else src="@/assets/images/common/home-disabled.png" alt="" class="sideBar-img" />
          <span class="menu-title">主页</span>
        </template>
        <el-menu-item index="/home-dome1" class="menu-title menu-item-sub">主页1</el-menu-item>
        <el-menu-item index="/home-dome2" class="menu-title menu-item-sub">主页2</el-menu-item>
      </el-submenu>
      <el-menu-item index="/set">
        <img v-if="activeMenuItem === '/set'" src="@/assets/images/common/set.png" alt="" class="sideBar-img" />
        <img v-else src="@/assets/images/common/set-disabled.png" alt="" class="sideBar-img" />
        <span slot="title" class="menu-title">设置</span>
      </el-menu-item>
    </el-menu>
    <div class="icon-arrow" @click="zoomController">
      <img src="@/assets/images/common/arrow.png" alt="" :style="isZoom ? 'transform: rotate(180deg);' : ''" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SideBar",
  data() {
    return {
      isZoom: false,
      activeMenuItem: "",
    };
  },

  created() {
    this.activeMenuItem = this.$route.path
  },
  methods: {
    zoomController() {
      this.isZoom = !this.isZoom;
    },
    selectHandler(index, indexPath) {
      this.activeMenuItem = index;
      this.$router.push({ path: index, query: {} });
    },
  },
  computed: {
    ...mapGetters(["sideBarPathList"])
  },
  watch: {
    sideBarPathList(val) {
      let path = val.split('/')
      this.activeMenuItem = '/' + path[1]
    },
  },
};
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
  height: 100%;
  width: 220px;
  flex-shrink: 0;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  position: relative;
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
      color: #ffffff;
      padding-left: 14px;
    }
  }

  .menu-title {
    color: #606266;
    padding-left: 14px;
  }

  .menu-item-sub {
    padding-left: 59px !important;
  }
}

.icon-arrow {
  position: absolute;
  width: 12px;
  height: 40px;
  background: #e0e2e4;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 35%;
  right: -12px;
  cursor: pointer;
  z-index: 99;

  img {
    transition: all 0.5s;
    width: 10px;
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
