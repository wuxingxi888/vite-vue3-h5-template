import { resolve } from 'path';
export function isDevFn(mode: string): boolean {
    return mode === 'development';
}

export function isProdFn(mode: string): boolean {
    return mode === 'production';
}

// 读取所有环境变量配置文件到process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
    const ret: any = {};

    for (const envName of Object.keys(envConf)) {
        let realName = envConf[envName].replace(/\\n/g, '\n');
        realName = realName === 'true' ? true : realName === 'false' ? false : realName;

        ret[envName] = realName;
        if (typeof realName === 'string') {
            process.env[envName] = realName;
        } else if (typeof realName === 'object') {
            process.env[envName] = JSON.stringify(realName);
        }
    }
    return ret;
}

// 获取当前时间
export const getNowTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() >= 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
    const date = now.getDate() >= 10 ? now.getDate() : `0${now.getDate()}`;
    const hour = now.getHours() >= 10 ? now.getHours() : `0${now.getHours()}`;
    const minutes = now.getMinutes() >= 10 ? now.getMinutes() : `0${now.getMinutes()}`;
    const seconds = now.getSeconds() >= 10 ? now.getSeconds() : `0${now.getSeconds()}`;
    return `${year}年${month}月${date}日 ${hour}:${minutes}:${seconds}`;
};

/**
 * 将给定的目录路径解析为绝对路径
 * 此函数通过结合当前工作目录和给定的目录名，解析出完整的绝对路径
 * 用于在不知道确切绝对路径时，根据相对路径获取绝对路径
 *
 * @param dir 相对路径或目录名，表示需要解析的目录
 * @returns 返回解析后的绝对路径
 */
export const pathResolve = (dir: string) => {
    return resolve(process.cwd(), '.', dir);
};
