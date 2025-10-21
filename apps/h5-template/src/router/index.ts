import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { createRouterGuards } from './router-guards'
import routeModuleList from './modules'
import { ErrorPageRoute, LoginRoute, RootRoute } from '@/router/base'
import menuRouteList from './menu'
import { useRouteStoreWidthOut } from '@/store/modules/route'

// 普通路由
export const baseRouter: RouteRecordRaw[] = [LoginRoute, RootRoute, ErrorPageRoute]

// 所有路由
export const allRoutes = [...baseRouter, ...menuRouteList, ...routeModuleList]

const routeStore = useRouteStoreWidthOut()

routeStore.setMenus(menuRouteList)

routeStore.setRouters(allRoutes)

const { VITE_HASH_ROUTE = 'false', VITE_PUBLIC_PATH } = import.meta.env

const history =
    VITE_HASH_ROUTE === 'true'
        ? createWebHashHistory(VITE_PUBLIC_PATH as string)
        : createWebHistory(VITE_PUBLIC_PATH as string)

const router = createRouter({
    history,
    routes: allRoutes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app: App) {
    app.use(router)
    // 创建路由守卫
    createRouterGuards(router)
}

export default router
