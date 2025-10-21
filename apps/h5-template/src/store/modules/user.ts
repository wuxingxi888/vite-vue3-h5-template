import { acceptHMRUpdate, defineStore, type StateTree } from 'pinia'
import { store } from '@/store'
import { doLogout, getUserInfo, login } from '@/api/system/user'
import { PageEnum } from '@/enums/pageEnum'
import router from '@/router'
import { encryptAES, decryptAES } from '@miracle-web/utils'
import { useEnv } from '@/hooks/useEnv'

interface UserInfo {
    userId: string | number
    username: string
    nickname: string
    avatar: string
    cover: string
    gender: number
    phone: string
    sign?: string
    industry?: number
}

interface IUserState {
    token?: string
    userInfo: UserInfo
}

interface LoginParams {
    username: string
    password: string
}

const { isProdMode } = useEnv()

export const useUserStore = defineStore('app-user-store', {
    state: (): IUserState => ({
        userInfo: {
            userId: '',
            username: '',
            nickname: '',
            avatar: '',
            cover: '',
            gender: 0,
            phone: ''
        },
        token: ''
    }),
    getters: {
        getUserInfo: state => state.userInfo,
        getToken: state => state.token
    },
    actions: {
        setToken(token: string) {
            this.token = token || ''
        },
        setUserInfo(info: UserInfo) {
            this.userInfo = info
        },

        async Login(params: LoginParams) {
            try {
                const { data } = await login(params)
                if (data.token) {
                    this.setToken(data.token)
                    await this.GetUserInfo()
                    return Promise.resolve(data.token)
                }
            } catch (error) {
                return Promise.reject(error)
            }
        },

        async GetUserInfo() {
            try {
                const { data } = await getUserInfo()
                this.setUserInfo(data)
                return Promise.resolve(data)
            } catch (error) {
                return Promise.reject(error)
            }
        },

        async Logout() {
            if (this.getToken) {
                try {
                    await doLogout()
                } catch {
                    console.error('注销Token失败')
                }
            }
            this.setToken('')
            this.setUserInfo({} as UserInfo)
            router.push(PageEnum.BASE_LOGIN)
            location.reload()
        }
    },
    // 开启数据缓存
    persist: {
        key: 'CURRENT-USER',
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
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

// Need to be used outside the setup
export function useUserStoreWidthOut() {
    return useUserStore(store)
}
