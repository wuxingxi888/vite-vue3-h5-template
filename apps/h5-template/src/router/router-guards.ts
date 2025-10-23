import type { Router } from 'vue-router';
import { isNavigationFailure } from 'vue-router';
import NProgress from 'nprogress';
import { useRouteStoreWidthOut } from '@/store/modules/route';
import { useUserStore } from '@/store/modules/user';
import { PageEnum } from '@/enums/pageEnum';

NProgress.configure({ parent: '#app' });

// 路由白名单
const whitePathList = [PageEnum.BASE_LOGIN];
export function createRouterGuards(router: Router) {
    router.beforeEach(async (to, _from, next) => {
        NProgress.start();

        if (whitePathList.includes(to.path as PageEnum)) {
            next();
            return;
        }
        const userStore = useUserStore();
        const token = computed(() => userStore.getToken);

        if (!token.value) {
            next(PageEnum.BASE_LOGIN);
            return;
        }

        next();
    });

    // 进入某个路由之后触发的钩子
    router.afterEach((to, _, failure) => {
        // 设置每个页面的 title
        document.title = (to?.meta?.title as string) || document.title;

        if (isNavigationFailure(failure)) {
            console.warn('failed navigation', failure);
        }

        const routeStore = useRouteStoreWidthOut();
        // 在这里设置需要缓存的组件名称
        const keepAliveComponents = routeStore.keepAliveComponents;

        // 获取当前组件名
        const currentComName: any = to.matched.find(item => item.name === to.name)?.name;

        // 如果 currentComName 且 keepAliveComponents 不包含 currentComName 且 即将要进入的路由 meta 属性里 keepAlive 为 true，则缓存该组件
        if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
            // 需要缓存的组件
            keepAliveComponents.push(currentComName);
            // keepAlive 为 false 则不缓存
        } else if (!to.meta?.keepAlive) {
            // 不需要缓存的组件

            // 这里的作用一开始组件设置为缓存，之后又设置不缓存但是它还是存在 keepAliveComponents 数组中
            // keepAliveComponents 使用 findIndex 与 当前路由对比，如果存在则返回具体下标位置，不存在返回 -1
            const index = routeStore.keepAliveComponents.findIndex(name => name === currentComName);
            if (index !== -1) {
                // 通过返回具体下标位置删除 keepAliveComponents 数组中缓存的 元素
                keepAliveComponents.splice(index, 1);
            }
        }
        routeStore.setKeepAliveComponents(keepAliveComponents);
        NProgress.done();
    });

    router.onError(error => {
        console.error(error, '路由错误');
    });
}
