# UI 组件库

[@miracle-web/ui](https://wuxingxi.top/miracle/)
是本项目采用的移动端 Vue3 组件库，它提供了丰富的移动端组件和优秀的用户体验。

## 简介

@miracle-web/ui 是一套基于 Vue 3 开发的移动端组件库，专为移动端 H5 应用设计。它具有以下特点：

- 🚀 基于 Vue 3 和 TypeScript 开发
- 📱 专注于移动端体验优化
- 🎨 支持主题定制和暗黑模式
- 📦 按需引入，减少打包体积
- 🌍 国际化支持
- 🧪 完善的单元测试

## 安装与引入

项目中已经集成了 @miracle-web/ui 组件库，并在 [package.json] 中声明了依赖：

```json
"dependencies": {
  "@miracle-web/ui": "^0.0.3",
  // ...
}
```

在 [src/plugins/miracleComponents.ts] 中，项目配置了组件库的全局样式和插件：

```ts
// 函数组件的样式
import '@miracle-web/ui/es/toast/style';
import '@miracle-web/ui/es/dialog/style';
import '@miracle-web/ui/es/notify/style';
import '@miracle-web/ui/es/image-preview/style';

// 组件桌面端适配
import '@miracle-web/touch-emulator';
```

## 自动按需引入

项目通过 [unplugin-vue-components] 插件实现了组件的自动按需引入，无需手动导入即可直接使用组件。

在 [types/components.d.ts] 文件中可以看到自动引入的组件类型定义：

```ts
declare module 'vue' {
  export interface GlobalComponents {
    MiActionSheet: (typeof import('@miracle-web/ui/es'))['ActionSheet'];
    MiButton: (typeof import('@miracle-web/ui/es'))['Button'];
    MiCell: (typeof import('@miracle-web/ui/es'))['Cell'];
    MiCellGroup: (typeof import('@miracle-web/ui/es'))['CellGroup'];
    MiCheckbox: (typeof import('@miracle-web/ui/es'))['Checkbox'];
    MiConfigProvider: (typeof import('@miracle-web/ui/es'))['ConfigProvider'];
    MiDivider: (typeof import('@miracle-web/ui/es'))['Divider'];
    MiField: (typeof import('@miracle-web/ui/es'))['Field'];
    MiForm: (typeof import('@miracle-web/ui/es'))['Form'];
    MiImage: (typeof import('@miracle-web/ui/es'))['Image'];
    MiSpace: (typeof import('@miracle-web/ui/es'))['Space'];
    MiSwitch: (typeof import('@miracle-web/ui/es'))['Switch'];
    MiTabbar: (typeof import('@miracle-web/ui/es'))['Tabbar'];
    MiTabbarItem: (typeof import('@miracle-web/ui/es'))['TabbarItem'];
    // ...
  }
}
```

## 主要组件示例

### 基础组件

#### Button 按钮

```vue
<template>
  <mi-button type="primary">主要按钮</mi-button>
  <mi-button type="success">成功按钮</mi-button>
  <mi-button type="warning">警告按钮</mi-button>
  <mi-button type="danger">危险按钮</mi-button>
</template>
```

#### Cell 单元格

```vue
<template>
  <mi-cell-group inset>
    <mi-cell title="单元格" value="内容" is-link />
    <mi-cell title="单元格" value="内容" is-link />
  </mi-cell-group>
</template>
```

### 表单组件

#### Field 输入框

```vue
<template>
  <mi-field v-model="value" label="输入框" placeholder="请输入内容" />
</template>
```

#### Form 表单

```vue
<template>
  <mi-form @submit="onSubmit">
    <mi-field v-model="username" name="username" label="用户名" placeholder="用户名" />
    <mi-field v-model="password" type="password" name="password" label="密码" placeholder="密码" />
    <div style="margin: 16px;">
      <mi-button round block type="primary" native-type="submit"> 提交 </mi-button>
    </div>
  </mi-form>
</template>
```

### 反馈组件

#### Toast 轻提示

```ts
import { showToast } from '@miracle-web/ui';

showToast('提示内容');
```

#### Dialog 弹出框

```ts
import { showDialog } from '@miracle-web/ui';

showDialog({
  title: '标题',
  message: '弹窗内容',
});
```

## 主题定制

项目支持通过 CSS 变量进行主题定制，在 [src/styles/miracle.scss] 中配置了主题色：

```scss
body {
  --mi-primary-color: @primaryColor;
}
```

同时，项目还通过 [ConfigProvider] 组件支持更细粒度的主题配置：

```ts
import { useTheme } from '@/hooks/useTheme'

const { getThemeVars } = useTheme()

// 在模板中使用
<mi-config-provider :theme-vars="getThemeVars()">
  <!-- 应用内容 -->
</mi-config-provider>
```

在 [useTheme] hook 中定义了完整的主题变量映射：

```ts
const getThemeVars = (): ConfigProviderThemeVars => {
  const themeColor = unref(getThemeColor);
  const darkenStr = darken(themeColor, 25);
  const lightenStr = lighten(themeColor, 10);

  return {
    actionSheetCancelTextColor: themeColor,
    buttonPrimaryBackground: themeColor,
    buttonPrimaryBorderColor: themeColor,
    // ...
  };
};
```

## 暗黑模式支持

组件库原生支持暗黑模式，项目通过 [useTheme] hook 实现了暗黑模式切换：

```vue
<template>
  <mi-cell center title="暗黑模式">
    <template #right-icon>
      <mi-switch v-model="toggleTheme" size="22" />
    </template>
  </mi-cell>
</template>

<script setup lang="ts">
  import { useTheme } from '@/hooks/useTheme';

  const { toggleTheme } = useTheme();
</script>
```

## 常用组件列表

项目中使用了以下主要组件：

1. **布局组件**：[Space]、[Divider]
2. **导航组件**：[Tabbar]、[TabbarItem]
3. **表单组件**：[Form]、[Field]、[Switch]、[Checkbox]、[Button]
4. **展示组件**：[Cell]、[Image]
5. **反馈组件**：[Toast]、[Dialog]、[ActionSheet]
6. **其他组件**：[ConfigProvider]、[Popup]、[Picker]

## 移动端适配

组件库针对移动端进行了专门优化，包括：

1. **触摸友好**：组件具有合适的触摸目标大小
2. **手势支持**：支持滑动、长按等移动端手势
3. **桌面端模拟**：通过 `@miracle-web/touch-emulator` 实现桌面端触摸事件模拟

## 总结

@miracle-web/ui 为本项目提供了丰富的移动端组件支持，通过自动按需引入、主题定制、暗黑模式等特性，大大提升了开发效率和用户体验。开发者可以专注于业务逻辑实现，而无需过多关注组件的细节实现。
