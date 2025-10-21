# H5 适配方案

移动端适配是 H5 开发中的重要环节，本项目采用现代化的 viewport 适配方案，确保在各种设备上都能有良好的显示效果。

## Viewport 设置

在 [index.html] 文件中，我们设置了标准的 viewport meta 标签：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
/>
```

这些设置确保了页面在移动设备上的正确显示，具体含义如下：

- `width=device-width`: 将页面宽度设置为设备屏幕宽度
- `initial-scale=1.0`: 初始缩放比例为 1
- `maximum-scale=1.0`: 最大缩放比例为 1
- `minimum-scale=1.0`: 最小缩放比例为 1
- `user-scalable=no`: 禁止用户手动缩放
- `viewport-fit=cover`: 适配 iPhone X 等异形屏设备

## 单位适配方案

项目采用 `px` 到 `vw` 的自动转换方案，通过 PostCSS 插件
[postcss-mobile-forever](https://github.com/wswmsword/postcss-mobile-forever) 实现。

### 配置详情

在 [build/vite/plugin/postcssPxToView.ts] 文件中，我们配置了详细的转换规则：

```ts
export function postcssPxToViewProtConfig(): Plugin {
  return viewport({
    appSelector: '#app', // 根元素选择器，用于设置桌面端和横屏时的居中样式
    maxDisplayWidth: 500, // 桌面端最大展示宽度
    viewportWidth: 375, // UI设计稿的宽度
    unitPrecision: 5, // 转换后的精度，即小数点位数
    propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
    mobileUnit: 'vw', // 指定需要转换成的视口单位，建议使用 vw
    selectorBlackList: ['keep-px'], // 指定不转换为视窗单位的类名
    valueBlackList: ['1px solid'], // 表示属性值包含 '1px solid' 的内容不会转换
    exclude: [/node_modules/], // 忽略某些文件夹下的文件
    rootContainingBlockSelectorList: ['.mi-popup--bottom'],
    border: true,
    appContainingBlock: 'auto',
    necessarySelectorWhenAuto: 'body',
  });
}
```

### 核心配置说明

1. **viewportWidth**: 设置为 375，对应常见的移动端 UI 设计稿宽度（如 iPhone 6/7/8）
2. **mobileUnit**: 使用 `vw` 作为目标单位，实现响应式布局
3. **selectorBlackList**: 包含 `keep-px` 的类名不会被转换，可用于保留某些元素的固定像素尺寸
4. **valueBlackList**: 包含 `1px solid` 的样式值不会被转换，用于保持边框的清晰显示

## UnoCSS 配合配置

项目使用 UnoCSS 作为原子化 CSS 框架，并配置了 [presetRemToPx] 预设：

```ts
presetRemToPx({
  baseFontSize: 16,
});
```

这个配置将 UnoCSS 生成的 `rem` 单位转换为 `px`，然后再由 PostCSS 插件转换为
`vw`，形成完整的单位转换链。

## 使用示例

在实际开发中，我们可以直接使用 `px` 单位编写样式：

```css
.example {
  width: 100px;
  height: 50px;
  font-size: 16px;
  margin: 10px;
}
```

这些样式会自动转换为对应的 `vw` 单位：

```css
.example {
  width: 26.66667vw;
  height: 13.33333vw;
  font-size: 4.26667vw;
  margin: 2.66667vw;
}
```

## 特殊情况处理

### 保留像素单位

对于需要保持固定像素大小的元素，可以通过添加 `keep-px` 类名来避免转换：

```html
<div class="text-16px keep-px">这个文本将保持16px大小</div>
```

### 边框处理

对于 1px 边框，插件会自动处理以确保在高分辨率屏幕上仍然显示为 1px：

```css
.border {
  border: 1px solid #ccc; /* 这个边框不会被转换 */
}
```

## 横屏和桌面端适配

插件还提供了对横屏和桌面端的适配支持：

- `maxDisplayWidth`: 设置桌面端最大展示宽度为 500px
- `appSelector`: 设置根元素选择器，用于横屏和桌面端的居中显示

这些配置确保了应用在各种设备和屏幕方向上都能有良好的用户体验。

## 总结

本项目的 viewport 适配方案具有以下优势：

1. **开发友好**: 开发者可以直接使用熟悉的 px 单位进行开发
2. **响应式**: 自动转换为 vw 单位，实现真正的响应式布局
3. **精细控制**: 支持黑名单机制，可以精确控制哪些元素需要或不需要转换
4. **兼容性好**: 兼顾了各种设备和屏幕方向的适配需求
5. **性能优秀**: 通过构建时转换，运行时无额外性能开销

这套方案使得移动端 H5 开发变得更加简单高效，同时保证了在各种设备上的显示效果。
