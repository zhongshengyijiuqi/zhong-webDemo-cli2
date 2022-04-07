import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
Vue.use(Router)
Vue.use(Meta, {
    keyName: 'head',
})

const router = new Router({
    mode: 'hash',
    base: process.env.VUE_APP_SRC,
    routes: [
        {
            path: '*',
            name: 'notFound',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home/Index.vue')
        }, {
            path: '/set',
            name: 'set',
            component: () => import('@/views/set/Index.vue')
        },
        {
            path: '/help',
            name: 'help',
            component: () => import('@/views/common/Help.vue')
        }, {
            path: '/log',
            name: 'log',
            component: () => import('@/views/common/Log.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})

router.beforeResolve((to, from, next) => {
    next()
})

router.afterEach((to, from) => { })

export default router
