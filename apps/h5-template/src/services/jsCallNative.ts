import router from '@/router';
import { judgeSystem } from '@miracle-web/utils';

const { isAndroid, isiOS, isMobile } = judgeSystem();

/**
 * @description: 封装js调用原生App的方法
 */
export default class JsCallNative {
    static AppKey = 'android';

    /**
     * @description: 返回
     */
    static back() {
        try {
            if (!isMobile) {
                router.go(-1);
            }
            if (isAndroid) {
                window[this.AppKey].back();
            }

            if (isiOS) {
                window.webkit.messageHandlers.back.postMessage({});
            }
        } catch (error) {
            router.go(-1);
            console.log(error);
        }
    }

    /**
     * @description: xxxx
     * @param {number} type 0:xx 1:微信 2:xx
     * @param {string} url xxx
     * @return {*}
     */
    static xxx(type: number, url: string) {
        try {
            if (isAndroid) {
                window[this.AppKey].xxx(type, url);
            }

            if (isiOS) {
                window.webkit.messageHandlers.xxx.postMessage({ type, url });
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @description: xxxx 无参数
     * @return {*}
     */
    static vvv() {
        try {
            if (isAndroid) {
                window[this.AppKey].vvv();
            }
            if (isiOS) {
                window.webkit.messageHandlers.vvv.postMessage({});
            }
        } catch (error) {
            console.log(error);
        }
    }
}
