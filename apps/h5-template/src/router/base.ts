import type { RouteRecordRaw } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum';

const Layout = () => import('@/layout/index.vue');

export const RootRoute: RouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
        title: 'Root',
    },
};

export const LoginRoute: RouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
        title: '登录',
    },
};

export const ErrorPageRoute: RouteRecordRaw = {
    path: '/:path(.*)*',
    name: PageEnum.ERROR_PAGE_NAME,
    component: Layout,
    meta: {
        title: 'ErrorPage',
    },
    children: [
        {
            path: '/:path(.*)*',
            name: 'ErrorPageSon',
            component: () => import('@/views/exception/404.vue'),
            meta: {
                title: 'ErrorPage',
            },
        },
    ],
};
