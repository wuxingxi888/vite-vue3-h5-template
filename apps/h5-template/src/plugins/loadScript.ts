import { useEnv } from '@/hooks/useEnv';
import { asyncLoadScript } from '@/utils/script';

const { getEnvMode } = useEnv();
/**
 * 动态加载脚本
 */
export const useLoadScript = () => {
    if (getEnvMode() !== 'production') {
        asyncLoadScript({
            src: 'https://cdn.bootcdn.net/ajax/libs/eruda/3.4.3/eruda.min.js',
            id: 'eruda',
        }).then(() => {
            window.eruda.init();
        });
    }
};
