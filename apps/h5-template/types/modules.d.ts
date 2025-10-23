declare module '*.vue' {
    // eslint-disable-next-line no-duplicate-imports
    import { DefineComponent } from 'vue';
    // eslint-disable-next-line
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

interface Options {
    appKey: string;
    channelCode?: string;
    fastInstall?: boolean;
    mask?: () => void;
    onready: () => void;
}

declare class OpenInstall {
    constructor(options: Options, data: Recordable);

    static parseUrlParams(): Recordable;

    // 安装App
    install(params?: { data?: Recordable; channelCode?: string }): void;

    // 自动拉起App
    schemeWakeup(params?: { data?: Recordable; channelCode?: string }): void;

    // 自动拉起或安装App
    wakeupOrInstall(params?: { data?: Recordable; channelCode?: string }): void;
}
