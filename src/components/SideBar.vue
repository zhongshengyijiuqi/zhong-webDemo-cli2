<template>
  <div :class="['sidebar-scroll', isZoom ? 'is-zoom' : '']">
    <!-- <div v-if="mode==='tree'">
      <div class="nav-box" v-for="item in sidebarList" :key="item.id">
        <router-link class="nav-box-title" tag="div" :to="item.link">
          <img
            v-if="item.icon || item.disableIcon"
            :src="activeId_parent==item.id?item.icon:item.disableIcon"
            width="25px"
            height="25px"
          />
          <span class="nav-box-tip">{{item.name}}</span>
        </router-link>
        <router-link
          :class="activeId_child===nextItem.id ? 'nav-box-item-active':'nav-box-item'"
          tag="div"
          :to="nextItem.link"
          v-for="nextItem in item.children"
          :key="nextItem.id"
        >{{nextItem.name}}</router-link>
      </div>
    </div> -->
    <div v-if="mode === 'list'">
      <div
        :class="activeId === item.id ? 'nav-box-active' : 'nav-box'"
        v-for="item in sidebarList"
        :key="item.id"
      >
        <router-link class="nav-box-title" tag="div" :to="item.link">
          <img
            v-if="item.icon || item.disableIcon"
            :src="activeId === item.id ? item.icon : item.disableIcon"
            width="25px"
            height="25px"
          />
          <span
            :class="['nav-box-tip', isZoom ? 'is-zoom' : '']"
            v-show="!isZoom"
            >{{ item.name }}</span
          >
        </router-link>
      </div>
    </div>
    <div class="icon-arrow" @click="zoomController">
      <img
        src="@/assets/images/common/arrow.png"
        alt=""
        :style="isZoom ? 'transform: rotate(180deg);' : ''"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      mode: "list",
      isZoom: false,
      sidebarList: [
        {
          id: this.$utils.getUniqueId(),
          icon: require("@/assets/images/common/home.png"),
          disableIcon: require("@/assets/images/common/home-disabled.png"),
          name: "主页",
          link: "/home",
        },
        {
          id: this.$utils.getUniqueId(),
          icon: require("@/assets/images/common/set.png"),
          disableIcon: require("@/assets/images/common/set-disabled.png"),
          name: "设置",
          link: "/set",
          children: [],
        },
      ],
      activeId: null,
      // activeId_parent: null,
      // activeId_child: null,
    };
  },
  methods: {
    zoomController() {
      this.isZoom = !this.isZoom;
    },
  },
  watch: {
    $route: {
      handler(v) {
        // if (this.type === "tree") {
        //   this.activeId_parent = null;
        //   this.activeId_child = null;
        //   for (let item of this.sidebarList) {
        //     if (this.$route.path.includes(item.link)) {
        //       this.activeId_parent = item.id;
        //     }
        //     if (item.children) {
        //       for (let child of item.children) {
        //         if (this.$route.path == child.link) {
        //           this.activeId_child = child.id;
        //           break;
        //         }
        //       }
        //     }
        //   }
        // } else {
        this.activeId = null;
        for (let item of this.sidebarList) {
          if (this.$route.path.includes(item.link)) {
            this.activeId = item.id;
            break;
          }
        }
        // }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="less">
.is-zoom {
  width: 88px !important;
}
.sidebar-scroll {
  transition: all 0.5s;
  height: 100%;
  width: 220px;
  flex-shrink: 0;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
  user-select: none;
  background: #fff;
  padding: 10px 0 0 0;
  position: relative;
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
  .nav-box {
    cursor: pointer;
    align-items: center;
    display: flex;
    flex-direction: column;
    .nav-box-title {
      padding: 0 0 0 30px;
      height: 64px;
      display: flex;
      align-items: center;
      width: 100%;
      .nav-box-tip {
        margin-left: 9px;
        color: #778ca2;
        // opacity: 1;
        // transition: all 0.5s;
        -webkit-animation: shrinkright 0.5s 1 ease-in-out both;
        animation: shrinkright 0.5s 1 ease-in-out both;
      }
      .is-zoom {
        // opacity: 0;
        -webkit-animation: shrinkLeft 0.5s 1 ease-in-out both;
        animation: shrinkLeft 0.5s 1 ease-in-out both;
      }
    }
    .nav-box-title-active {
      padding: 0 0 0 30px;
      height: 64px;
      display: flex;
      align-items: center;
      width: 100%;
      .nav-box-tip {
        margin-left: 9px;
        color: #4a5a6b;
      }
    }
    .nav-box-item {
      color: #778ca2;
      height: 46px;
      display: flex;
      align-items: center;
      padding: 0 0 0 75px;
      cursor: pointer;
      width: 100%;
    }
    .nav-box-item-active {
      background-color: #f8fafb;
      color: #4a5a6b;
      height: 46px;
      display: flex;
      align-items: center;
      padding: 0 0 0 73px;
      cursor: pointer;
      width: 100%;
      border-left: 2px solid #0067ff;
    }
  }
  .nav-box-active {
    cursor: pointer;
    align-items: center;
    height: 64px;
    display: flex;
    background-color: #f8fafb;
    border-left: 3px solid #036ed5;
    .nav-box-title {
      display: flex;
      align-items: center;
      padding: 0 0 0 27px;
      width: 100%;
      height: 100%;
    }
    .nav-box-tip {
      margin-left: 9px;
      color: #303133;
      // opacity: 1;
      // transition: all 0.5s;
      -webkit-animation: shrinkright 0.5s 1 ease-in-out both;
      animation: shrinkright 0.5s 1 ease-in-out both;
    }
    .is-zoom {
      // opacity: 0;
      -webkit-animation: shrinkLeft 0.5s 1 ease-in-out both;
      animation: shrinkLeft 0.5s 1 ease-in-out both;
    }
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
