// 检测是否加载了 script脚本 文件
export const checkIsLoadScript = (src: string): boolean => {
    const scriptObjs = document.getElementsByTagName('script');
    const reg = new RegExp(src);
    for (const sObj of scriptObjs) {
        if (sObj.src.match(reg)) {
            return true;
        }
    }
    return false;
};

// 异步加载script脚本
export const asyncLoadScript = async ({ src, id }: { src: string; id: string }): Promise<void> => {
    const isLoad = await checkIsLoadScript(src);
    return new Promise(resolve => {
        if (isLoad) {
            // 若script标签存在，则先删除
            const dom = document.getElementById(id) as HTMLScriptElement;
            if (dom && dom.src === src) {
                console.log('删除成功');
                dom.remove();
            }
            // 重新加载
            asyncLoadScript({ src, id }).then(() => {
                resolve();
            });
        } else {
            const scriptNode = document.createElement('script');
            scriptNode.setAttribute('type', 'text/javascript');
            scriptNode.setAttribute('charset', 'utf-8');
            scriptNode.setAttribute('id', id);
            scriptNode.setAttribute('src', src);
            document.body.appendChild(scriptNode);
            scriptNode.onload = () => {
                console.log('script loaded');
                resolve();
            };
        }
    });
};

// 移除 script标签
export const removeScript = (id: string): Promise<void> => {
    return new Promise(resolve => {
        const dom = document.getElementById(id) as HTMLScriptElement;
        if (dom) {
            dom.remove();
        }
        resolve();
    });
};
