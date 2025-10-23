# 工具集 (Utils)

在现代前端开发中，工具函数和辅助功能是提高开发效率和代码质量的重要组成部分。本项目提供了一套丰富的工具函数和指令集，涵盖了从基础功能到复杂交互的各种场景。

## 概述

项目中的工具集位于 [src/utils/] 目录下，主要分为以下几个部分：

1. **基础工具函数** - 提供常用的功能函数
2. **Vue 指令集** - 提供一系列实用的 Vue 自定义指令
3. **常量配置** - 定义项目中使用的常量
4. **事件通信** - 提供组件间通信的机制

## 基础工具函数

### 输入框顶部显示 (inputTop.ts)

在移动端开发中，软键盘弹出时可能会遮挡输入框，[inputTop.ts] 提供了解决方案：

```ts
class inputTop {
  // 计算并滚动到合适的位置，避免输入框被软键盘遮挡
  calcScrollTop = (visualHeight, scrollObj) => {
    // 实现逻辑
  };

  // 初始化事件监听
  init = () => {
    if (/iphone|ipad|ipod|ios/i.test(navigator.userAgent)) {
      window.addEventListener("focusin", this.focusinPage);
    } else {
      window.addEventListener("click", this.handleClickPage, true);
      window.addEventListener("resize", this.handleAndroidResize);
    }
  };
}

export default new inputTop();
```

使用方式：

```ts
import inputTop from "@/utils/inputTop";

// 在应用初始化时调用
inputTop.init();
```

### 横屏处理 (landscape.ts)

处理设备横竖屏切换的工具函数：

```ts
class landscape {
  evt = "onorientationchange" in window ? "orientationchange" : "resize";

  // 重置屏幕方向
  reset = () => {
    // 根据设备方向调整页面布局
  };

  // 初始化事件监听
  init = () => {
    window.addEventListener("orientationchange", this.reset, false);
  };
}

export default new landscape();
```

### 脚本动态加载 (script.ts)

提供动态加载和移除脚本的功能：

```ts
// 检测是否已加载脚本
export const checkIsLoadScript = (src: string): boolean => {
  // 实现逻辑
};

// 异步加载脚本
export const asyncLoadScript = async ({ src, id }: { src: string; id: string }): Promise<void> => {
  // 实现逻辑
};

// 移除脚本
export const removeScript = (id: string): Promise<void> => {
  // 实现逻辑
};
```

### 应用更新检测 (updater.ts)

检测应用是否有新版本发布：

```ts
export class Updater {
  // 比较脚本差异以判断是否需要更新
  compare(oldArr: string[], newArr: string[]): void {
    const base = oldArr.length;
    const arr = Array.from(new Set(oldArr.concat(newArr)));
    // 如果新旧length一样无更新
    if (arr.length === base) {
      this.dispatch["no-update"]?.forEach(fn => fn());
    } else {
      // 否则通知更新
      this.dispatch.update?.forEach(fn => fn());
    }
  }

  // 定时检测更新
  timing(time = 10000): void {
    // 实现逻辑
  }
}
```

## Vue 指令集

项目提供了一系列实用的 Vue 自定义指令，位于 [src/utils/directives/] 目录下。

### 注册方式

在 [src/utils/directives/index.ts] 中统一注册所有指令：

```ts
import type { App } from "vue";
import lazyImage from "./lazyImage";
import draggable from "./draggable";
import copy from "./copy";
// ... 其他指令

export const useDirectives = (app: App) => {
  // 图片懒加载指令
  app.directive("lazy", lazyImage);
  // 拖拽指令
  app.directive("drag", draggable);
  // 复制指令
  app.directive("copy", copy);
  // ... 其他指令注册
};
```

### 指令列表

#### 1. 复制指令 (copy.ts)

用于将指定内容复制到剪贴板：

```vue
<template>
  <button v-copy="data">复制</button>
</template>

<script setup>
  const data = ref("需要复制的内容");
</script>
```

#### 2. 拖拽指令 (draggable.ts)

使元素可拖拽：

```vue
<template>
  <div v-drag>可拖拽元素</div>
</template>
```

#### 3. 防抖指令 (debounce.ts)

防止函数在短时间内被频繁调用：

```vue
<template>
  <button v-debounce="handleClick">点击</button>
</template>

<script setup>
  const handleClick = () => {
    console.log("点击事件");
  };
</script>
```

#### 4. 节流指令 (throttle.ts)

限制函数执行频率：

```vue
<template>
  <button v-throttle="handleClick">点击</button>
</template>
```

#### 5. 长按指令 (longPress.ts)

处理长按事件：

```vue
<template>
  <button v-long-press="handleLongPress">长按</button>
</template>

<script setup>
  const handleLongPress = () => {
    console.log("长按事件触发");
  };
</script>
```

#### 6. 图片懒加载 (lazyImage.ts)

实现图片懒加载功能：

```vue
<template>
  <img v-lazy="imageUrl" />
</template>

<script setup>
  const imageUrl = "https://example.com/image.jpg";
</script>
```

#### 7. 水印指令 (watermark.ts)

为元素添加水印：

```vue
<template>
  <div v-watermark="watermarkText">内容区域</div>
</template>

<script setup>
  const watermarkText = "水印文字";
</script>
```

#### 8. 涟漪效果 (ripple.ts)

为元素添加点击涟漪效果：

```vue
<template>
  <button v-ripple>点击出现涟漪效果</button>
</template>
```

#### 9. 滑入动画 (slideIn.ts)

为元素添加滑入动画效果：

```vue
<template>
  <div v-slide-in>滑入动画</div>
</template>
```

## 常量配置

### 主题常量 (const/theme.ts)

定义了项目中使用的主题相关常量：

```ts
export interface IThemeState {
  // 系统主题
  themeMode: "light" | "dark";
  // 系统风格
  themeColor: string;
  // 系统内置风格
  themeColorList: string[];
  // 是否开启路由动画
  isPageAnimate: boolean;
  // 路由动画类型
  pageAnimateType: string;
}

// 动画类型列表
export const animates = [
  { value: "fade", text: "淡入淡出" },
  { value: "fade-bottom", text: "淡入淡出-底部" },
  // ... 其他动画类型
];

// 主题色列表
export const themeColorList: string[] = [
  "#5d9dfe",
  "#2d8cf0",
  // ... 其他颜色
];

// 默认设置
export const setting: IThemeState = {
  themeMode: "light",
  themeColor: "#5d9dfe",
  themeColorList,
  isPageAnimate: true,
  pageAnimateType: "fade",
};
```

## 事件通信 (emit.ts)

使用 mitt 库实现全局事件通信：

```ts
import mitt from "mitt";
const emitter = mitt();
export default emitter;
```

使用示例：

```ts
// 发送事件
import emitter from "@/utils/emit";
emitter.emit("event-name", data);

// 监听事件
emitter.on("event-name", data => {
  // 处理数据
});

// 移除监听
emitter.off("event-name", handler);
```

## 使用建议

1. **按需使用**：根据实际需求选择合适的工具函数和指令
2. **统一注册**：通过统一入口注册所有指令，便于管理
3. **合理扩展**：在现有工具基础上进行扩展，保持一致性
4. **文档维护**：新增工具函数时及时更新文档说明
5. **类型安全**：充分利用 TypeScript 提供类型支持

通过这套工具集，开发者可以更高效地实现各种常见功能，提升开发效率和代码质量。
