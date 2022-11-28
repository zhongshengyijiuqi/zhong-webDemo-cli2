<template>
  <div class="log">
    <div class="log_box">
      <div class="log_box_header">更新日志</div>
      <div class="log_box_main">
        <div
          v-for="log in logList"
          :key="log.year"
        >
          <div class="year">{{ `${log.year}年` }}</div>
          <el-timeline>
            <el-timeline-item
              v-for="timeline in log.logs"
              :key="timeline.createTime"
              :timestamp="
              $moment(timeline.createTime * 1000).format('MM月DD日')
            "
              placement="top"
            >
              <el-card>
                <pre>{{ timeline.updateRemarks }}</pre>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'Log',
  data() {
    return {
      logList: []
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setSideBarVisible(false)
      vm.getLogList()
    })
  },
  beforeRouteLeave(to, from, next) {
    this.setSideBarVisible(true)
    next()
  },
  methods: {
    ...mapMutations(['setSideBarVisible']),
    ...mapActions(['GetAppUpdateLogs']),
    async getLogList() {
      try {
        this.$utils.showLoading()
        let res = await this.GetAppUpdateLogs({
          page: 1,
          num: 1000
        })
        let years = [...new Set(res.data.map((v) => v.year))]
        this.logList = years.map((year) => {
          return {
            year: year,
            logs: res.data.filter((d) => d.year == year)
          }
        })
        this.$utils.hideLoading()
      } catch (error) {
        this.$utils.hideLoading()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.log {
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 20px 0 0 0;

  .log_box {
    width: 1200px;
    height: 100%;
    background-color: #ffffff;
    .log_box_header {
      height: 70px;
      padding: 20px 0 0 32px;
      border-bottom: 1px solid rgba(237, 237, 237, 1);
      font-size: 20px;
      font-weight: 600;
      color: #303133;
    }

    .log_box_main {
      overflow: auto;
      height: calc(100% - 70px);
      padding: 50px 95px 0 170px;
      .year {
        position: relative;
        width: 80px;
        height: 30px;
        line-height: 30px;
        margin: 0 0 20px -30px;
        border-radius: 4px;
        background: #036ed5;
        color: #ffffff;
        text-align: center;
        &::before {
          content: ' ';
          position: absolute;
          top: 30px;
          left: -1px;
          right: 0;
          width: 1px;
          height: 21px;
          margin: auto;
          background: #ededed;
        }
      }

      /deep/.el-timeline {
        .el-timeline-item__tail {
          left: 9px;
          top: 9px;
          border-left: 1px solid rgba(237, 237, 237, 1);
        }

        .el-timeline-item__node {
          width: 21px;
          height: 21px;
          background-color: rgba(254, 121, 7, 0.2);

          &::before {
            content: ' ';
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #fe7907;
          }
        }

        .el-timeline-item__wrapper {
          .el-timeline-item__timestamp {
            position: absolute;
            left: -88px;
            top: 3px;
            width: 68px;
            text-align: right;
          }

          .el-timeline-item__content {
            position: relative;
            margin: 0px 0px 0px 15px;

            &::before {
              content: ' ';
              position: absolute;
              top: 12px;
              left: -6px;
              width: 10px;
              height: 10px;
              border-left: 1px solid #e8ecef;
              border-bottom: 1px solid #e8ecef;
              background-color: #ffffff;
              transform: rotate(45deg);
            }

            .el-card.is-always-shadow {
              box-shadow: 1px 0px 6px 0px rgba(0, 0, 0, 0.05);
            }
          }
        }
      }
    }
  }
}
</style>
