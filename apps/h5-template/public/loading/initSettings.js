// 初始化主题和模式设置
document.addEventListener("DOMContentLoaded", () => {
    const storedSetting = window.localStorage.getItem("THEME-SETTING")

    let themeSetting = {
        themeMode: "light",
        themeColor: "#5d9dfe"
    }

    if (storedSetting) {
        try {
            themeSetting = JSON.parse(storedSetting)
        } catch (e) {
            console.error("Invalid JSON format in THEME-SETTING:", e)
        }
    }

    const { themeMode, themeColor } = themeSetting

    // 设置根元素的主题
    const htmlRoot = document.documentElement
    if (htmlRoot) {
        htmlRoot.classList.add(themeMode)
        htmlRoot.style.setProperty("--app-theme-color", themeColor)
    } else {
        console.error('Element with id "htmlRoot" not found')
    }
})
