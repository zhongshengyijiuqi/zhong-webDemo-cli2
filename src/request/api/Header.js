import {get, post} from '../methods'
import BaseRequest from './BaseRequest.js'

export default class Header extends BaseRequest {
  //获取跑马灯
  @get('/Common/HeadBar/GetMarquees')
  GetMarquees(opts) {
    return this._requestFormat(opts)
  }
  //获取更新日志
  @get('/Common/HeadBar/GetAppUpdateLogs')
  GetAppUpdateLogs(opts) {
    return this._requestFormat(opts)
  }
  //获取帮助中心
  @get('/Common/HeadBar/GetHelpCenter')
  GetHelpCenter(opts) {
    return this._requestFormat(opts)
  }
  //添加意见反馈
  @post('/Common/HeadBar/AddFeedback')
  AddFeedback(opts) {
    return this._requestFormat(opts)
  }
}
