<template>
    <div>
        <!-- 手机预览弹窗 -->
        <div v-if="showPreview" class="phone-preview-overlay">
            <div
                class="phone-preview-container"
                @click.stop
                :style="{
                    left: position.x + 'px',
                    top: position.y + 'px',
                    transform: 'none',
                    width: phoneSize.width + 'px',
                    height: phoneSize.height + 'px',
                }"
                ref="phoneContainer"
                @mouseenter="showCloseButton = true"
                @mouseleave="showCloseButton = false"
            >
                <div class="phone-preview-header" @mousedown="startDrag" @touchstart="startDrag">
                    <div class="phone-time">{{ currentTime }}</div>
                    <div class="phone-battery">
                        <span class="battery-level">100%</span>
                        <div class="battery-icon">
                            <div class="battery-fill"></div>
                        </div>
                    </div>
                </div>
                <div
                    class="phone-preview-content"
                    :style="{
                        height: contentSize.height + 'px',
                        width: '100%',
                    }"
                >
                    <iframe :src="previewUrl" frameborder="0" class="phone-preview-frame"></iframe>
                </div>
                <!-- 顶部中间灵动岛样式关闭按钮 -->
                <button v-show="showCloseButton" class="close-button" @click="closePreview"> 关闭预览 </button>
            </div>
        </div>

        <!-- 角标按钮 -->
        <div v-if="!showPreview && showBadge" class="preview-badge" @click="openPreview">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12" y2="18"></line>
            </svg>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, computed } from 'vue';

    const showPreview = ref(false);
    const showBadge = ref(true);
    const phoneContainer = ref(null);
    const showCloseButton = ref(false);

    // 动态计算预览URL：开发环境用相对路径，生产环境用完整URL
    const previewUrl = computed(() => {
        // 使用环境变量配置的预览URL
        return import.meta.env.VITE_H5_PREVIEW_URL || 'http://localhost:8888/vite-vue3-h5-template/site-h5/';
    });

    // 定义常量
    const HEADER_HEIGHT = 44; // header高度
    const BOTTOM_SAFE_AREA = 0; // 底部安全区域高度

    // 手机尺寸基础比例 (iPhone X 尺寸)
    const BASE_WIDTH = 375;
    // 减去 header 和 底部安全区域
    const BASE_HEIGHT = 812 - HEADER_HEIGHT - BOTTOM_SAFE_AREA;
    const MAX_WIDTH = 500; // 最大宽度限制

    // 检测是否为移动端设备
    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // 手机尺寸
    const phoneSize = ref({
        width: BASE_WIDTH,
        height: BASE_HEIGHT + HEADER_HEIGHT + BOTTOM_SAFE_AREA, // 总高度包括 header 和 底部安全区域
    });

    // 内容区域尺寸
    const contentSize = ref({
        height: BASE_HEIGHT,
    });

    // 当前时间
    const currentTime = ref('');

    // 位置状态
    const position = ref({
        x: 0,
        y: 0,
    });

    // 保存窗口尺寸
    const windowSize = ref({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // 拖拽状态
    const dragState = ref({
        isDragging: false,
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0,
    });

    // 更新当前时间
    const updateTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        currentTime.value = `${hours}:${minutes}`;
    };

    // 计算适合的弹窗尺寸
    const calculatePhoneSize = () => {
        // 计算窗口可用空间（预留一些边距）
        const maxWidth = Math.min(windowSize.value.width * 0.8, MAX_WIDTH);
        const maxHeight = windowSize.value.height * 0.8;

        // 按比例计算尺寸（基于content区域）
        const ratio = BASE_WIDTH / BASE_HEIGHT;

        let width, height;

        // 根据窗口比例选择限制因素
        if (maxWidth / maxHeight > ratio) {
            // 高度是限制因素
            height = maxHeight;
            width = height * ratio;
        } else {
            // 宽度是限制因素
            width = maxWidth;
            height = width / ratio;
        }

        // 确保不超过最大宽度
        if (width > MAX_WIDTH) {
            width = MAX_WIDTH;
            height = width / ratio;
        }

        phoneSize.value.width = width;
        phoneSize.value.height = height + HEADER_HEIGHT + BOTTOM_SAFE_AREA; // 加上 header 和 底部安全区域的高度
        contentSize.value.height = height; // 内容区域高度
    };

    // 更新窗口尺寸
    const updateWindowSize = () => {
        windowSize.value.width = window.innerWidth;
        windowSize.value.height = window.innerHeight;

        // 重新计算弹窗尺寸
        calculatePhoneSize();

        // 更新弹窗位置以适应新尺寸
        updatePhonePosition();
    };

    // 更新弹窗位置
    const updatePhonePosition = () => {
        if (showPreview.value) {
            // 确保弹窗在可视范围内
            if (position.value.x < 0) {
                position.value.x = 0;
            } else if (position.value.x > windowSize.value.width - phoneSize.value.width) {
                position.value.x = windowSize.value.width - phoneSize.value.width;
            }

            if (position.value.y < 0) {
                position.value.y = 0;
            } else if (position.value.y > windowSize.value.height - phoneSize.value.height) {
                position.value.y = windowSize.value.height - phoneSize.value.height;
            }
        } else {
            // 初始化位置为居中
            position.value.x = windowSize.value.width / 2 - phoneSize.value.width / 2;
            position.value.y = windowSize.value.height / 2 - phoneSize.value.height / 2;
        }
    };

    // 开始拖拽
    const startDrag = e => {
        if (showPreview.value) {
            const evt = e.touches ? e.touches[0] : e;

            dragState.value.isDragging = true;
            dragState.value.startX = evt.clientX;
            dragState.value.startY = evt.clientY;
            dragState.value.startLeft = position.value.x;
            dragState.value.startTop = position.value.y;

            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('touchmove', handleDrag, { passive: false });
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);

            // 防止选择文本
            e.preventDefault();
        }
    };

    // 处理拖拽过程
    const handleDrag = e => {
        if (dragState.value.isDragging) {
            const evt = e.touches ? e.touches[0] : e;

            const deltaX = evt.clientX - dragState.value.startX;
            const deltaY = evt.clientY - dragState.value.startY;

            let newX = dragState.value.startLeft + deltaX;
            let newY = dragState.value.startTop + deltaY;

            // 限制 X 轴边界
            if (newX < 0) {
                newX = 0;
            } else if (newX > windowSize.value.width - phoneSize.value.width) {
                newX = windowSize.value.width - phoneSize.value.width;
            }

            // 限制 Y 轴边界
            if (newY < 0) {
                newY = 0;
            } else if (newY > windowSize.value.height - phoneSize.value.height) {
                newY = windowSize.value.height - phoneSize.value.height;
            }

            position.value.x = newX;
            position.value.y = newY;
        }
    };

    // 停止拖拽
    const stopDrag = () => {
        dragState.value.isDragging = false;
        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('touchmove', handleDrag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
    };

    onMounted(() => {
        // 监听窗口大小变化
        window.addEventListener('resize', updateWindowSize);

        // 初始化时间
        updateTime();
        // 每分钟更新一次时间
        setInterval(updateTime, 60000);

        // 初始化尺寸和位置
        updateWindowSize();

        // 只在非移动端设备上默认显示预览弹窗
        if (!isMobile()) {
            // 延迟一点时间显示弹窗，让用户先看到文档页面
            setTimeout(() => {
                showPreview.value = true;
            }, 1000);
        }
    });

    onUnmounted(() => {
        // 清理事件监听器
        window.removeEventListener('resize', updateWindowSize);
        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('touchmove', handleDrag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
    });

    const closePreview = () => {
        showPreview.value = false;
    };

    const openPreview = () => {
        showPreview.value = true;
        // 更新尺寸和位置
        updateWindowSize();
    };
</script>

<style scoped>
    .phone-preview-overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
    }

    .phone-preview-container {
        position: absolute;
        background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
        border-radius: 40px;
        overflow: hidden;
        box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.5),
            0 0 0 6px #1a1a1a,
            0 0 0 8px #1f1f1f;
        cursor: move;
        max-width: 500px;
    }

    .phone-preview-header {
        height: 44px;
        background: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        color: black;
        font-size: 14px;
        cursor: move;
        position: relative;
    }

    .phone-time {
        font-weight: 600;
    }

    .phone-battery {
        display: flex;
        align-items: center;
    }

    .battery-level {
        font-size: 12px;
        margin-right: 5px;
        color: #666;
    }

    .battery-icon {
        width: 22px;
        height: 12px;
        border: 1px solid #666;
        border-radius: 2px;
        position: relative;
    }

    .battery-icon::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -3px;
        transform: translateY(-50%);
        width: 2px;
        height: 5px;
        background: #666;
        border-radius: 0 1px 1px 0;
    }

    .battery-fill {
        position: absolute;
        top: 1px;
        left: 1px;
        bottom: 1px;
        width: 100%;
        background: #4ade80;
        border-radius: 1px;
        animation: charge 3s infinite;
    }

    @keyframes charge {
        0% {
            width: 90%;
        }
        50% {
            width: 95%;
        }
        100% {
            width: 90%;
        }
    }

    .phone-preview-content {
        background: white;
        width: 100%;
        position: relative;
    }

    .phone-preview-content::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(to right, transparent, #ddd, transparent);
    }

    .phone-preview-frame {
        width: 100%;
        height: 100%;
        background: white;
        /* 隐藏滚动条但保持滚动功能 */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
    }

    .phone-preview-frame::-webkit-scrollbar {
        width: 0px;
        height: 0px;
        background: transparent; /* Chrome/Safari/Webkit */
    }

    .close-button {
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--vp-c-brand);
        backdrop-filter: blur(10px);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        width: 80px;
        height: 28px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        padding: 0;
    }

    .close-button:hover {
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(15px);
        transform: translateX(-50%) scale(1.05);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
    }

    .preview-badge {
        position: fixed;
        right: 24px;
        bottom: 24px;
        width: 60px;
        height: 60px;
        background: var(--vp-c-brand);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow:
            0 4px 15px rgba(22, 197, 254, 0.4),
            0 0 0 4px rgba(22, 197, 254, 0.1);
        z-index: 9999;
        user-select: none;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .preview-badge:hover {
        transform: scale(1.1) translateY(-5px);
        box-shadow:
            0 8px 25px rgba(22, 197, 254, 0.5),
            0 0 0 8px rgba(22, 197, 254, 0.15);
    }

    .phone-preview-header::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 28px;
        border-radius: 20px;
        background: #000000;
    }
</style>
