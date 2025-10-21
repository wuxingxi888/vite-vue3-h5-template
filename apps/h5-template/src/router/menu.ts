import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

const menuRouteList: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '',
        redirect: '/dashboard',
        component: Layout,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                meta: {
                    title: '主控台',
                    icon: 'i-mage:dashboard-2-fill',
                    keepAlive: true
                },
                component: () => import('@/views/dashboard/index.vue')
            },
            {
                path: '/example',
                name: 'Example',
                meta: {
                    title: '示例',
                    icon: 'i-mingcute:list-expansion-fill',
                    keepAlive: false
                },
                component: () => import('@/views/example/index.vue')
            },
            {
                path: '/chart',
                name: 'Chart',
                meta: {
                    title: '图表',
                    icon: 'i-bxs:chart',
                    keepAlive: false
                },
                component: () => import('@/views/chart/index.vue')
            },
            {
                path: '/mine',
                name: 'Mine',
                meta: {
                    title: '我的',
                    icon: 'i-tabler:brand-minecraft',
                    keepAlive: false
                },
                component: () => import('@/views/mine/index.vue')
            }
        ]
    }
]

export default menuRouteList
