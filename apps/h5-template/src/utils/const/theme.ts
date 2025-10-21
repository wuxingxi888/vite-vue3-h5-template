export interface IThemeState {
    // 系统主题
    themeMode: 'light' | 'dark'
    // 系统风格
    themeColor: string
    // 系统内置风格
    themeColorList: string[]
    // 是否开启路由动画
    isPageAnimate: boolean
    // 路由动画类型
    pageAnimateType: string
}

export const animates = [
    { value: 'fade', text: '淡入淡出' },
    { value: 'fade-bottom', text: '淡入淡出-底部' },
    { value: 'fade-top', text: '淡入淡出-顶部' },
    { value: 'fade-scale', text: '淡入淡出-缩放' },
    { value: 'fade-slide', text: '淡入淡出-滑动' },

    { value: 'scale-transition', text: '缩放' },
    { value: 'scale-rotate-transition', text: '缩放-旋转' },
    { value: 'scale-fade', text: '缩放-淡入淡出' },
    { value: 'scale-out', text: '缩放-闪现' },

    { value: 'slide-y-transition', text: '滑动-从上到下' },
    { value: 'slide-y-reverse-transition', text: '滑动-从下到上' },
    { value: 'slide-x-transition', text: '滑动-从左到右' },
    { value: 'slide-x-reverse-transition', text: '滑动-从右到左' },

    { value: 'scroll-y-transition', text: '滚动-从上到下' },
    { value: 'scroll-y-reverse-transition', text: '滚动-从下到上' },
    { value: 'scroll-x-transition', text: '滚动-从左到右' },
    { value: 'scroll-x-reverse-transition', text: '滚动-从右到左' }
]

export const themeColorList: string[] = [
    '#5d9dfe',
    '#2d8cf0',
    '#0960bd',
    '#0084f4',
    '#009688',
    '#536dfe',
    '#ff5c93',
    '#ee4f12',
    '#0096c7',
    '#9c27b0',
    '#ff9800',
    '#FF3D68',
    '#00C1D4',
    '#18a058',
    '#78DEC7',
    '#1768AC',
    '#FB9300',
    '#FC5404',
    '#8675ff'
]

export const setting: IThemeState = {
    // 浅色主题
    themeMode: 'light',
    // 系统主题色
    themeColor: '#5d9dfe',
    // 系统内置主题色列表
    themeColorList,
    // 是否开启路由动画
    isPageAnimate: true,
    // 路由动画类型
    pageAnimateType: 'fade'
}
