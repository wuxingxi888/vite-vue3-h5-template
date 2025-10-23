import emitter from '@/utils/emit';
import { judgeSystem } from '@miracle-web/utils';

const { isAndroid, isiOS } = judgeSystem();

/**
 * @description: 封装原生App调用js的方法
 */
export default class NativeCallJs {
    /**
     * @description: xxx
     * @param {object} data “{num}”
     * @return {*}
     */
    static xxx(data: string) {
        if (isAndroid) {
            emitter.emit('xxx', JSON.parse(data));
        }
        if (isiOS) {
            emitter.emit('xxx', data);
        }
    }
}
