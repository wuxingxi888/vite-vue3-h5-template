import type { ComponentPublicInstance, FunctionalComponent, VNodeChild, PropType as VuePropType } from 'vue';

declare global {
    const __APP_INFO__: {
        pkg: {
            name: string;
            version: string;
            dependencies: Recordable<string>;
            devDependencies: Recordable<string>;
        };
        lastBuildTime: string;
    };

    declare interface Window {
        webkit: any;
        NativeCallJs: any;
        eruda: any;
    }

    // vue
    declare type PropType<T> = VuePropType<T>;

    declare type Recordable<T = any> = Record<string, T>;

    declare type ReadonlyRecordable<T = any> = {
        readonly [key: string]: T;
    };

    type VueNode = VNodeChild | JSX.Element;

    export type Writable<T> = {
        -readonly [P in keyof T]: T[P];
    };

    type Nullable<T> = T | null;

    type NonNullable<T> = T extends null | undefined ? never : T;

    type DeepPartial<T> = {
        [P in keyof T]?: DeepPartial<T[P]>;
    };
    type TimeoutHandle = ReturnType<typeof setTimeout>;

    type IntervalHandle = ReturnType<typeof setInterval>;

    interface Indexable<T = any> {
        [key: string]: T;
    }

    interface ChangeEvent extends Event {
        target: HTMLInputElement;
    }

    interface WheelEvent {
        path?: EventTarget[];
    }

    interface ImportMetaEnv extends ViteEnv {
        __: unknown;
    }

    interface ViteEnv {
        VITE_ENV: string;
        VITE_PORT: number;
        VITE_PUBLIC_PATH: string;
        VITE_GLOB_APP_TITLE: string;
        VITE_GLOB_APP_SHORT_NAME: string;
        VITE_USE_MOCK: boolean;
        VITE_OUTPUT_DIR: string;
        VITE_GLOB_API_URL: string;
        VITE_GLOB_API_URL_PREFIX: string;
        VITE_GLOB_UPLOAD_URL: string;
        VITE_GLOB_IMG_URL_PREFIX: string;
        VITE_PROXY: [string, string][];
        VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    }
}
