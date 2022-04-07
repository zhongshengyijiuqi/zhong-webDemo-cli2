import axios from 'axios'
import Common from './Common'
import Header from './Header'
const commonRequest = new Common(axios)
const headerRequest = new Header(axios)

export {
  commonRequest,
  headerRequest
}