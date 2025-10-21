import { Updater } from '@/utils/updater'
import { useEnv } from '@/hooks/useEnv'
import { showConfirmDialog } from '@miracle-web/ui'

const { isDevMode } = useEnv()
/**
 * 检测H5端更新
 */
export const useUpdater = () => {
    if (!isDevMode()) {
        const updater = new Updater({ timer: 30 * 1000 })

        updater.on('no-update', () => {
            console.log('未更新')
        })

        // 更新通知
        updater.on('update', () => {
            showConfirmDialog({
                title: '系统升级通知',
                message: '检测到当前系统版本已更新，请刷新页面后使用新版本',
                theme: 'round-button',
                confirmButtonText: '立即刷新',
                cancelButtonText: '稍后'
            })
                .then(() => {
                    window.location.reload()
                })
                .catch(() => {
                    updater.stopTiming()
                })
        })
    }
}
