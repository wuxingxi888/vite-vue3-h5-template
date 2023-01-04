import { defineStore } from 'pinia'
import { isEnvProd } from '@/config'
import { encrypt, decrypt } from '@/utils/encrypt'

export interface IAppState {
	token: string
	openInstallInstance: OpenInstall | null
}

export const useAppStore = defineStore({
	id: 'app',
	state: () =>
		({
			token: '',
			openInstallInstance: null
		} as IAppState),
	actions: {
		setToken(token: string) {
			this.token = `Bearer ${token}`
		},
		setOpenInstall(instance: OpenInstall) {
			this.openInstallInstance = instance
		}
	},
	// 开启数据缓存
	persist: {
		key: 'app',
		storage: window.sessionStorage,
		serializer: {
			serialize: isEnvProd ? encrypt : JSON.stringify,
			deserialize: isEnvProd ? decrypt : JSON.parse
		}
	}
})
