import type { RouteRecordRaw } from 'vue-router'

const routeModuleList: Array<RouteRecordRaw> = [
    {
        path: '/pullRefreshList',
        name: 'PullRefreshList',
        meta: {
            title: '列表刷新加载',
            keepAlive: false
        },
        component: () => import('@/views/example/pullRefreshList/index.vue')
    },
    {
        path: '/scrollCache',
        name: 'ScrollCache',
        meta: {
            title: '滚动缓存',
            keepAlive: true
        },
        component: () => import('@/views/example/scrollCache/index.vue')
    },
    {
        path: '/unoCss',
        name: 'UnoCss',
        meta: {
            title: 'unoCss'
        },
        component: () => import('@/views/example/unocss/index.vue')
    },
    {
        path: '/svgIcon',
        name: 'SvgIcon',
        meta: {
            title: 'svg图标'
        },
        component: () => import('@/views/example/svgIcon/index.vue')
    },
    {
        path: '/webview',
        name: 'Webview',
        meta: {
            title: 'miracle-webview'
        },
        component: () => import('@/components/WebSite/index.vue')
    },
    {
        path: '/dependence',
        name: 'Dependence',
        meta: {
            title: '项目依赖'
        },
        component: () => import('@/views/example/dependence/index.vue')
    },
    {
        path: '/openInstall',
        name: 'OpenInstall',
        meta: {
            title: 'openInstall'
        },
        component: () => import('@/views/example/openinstall/index.vue')
    },
    {
        path: '/directives',
        name: 'Directives',
        meta: {
            title: '指令合集'
        },
        component: () => import('@/views/example/directives/index.vue')
    },
    {
        path: '/editUserInfo',
        name: 'EditUserInfo',
        meta: {
            title: '编辑个人信息'
        },
        component: () => import('@/views/mine/EditUserInfo.vue')
    },
    {
        path: '/editNickname',
        name: 'EditNickname',
        meta: {
            title: '修改昵称(该页面已缓存)',
            keepAlive: true
        },
        component: () => import('@/views/mine/EditNickname.vue')
    },
    {
        path: '/editSign',
        name: 'EditSign',
        meta: {
            title: '修改签名'
        },
        component: () => import('@/views/mine/EditSign.vue')
    },
    {
        path: '/accountSetting',
        name: 'AccountSetting',
        meta: {
            title: '账号与安全'
        },
        component: () => import('@/views/mine/AccountSetting.vue')
    },
    {
        path: '/changePassword',
        name: 'ChangePassword',
        meta: {
            title: '修改登录密码'
        },
        component: () => import('@/views/mine/ChangePassword.vue')
    },
    {
        path: '/themeSetting',
        name: 'ThemeSetting',
        meta: {
            title: '主题设置'
        },
        component: () => import('@/views/mine/ThemeSetting.vue')
    }
]

export default routeModuleList
