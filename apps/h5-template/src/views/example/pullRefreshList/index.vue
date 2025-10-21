<script setup lang="ts">
    import PullRefreshList, { type PullRefreshListInstance } from '@/components/PullRefreshList/index.vue'
    import { showToast } from '@miracle-web/ui'

    defineOptions({ name: 'PullRefreshList' })

    interface ListItem {
        id: number
        name: string
    }
    // 模拟数据
    const getMockData = ({ pageNo, pageSize }: { pageNo: number; pageSize: number }) => {
        showToast(`正在加载第${pageNo}页`)
        const total = 55

        const allData = Array.from({ length: total }, (_, i) => ({
            id: i + 1,
            name: `姓名${Math.random().toString(36).substring(2, 8)}`
        }))

        // 计算分页
        const start = (pageNo - 1) * pageSize
        const end = start + pageSize
        const data = allData.slice(start, end)

        return { total, data }
    }

    const pullRefreshListRef = ref<PullRefreshListInstance<ListItem>>()

    const disabledRefresh = ref(false)

    const onLoadData = async (pageNo: number, pageSize: number) => {
        try {
            const { data, total } = await getMockData({ pageNo, pageSize })
            if (data) {
                pullRefreshListRef.value?.updateList(data, total)
            }
        } catch (error) {
            console.log('🚀 ~ onLoadData ~ error:', error)
            pullRefreshListRef.value?.setError()
        }
    }

    // 切换是否刷新
    const toggleRefresh = () => {
        disabledRefresh.value = !disabledRefresh.value
    }

    // 模拟加载失败
    const simulateLoadError = () => {
        pullRefreshListRef.value?.setError()
    }
</script>

<template>
    <div class="h-screen">
        <custom-nav-bar></custom-nav-bar>

        <mi-space class="w-full h-10 flex items-center justify-center">
            <mi-button
                type="primary"
                size="small"
                @click="toggleRefresh"
            >
                {{ disabledRefresh ? '开启刷新' : '关闭刷新' }}
            </mi-button>

            <mi-button
                type="primary"
                size="small"
                @click="simulateLoadError"
            >
                模拟加载失败
            </mi-button>
        </mi-space>

        <pull-refresh-list
            ref="pullRefreshListRef"
            class="!h-[calc(100vh-86px)] !overflow-y-scroll"
            :disabled="disabledRefresh"
            @on-load="onLoadData"
        >
            <template #list="{ list }">
                <div class="p-[10px] space-y-[10px]">
                    <mi-cell
                        class="rounded-lg"
                        v-for="item in list"
                        :key="item.id"
                        :title="item.id"
                        :value="item.name"
                    />
                </div>
            </template>
        </pull-refresh-list>
    </div>
</template>

<style lang="scss" scoped></style>
