import { acceptHMRUpdate, defineStore } from 'pinia'
import { store } from '@/store'
import { asyncLoadScript, removeScript } from '@/utils/script'

export interface IAppState {
    openEruda: boolean
}

export const useAppStore = defineStore('app-global-store', {
    state: (): IAppState => ({
        openEruda: false
    }),
    getters: {
        getOpenEruda(): boolean {
            return this.openEruda
        }
    },
    actions: {
        setOpenEruda(openEruda: boolean) {
            this.openEruda = openEruda
            if (openEruda) {
                asyncLoadScript({ src: 'https://cdn.jsdelivr.net/npm/eruda', id: 'eruda' }).then(() => {
                    window.eruda.init()
                })
            } else {
                removeScript('eruda').then(() => {
                    // 删除html根目录下所有的 #eruda 和 .__chobitsu-hide__
                    const erudaDom = document.querySelectorAll('#eruda,.__chobitsu-hide__')
                    erudaDom.forEach(item => item.remove())
                })
            }
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}

// Need to be used outside the setup
export function useAppStoreWidthOut() {
    return useAppStore(store)
}
