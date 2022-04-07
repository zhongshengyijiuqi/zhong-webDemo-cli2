/**
 *
 * @desc   对象序列化  {key:value1,key2:value2} => key1=value1&key2=value2
 * @param  {Object} obj
 * @return {String}
 */
export function stringifyQueryString(obj) {
  if (!obj) { return ''; }
  const pairs = [];

  for (const key in obj) {
    const value = obj[key];

    if (value instanceof Array) {
      for (let i = 0; i < value.length; ++i) {
        pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
      }
      continue;
    }

    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }

  return pairs.join('&');
}

/**
 *
 * @desc   cookie转json
 * @param  {String}
 * @return {Object}
 */
export function Cookie2Json(cookie) {
  var result = "";
  cookie = cookie + ";"
  var cookis = cookie.split(";");
  for (var i = 0; i < cookis.length - 1; i++) {
    if (cookie[i].split("=").length > 0) {
      result = result + ",\"" + cookis[i].split("=")[0].trim() + "\":\"" + cookis[i].split("=")[1] + "\"";
    }
  }
  cookie = JSON.parse("{" + result.substr(1).replace("\\", "") + "}");
  result = cookie;
  return result;
}

/**
 *
 * @desc   浏览器url参数转json:  key1=value1&key2=value2  =>  {key:value1,key2:value2}
 * @param  {String}   
 * @return {Object}
 */
export function parseUrlParams() {
  if (!window.location.search) {
    return {}
  }
  let paramJson = {}
  let qs = window.location.search.substring(1)
  let paramsList = qs.split("&").map(str => str.split("="))
  for (let param of paramsList) {
    paramJson[decodeURIComponent(param[0])] = decodeURIComponent(param[1])
  }
  return paramJson
}
