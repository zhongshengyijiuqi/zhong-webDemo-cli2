export default {
  install(Vue) {
    let vueInstance = Vue.prototype
    Vue.directive('integer', {
      bind(el, binding) {
        el.handler = () => {
          el.firstElementChild.value = el.firstElementChild.value.replace(/[^\d]+/g, '');
        }
        el.addEventListener('input', el.handler, false)
      },
      unbind(el) {
        el.removeEventListener('input', el.handler, false)
      },
    })
    Vue.directive('filterSpecial', {
      bind(el, binding) {
        el.handler = () => {
          el.value = vueInstance.$utils.filterSpecial(el.value)
        }
        el.addEventListener('input', el.handler, false)
      },
      unbind(el) {
        el.removeEventListener('input', el.handler, false)
      },
    })

    Vue.directive('number', {
      // v-number.positive.decimals2
      /*       this.$utils.filterNumber(e.target.value, {
              modifiers: {
                decimals2: true,
                positive: true
              }
            }) */
      bind(el, binding) {
        el.handler = () => {
          el.value = vueInstance.$utils.filterNumber(el.value, binding)
        }
        el.addEventListener('input', el.handler, false)
      },
      unbind(el) {
        el.removeEventListener('input', el.handler, false)
      },
    })

    let drag = null
    Vue.directive('drag', {
      bind(el, binding) {
        el.classList.add('drag')
        drag = new vueInstance.$utils.Drag({ el }, vueInstance)
      },
      update(el) {
        el.classList.add('drag')
      },
      unbind(el, binding) {
        drag.destory()
      }
    })

  },
}
