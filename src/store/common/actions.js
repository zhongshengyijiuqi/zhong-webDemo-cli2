import axios from 'axios'
import { commonRequest } from '@/request/api'
// 请求二维码
async function GetQRCode({ rootState }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.GetQRCode(params)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
// 提交日志
async function SubmitLog({ rootState }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.SubmitLog(params)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
// 获取token sdk
async function AuthorizeSDK({ commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.AuthorizeSDK(params)
      // 模拟token拿到慢的情况
      // await Vue.prototype.$utils.sleep(1000)
      commit('setTokenBar', res)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
//获取应用内用户信息
async function GetAppUserInfo({ rootState, commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.GetAppUserInfo()
      commit('setUserInfo', res)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
//层次模型及负责人
async function GetFactoryModelSupervisor({ rootState, commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.GetFactoryModelSupervisor(params)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
//设置层次模型负责人
async function UpdatetFactoryModelSupervisor({ rootState, commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.UpdatetFactoryModelSupervisor(params)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
//得到成员当前签到工位
async function GetStationSignInByMember({ rootState, commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.GetStationSignInByMember(params)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
//查询接口历史记录查询
async function GetSearchHistory({ rootState, commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.GetSearchHistory(params)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
//保存历史查询记录
async function SaveSearchHistory({ rootState, commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.SaveSearchHistory(params)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
//查询所有部门
async function GetDeptList({ rootState, commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.GetDeptList(params)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
//查询所有部门下的所有成员
async function GetMemberInfoByDept({ rootState, commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.GetMemberInfoByDept(params)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
//删OSS文件
async function DeleteFiles({ rootState, commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      await commonRequest.DeleteFiles(params)
    } catch (error) {
      reject(error)
    }
  })
}
async function setOssToken({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await commonRequest.GetOssPolicyToken()
      resolve(res)
      commit('setOssTokenRefreshTime', res.data.expire * 1000)
      commit('setOssToken', res.data)
    } catch (error) {
      reject(error)
    }
  })
}
const pureAxios = axios.create()
async function uploadOss({ state, dispatch }, { file }) {
  return new Promise(async (resolve, reject) => {
    let oss = state.ossToken
    if (!state.ossToken || !state.ossTokenRefreshTime || new Date().getTime() > state.ossTokenRefreshTime) {
      try {
        let res = await dispatch('setOssToken')
        oss = res.data
      } catch (error) {
        reject(error)
      }
    }
    let fileType
    let blob
    if (typeof (file) !== 'object') {
      let bytes = window.atob(file.split(',')[1])

      let array = []
      for (let i = 0; i < bytes.length; i++) {
        array.push(bytes.charCodeAt(i))
      }
      let base64Type = file.slice(file.indexOf(':') + 1, file.indexOf(';'))

      fileType = base64Type.slice(base64Type.indexOf('/') + 1)

      blob = new Blob([new Uint8Array(array)], {
        type: base64Type
      })
    } else {
      blob = file
      let temp = file.name.split('.')
      fileType = temp[temp.length - 1]
    }
    let filename = Date.now() + '.' + fileType
    let data = new FormData()
    data.append("key", oss.dir + "${filename}");
    data.append("callback", oss.callback);
    data.append("OSSAccessKeyId", oss.accessid);
    data.append("policy", oss.policy);
    data.append("signature", oss.signature);
    data.append("file", blob, filename);
    data.append("success_action_status", "200");
    try {
      let res = await pureAxios.post(oss.host, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      resolve(res.data.msg)
    } catch (error) {
      reject(error)
    }
  })
}

export {
  AuthorizeSDK,
  SubmitLog,
  GetQRCode,
  GetAppUserInfo,
  GetDeptList,
  GetMemberInfoByDept,
  DeleteFiles,
  setOssToken,
  uploadOss,
  GetFactoryModelSupervisor,
  UpdatetFactoryModelSupervisor,
  GetStationSignInByMember,
  GetSearchHistory,
  SaveSearchHistory
}