import {get, post} from '../methods'
import BaseRequest from './BaseRequest.js'

export default class Common extends BaseRequest {
  //提交日志
  @get('/Common/User/SubmitLog')
  SubmitLog(opts) {
    return this._requestFormat(opts)
  }
  //OSS授权
  @get('/Common/User/GetOSSSigned')
  GetOSSSigned(opts) {
    return this._requestFormat(opts)
  }
  //请求二维码
  @post('/Common/User/GetQRCode')
  GetQRCode(opts) {
    return this._requestFormat(opts)
  }
  //删OSS文件
  @post('/Common/User/DeleteFiles')
  DeleteFiles(opts) {
    return this._requestFormat(opts)
  }
  //app授权
  @post('/Auth/AuthorizeSDK')
  AuthorizeSDK(opts) {
    return this._requestFormat(opts)
  }
  //获取应用内用户信息
  @get('/Common/User/GetAppUserInfo')
  GetAppUserInfo(opts) {
    return this._requestFormat(opts)
  }
  //查询所有部门
  @get('/Common/User/GetDeptList')
  GetDeptList(opts) {
    return this._requestFormat(opts)
  }
  //查询所有部门下的所有成员
  @post('/Common/User/GetMemberInfoByDept')
  GetMemberInfoByDept(opts) {
    return this._requestFormat(opts)
  }
  //层次模型及负责人
  @get('/Common/CommonFactoryModelSupervisor/GetFactoryModelSupervisor')
  GetFactoryModelSupervisor(opts) {
    return this._requestFormat(opts)
  }
  //设置层次模型负责人
  @post('/Common/CommonFactoryModelSupervisor/UpdatetFactoryModelSupervisor')
  UpdatetFactoryModelSupervisor(opts) {
    return this._requestFormat(opts)
  }
  //得到成员当前签到工位
  @post('/Common/CommonFactoryModelSupervisor/GetStationSignInByMember')
  GetStationSignInByMember(opts) {
    return this._requestFormat(opts)
  }
  //查询接口历史记录查询
  @get('/Common/User/GetSearchHistory')
  GetSearchHistory(opts) {
    return this._requestFormat(opts)
  }
  //保存历史查询记录
  @post('/Common/User/SaveSearchHistory')
  SaveSearchHistory(opts) {
    return this._requestFormat(opts)
  }  
}
