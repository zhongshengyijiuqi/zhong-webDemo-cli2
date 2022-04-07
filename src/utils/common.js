import { Loading } from 'element-ui'

const shortid = require('shortid');
export function sleep(time) {
  return new Promise((resolve) => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, time)
  })
}
export function getUniqueId() {
  return shortid.generate()
}
export function awaitTokenBar(state, r) {
  return new Promise(async (resolve, reject) => {
    //r is first resolve
    if (!r) {
      r = resolve
    }
    if (!state.tokenBar) {
      await sleep(1000)
      console.log('wait token ...')
      return awaitTokenBar(state, r)
    } else {
      console.log('get token successfully !')
      r('success')
    }
  })
}

let loading = null
export function showLoading(loadingArea = null) {
  if (loading) {
    return
  }
  loading = Loading.service({
    background: 'rgba(255, 255, 255, 0)',
    target:loadingArea
  })
}

export function hideLoading() {
  return new Promise((resolve) => {
    let timer = setTimeout(() => {
      if (loading) {
        loading.close()
        loading = null
      }
      clearTimeout(timer)
      resolve()
    }, 500)
  })
}

const debounce = (() => {
  let timer = null
  return (fn, wait) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
      clearTimeout(timer)
      timer = null
    }, wait)
  };
})()

const throttle = (() => {
	let timer = null;
	return (fn, wait) => {
		if (timer) {
			return;
		}
		fn();
		timer = setTimeout(() => {
			clearTimeout(timer)
			timer = null;
		}, wait);
	};
})()
export {
  debounce,
  throttle
}