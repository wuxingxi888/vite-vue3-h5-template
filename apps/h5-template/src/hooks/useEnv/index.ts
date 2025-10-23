import { GlobConfig, GlobEnvConfig } from "#/config"

export function useEnv() {
    const getEnvConfig = (): Readonly<GlobConfig> => {
        const env = { ...import.meta.env } as unknown as GlobEnvConfig
        return {
            title: env.VITE_GLOB_APP_TITLE,
            titleCN: env.VITE_GLOB_APP_TITLE_CN,
            apiUrl: env.VITE_GLOB_API_URL,
            shortName: env.VITE_GLOB_APP_SHORT_NAME,
            urlPrefix: env.VITE_GLOB_API_URL_PREFIX,
            uploadUrl: env.VITE_GLOB_UPLOAD_URL,
            imgUrl: env.VITE_GLOB_IMG_URL
        }
    }

    const getEnvMode = (): string => {
        return import.meta.env.MODE
    }

    const isDevMode = (): boolean => {
        return import.meta.env.DEV
    }

    const isProdMode = (): boolean => {
        return import.meta.env.PROD
    }

    return {
        getEnvConfig,
        getEnvMode,
        isDevMode,
        isProdMode
    }
}
