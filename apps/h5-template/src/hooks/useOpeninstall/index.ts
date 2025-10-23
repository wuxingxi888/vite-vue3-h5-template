import { asyncLoadScript } from '@/utils/script';
export function useOpenInstall(appKey: string) {
    const openInstall = ref<OpenInstall | null>();

    const initOpenInstall = () => {
        // 解析url中的所有查询参数
        const data = OpenInstall.parseUrlParams();

        new OpenInstall(
            {
                appKey,
                onready(this: OpenInstall) {
                    openInstall.value = this;
                    console.log('OpenInstall OI success');
                },
            },
            data
        );
    };

    onMounted(() => {
        asyncLoadScript({
            src: `https://res.openinstall.com/openinstall-${appKey}.js`,
            id: 'openInstall',
        }).then(() => {
            initOpenInstall();
        });
    });

    return { openInstall };
}
