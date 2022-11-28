<!-- 头部栏 -->

<template>
  <div class="header">
    <div class="header-wrap">
      <div class="header-wrap-left">
        <img
          class="logo"
          :src="`https://dl-yiyunsite.effio.cn/${userInfo.sitePostcode}/logo2.png`"
        />
        <!-- <img src="@/assets/images/common/logo.png" class="logo" /> -->
        <p
          :class="[
          'projectName',
          { active: $route.path !== '/help' && $route.path !== '/log' },
        ]"
          @click="goHome"
        >
          {{ userInfo.appName }}
        </p>
      </div>
      <div class="header-wrap-right">
        <div class="notification">
          <i class="el-icon-bell"></i>
          <yy-notification
            :width="376"
            :height="50"
            :informations="informations"
          >
          </yy-notification>
        </div>
        <div class="helpEntry">
          <el-dropdown
            trigger="hover"
            placement="bottom"
            @command="chooseItem"
          >
            <div class="el-dropdown-icon">
              <img
                src="@/assets/images/common/helpEntry.png"
                alt
              />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="help">
                <div class="dropdown-item">
                  <img
                    src="@/assets/images/common/help.png"
                    alt
                  />
                  <div class="dropdown-item-tip">帮助中心</div>
                </div>
              </el-dropdown-item>
              <el-dropdown-item command="feedback">
                <div class="dropdown-item">
                  <img
                    src="@/assets/images/common/feedback.png"
                    alt
                  />
                  <div class="dropdown-item-tip">意见反馈</div>
                </div>
              </el-dropdown-item>
              <el-dropdown-item command="log">
                <div class="dropdown-item">
                  <img
                    src="@/assets/images/common/log.png"
                    alt
                  />
                  <div class="dropdown-item-tip">更新日志</div>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="user">
          <img
            class="user-icon"
            :src="$utils.imgOnNull(`${userInfo.mbIcon}`, 1)"
            alt="1"
          />
          <p class="user-name">
            {{ userInfo.mbName ? userInfo.mbName : "暂无用户信息" }}
          </p>
        </div>
      </div>
    </div>
    <el-dialog
      custom-class="feedback"
      title="意见反馈"
      :close-on-click-modal="false"
      @close="dialogVisible = false"
      :visible="dialogVisible"
      width="700px"
    >
      <div class="feedbackBox">
        <div class="feedback-item">
          <div class="label required">意见填写</div>
          <el-input
            type="textarea"
            resize="none"
            show-word-limit
            :autosize="{ minRows: 5, maxRows: 10 }"
            placeholder="请输入内容，限200字"
            maxlength="200"
            v-model="opinion"
          >
          </el-input>
        </div>
        <div class="feedback-item">
          <div class="label">上传图片</div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            accept="image/*"
            :on-change="upload"
            :auto-upload="false"
          >
            <img
              class="picture"
              :src="picture"
              alt=""
              v-if="picture"
            />
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
        </div>
        <div class="feedback-item feedback-item-last">
          <div class="label required">联系方式</div>
          <el-input
            @input="limitTelephone"
            v-model.trim="telephone"
            placeholder="请输入"
          ></el-input>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submit"
        >提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SHeader',
  data() {
    return {
      opinion: '',
      picture: '',
      telephone: '',
      dialogVisible: false,
      informations: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  async mounted() {
    try {
      await this.getInformations()
    } catch (error) {
      this.$message.error(error)
    }
  },
  methods: {
    goHome() {
      this.$router.push('/home-dome1')
    },
    chooseItem(item) {
      if (item === 'feedback') {
        this.dialogVisible = true
        this.telephone = this.userInfo.phone
        this.opinion = ''
        this.picture = ''
      } else {
        this.$router.push(`/${item}`)
      }
    },
    async upload(file) {
      try {
        this.$utils.showLoading()
        this.picture = await this.uploadOss({
          file: file.raw
        })
        this.$utils.hideLoading()
      } catch (error) {
        this.$utils.hideLoading()
        this.$message.error(error)
      }
    },
    limitTelephone() {
      // let regexp = new RegExp(/\D/g)
      let regexp = new RegExp('\\D', 'g')
      this.telephone = this.telephone.replace(regexp, '')
    },
    async submit() {
      try {
        if ([!!this.opinion, !!this.telephone].includes(false)) {
          this.$message.error('必填项未填写')
          return
        }
        this.$utils.showLoading()
        await this.AddFeedback({
          feedback: this.opinion,
          extra: this.picture,
          phone: this.telephone,
          name: this.userInfo.mbName
        })
        await this.$utils.hideLoading()
        this.$message.success('提交成功')
        this.dialogVisible = false
      } catch (error) {
        this.$utils.hideLoading()
      }
    },
    ...mapActions(['GetMarquees', 'uploadOss', 'AddFeedback']),
    async getInformations() {
      try {
        let res = await this.GetMarquees()
        this.informations = res.data
      } catch (error) {
        this.$message.error(error)
      }
    }
  }
}
</script>

<style lang="scss">
.dropdown-item {
  display: flex;
  align-items: center;

  .dropdown-item-tip {
    color: #303133;
    margin-left: 15px;
  }
}
</style>
<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 62px;
  background: #02173d;
  .header-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    height: 100%;
    margin: 0 auto;
    padding: 0 38px 0 22px;
    background: #02173d;

    .header-wrap-left {
      display: flex;
      align-items: center;
      height: 100%;

      .logo {
        max-width: 500px;
        max-height: 34px;
      }

      .projectName {
        height: 100%;
        line-height: 62px;
        padding: 0 38px;
        margin-left: 30px;
        color: #909399;
        cursor: pointer;
      }

      .active {
        color: #ffffff;
        background: #263262;
      }
    }

    .header-wrap-right {
      display: flex;
      align-items: center;
      height: 100%;

      .notification {
        display: flex;
        align-items: center;
        height: 100%;

        .el-icon-bell {
          margin: 2px 6px 0 0;
          color: #ffffff;
          font-size: 16px;
        }

        .notification-container {
          display: flex;
          align-items: center;
          overflow: hidden;
          width: 376px;
          height: 100%;
          .notification-information {
            color: #ffffff;
            white-space: nowrap;
          }
        }
      }

      .user {
        display: flex;
        align-items: center;

        .user-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .user-name {
          margin: 0 0 0 6px;
          color: rgba(255, 255, 255, 1);
          font-weight: 500;
        }
      }

      .helpEntry {
        display: flex;
        align-items: center;
        height: 100%;
        margin: 0 10px;
        cursor: pointer;

        .el-dropdown {
          height: 100%;
          .el-dropdown-icon {
            display: flex;
            align-items: center;
            height: 100%;
            width: 100%;
            padding: 0 15px;
            outline: none;
          }

          &:hover {
            background: #263262;
          }
        }
      }
    }
  }

  .feedback {
    .feedbackBox {
      padding: 33px 109px;

      .feedback-item-last {
        align-items: center;
      }

      .feedback-item {
        display: flex;
        margin-bottom: 20px;
        .required {
          background: url('~@/assets/images/common/required.png') no-repeat;
        }

        .label {
          margin-right: 12px;
          padding: 0 0 0 10px;
          word-break: keep-all;
        }

        /deep/.el-textarea__inner {
          padding: 5px 15px 30px 15px;
        }

        /deep/.avatar-uploader {
          .el-upload {
            position: relative;
            overflow: hidden;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;

            &:hover {
              border-color: #036ed5;
            }

            .picture {
              width: 80px;
              height: 80px;
            }

            .avatar-uploader-icon {
              width: 80px;
              height: 80px;
              line-height: 80px;
              font-size: 28px;
              color: #8c939d;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
