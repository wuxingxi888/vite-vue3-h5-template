import { computed } from 'vue'
import { darken, lighten } from '@miracle-web/utils'
import { useThemeStore } from '@/store/modules/theme'
import type { ConfigProviderThemeVars } from '@miracle-web/ui'

export function useTheme() {
    const themeStore = useThemeStore()

    const getThemeMode = computed(() => themeStore.themeMode)

    const getThemeColor = computed(() => themeStore.themeColor)

    const getThemeColorList = computed(() => themeStore.themeColorList)

    const getIsPageAnimate = computed(() => themeStore.isPageAnimate)

    const getPageAnimateType = computed(() => themeStore.pageAnimateType)

    const getThemeVars = (): ConfigProviderThemeVars => {
        const themeColor = unref(getThemeColor)
        const darkenStr = darken(themeColor, 25)
        const lightenStr = lighten(themeColor, 10)

        return {
            actionSheetCancelTextColor: themeColor,
            buttonPrimaryBackground: themeColor,
            buttonPrimaryBorderColor: themeColor,
            radioCheckedIconColor: themeColor,
            sliderActiveBackground: themeColor,
            cascaderActiveColor: themeColor,
            checkboxCheckedIconColor: themeColor,
            numberKeyboardButtonBackground: themeColor,
            pickerLoadingIconColor: themeColor,
            calendarRangeEdgeBackground: themeColor,
            calendarRangeMiddleColor: themeColor,
            calendarSelectedDayBackground: themeColor,
            stepperButtonRoundThemeColor: themeColor,
            switchOnBackground: themeColor,
            dialogConfirmButtonTextColor: themeColor,
            dropdownMenuOptionActiveColor: themeColor,
            dropdownMenuTitleActiveTextColor: themeColor,
            notifyPrimaryBackground: themeColor,
            circleColor: themeColor,
            noticeBarBackground: lightenStr,
            noticeBarTextColor: darkenStr,
            progressColor: themeColor,
            progressPivotBackground: themeColor,
            stepActiveColor: themeColor,
            stepFinishLineColor: themeColor,
            swipeIndicatorActiveBackground: themeColor,
            tagPrimaryColor: themeColor,
            navBarIconColor: themeColor,
            navBarTextColor: themeColor,
            paginationItemDefaultColor: themeColor,
            sidebarSelectedBorderColor: themeColor,
            tabsDefaultColor: themeColor,
            tabsBottomBarColor: themeColor,
            tabbarItemActiveColor: themeColor,
            treeSelectItemActiveColor: themeColor
        }
    }

    // 切换主题
    const toggleTheme = computed({
        get: () => getThemeMode.value === 'dark',
        set: () => {
            const htmlRoot = document.documentElement
            htmlRoot.classList.toggle('light')
            htmlRoot.classList.toggle('dark')
            themeStore.setThemeMode(getThemeMode.value === 'light' ? 'dark' : 'light')
        }
    })

    return {
        getThemeMode,
        getThemeColor,
        getThemeColorList,
        getIsPageAnimate,
        getPageAnimateType,
        getThemeVars,
        toggleTheme
    }
}
