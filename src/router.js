import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    mode: 'hash',
    base: process.env.VUE_APP_SRC,
    routes: [
        {
            path: '*',
            name: 'notFound',
            redirect: '/home-dome1'
        },
        {
            path: '/home-dome1',
            name: 'home-dome1',
            component: () => import('@/views/home/Index.vue')
        },
        {
            path: '/home-dome2',
            name: 'home-dome2',
            component: () => import('@/views/home/dome2.vue')
        },
        {
            path: '/set',
            name: 'set',
            component: () => import('@/views/set/Index.vue')
        },{
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
