import { acceptHMRUpdate, defineStore, type StateTree } from 'pinia'
import { store } from '@/store'
import { setting, type IThemeState } from '@/utils/const/theme'
import { encryptAES, decryptAES } from '@miracle-web/utils'
import { useEnv } from '@/hooks/useEnv'

const { themeMode, themeColor, themeColorList, isPageAnimate, pageAnimateType } = setting

const { isProdMode } = useEnv()

export const useThemeStore = defineStore('app-theme-store', {
    state: (): IThemeState => ({
        themeMode,
        themeColor,
        themeColorList,
        isPageAnimate,
        pageAnimateType
    }),
    getters: {
        getThemeMode(): 'light' | 'dark' {
            return this.themeMode
        },
        getThemeColor(): string {
            return this.themeColor
        },
        getThemeColorList(): string[] {
            return this.themeColorList
        },
        getIsPageAnimate(): boolean {
            return this.isPageAnimate
        },
        getPageAnimateType(): string {
            return this.pageAnimateType
        }
    },
    actions: {
        setThemeMode(mode: 'light' | 'dark'): void {
            this.themeMode = mode
        },
        setPageAnimateType(type: string): void {
            this.pageAnimateType = type
        }
    },
    // 开启数据缓存
    persist: {
        key: 'THEME-SETTING',
        storage: window.localStorage,
        serializer: {
            serialize: isProdMode()
                ? (value: StateTree) => {
                      return encryptAES(value)
                  }
                : JSON.stringify,
            deserialize: isProdMode()
                ? (value: string) => {
                      return JSON.parse(decryptAES(value))
                  }
                : JSON.parse
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
}

// Need to be used outside the setup
export function useThemeStoreWithOut() {
    return useThemeStore(store)
}
