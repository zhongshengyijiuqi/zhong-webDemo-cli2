import Drag from '@/utils/Drag.js';
import { sleep, getUniqueId, awaitTokenBar, showLoading, judgeObj, hideLoading, debounce, throttle } from '@/utils/common.js';
import { isEmail, isIdCard, isPhoneNum, isUrl } from '@/utils/validate.js';
import { parseUrlParams, stringifyQueryString, Cookie2Json } from '@/utils/queryString.js';
import { filterSpecial, filterNumber } from '@/utils/filters.js';
import { parseExcel, exportExcel_aoa, exportExcel_json } from '@/utils/excel.js';
import { calcContinueTime } from '@/utils/time.js';
import { echartsHandler } from '@/utils/chart.js';
import { getFileType, imgError, imgOnNull } from '@/utils/file.js';

import {
  tree, treeToList, removeRepeatByKey, sortAddressBook, formatInvalidString, formatInvalidNumber
} from '@/utils/dataStructure.js';
import { cloneDeep } from '@/utils/cloneDeep.js';
export default {
  //drag
  Drag,

  //common
  sleep,
  getUniqueId,
  awaitTokenBar,
  showLoading,
  hideLoading,
  judgeObj,
  debounce,
  throttle,

  //validate
  isEmail,
  isIdCard,
  isPhoneNum,
  isUrl,

  //queryString
  parseUrlParams,
  stringifyQueryString,
  Cookie2Json,

  //filters
  filterSpecial,
  filterNumber,

  //excel
  parseExcel,
  exportExcel_aoa,
  exportExcel_json,

  //time
  calcContinueTime,

  //chart
  echartsHandler,

  //file
  getFileType,
  imgError,
  imgOnNull,

  //dataStructure
  tree,
  treeToList,
  removeRepeatByKey,
  sortAddressBook,
  formatInvalidString,
  formatInvalidNumber,
  //cloneDeep
  cloneDeep
};
