<script setup lang="ts">
    // 设置组件名
    defineOptions({
        name: 'VirtualStatusBar',
    });

    // 获取当前时间
    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // 获取电池电量百分比
    const getBatteryLevel = () => {
        // 这里可以集成真实的电池API，目前返回模拟值
        return 100;
    };
</script>

<template>
    <div class="virtual-status-bar">
        <div class="content">
            <div class="left">
                <span class="time">{{ getCurrentTime() }}</span>
            </div>

            <div class="right">
                <div class="signal">
                    <div class="signal-bars">
                        <div class="signal-bar active"></div>
                        <div class="signal-bar active"></div>
                        <div class="signal-bar active"></div>
                        <div class="signal-bar"></div>
                    </div>
                </div>

                <div class="battery">
                    <div class="battery-container">
                        <div class="battery-level">
                            <div class="battery-fill" :style="{ width: getBatteryLevel() + '%' }" />
                        </div>
                        <div class="battery-tip" />
                    </div>
                    <span class="battery-percentage">{{ getBatteryLevel() }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .virtual-status-bar {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: none;
        height: 30px;

        @include useTheme {
            color: getVar('main-text-color');
            background-color: getVar('main-card-color');
        }

        // 只在屏幕宽度 >= 576px 时显示
        @media screen and (width >= 576px) {
            display: block;
        }

        .content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            padding: 0 20px;
            font-size: 14px;
            font-weight: 600;

            .left {
                display: flex;
                align-items: center;

                .time {
                    font-size: 14px;
                    font-weight: 600;
                }
            }

            .right {
                display: flex;
                gap: 8px;
                align-items: center;

                .signal {
                    display: flex;
                    align-items: center;

                    .signal-bars {
                        display: flex;
                        gap: 2px;
                        align-items: flex-end;
                        height: 12px;

                        .signal-bar {
                            width: 3px;
                            background-color: #ccc;
                            border-radius: 1px;
                            transition: all 0.2s ease;

                            &:nth-child(1) {
                                height: 4px;
                            }

                            &:nth-child(2) {
                                height: 6px;
                            }

                            &:nth-child(3) {
                                height: 8px;
                            }

                            &:nth-child(4) {
                                height: 10px;
                            }

                            &.active {
                                @include useTheme {
                                    background-color: getVar('main-text-color');
                                }
                            }
                        }
                    }
                }

                .battery {
                    display: flex;
                    gap: 4px;
                    align-items: center;

                    .battery-container {
                        position: relative;
                        width: 24px;
                        height: 12px;
                        border: 1px solid;
                        border-radius: 2px;

                        @include useTheme {
                            border-color: getVar('main-text-color');
                        }

                        .battery-level {
                            position: relative;
                            height: 100%;
                            overflow: hidden;
                            border-radius: 1px;

                            .battery-fill {
                                height: 100%;
                                background-color: #4cd964;
                                border-radius: 1px;
                                transition: width 0.3s ease;
                            }
                        }

                        .battery-tip {
                            position: absolute;
                            top: 50%;
                            right: -3px;
                            width: 2px;
                            height: 6px;
                            border-radius: 0 1px 1px 0;
                            transform: translateY(-50%);

                            @include useTheme {
                                background-color: getVar('main-text-color');
                            }
                        }
                    }

                    .battery-percentage {
                        font-size: 12px;
                        font-weight: 500;
                    }
                }
            }
        }
    }
</style>
