import { headerRequest } from '@/request/api'
async function GetMarquees({ rootState, commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await headerRequest.GetMarquees(params)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
async function GetAppUpdateLogs({ rootState, commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await headerRequest.GetAppUpdateLogs(params)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
async function GetHelpCenter({ rootState, commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await headerRequest.GetHelpCenter(params)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
async function AddFeedback({ rootState, commit }, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await headerRequest.AddFeedback(params)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
export {
  GetMarquees,
  GetAppUpdateLogs,
  GetHelpCenter,
  AddFeedback,
}