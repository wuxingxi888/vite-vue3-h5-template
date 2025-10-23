# H5和原生交互

在混合应用开发中，H5页面与原生App之间的交互是一个重要环节。本模板提供了完整的H5与原生交互的封装，支持Android和iOS平台。

## 交互原理

### JS调用原生（JS Call Native）

JS调用原生主要通过以下方式实现：

1. **Android平台**：通过`window.android`对象直接调用原生方法
2. **iOS平台**：通过`window.webkit.messageHandlers`发送消息给原生

### 原生调用JS（Native Call JS）

原生调用JS主要通过以下方式实现：

1. **Android平台**：直接调用`window`对象下的JS方法
2. **iOS平台**：通过`window.webkit.messageHandlers`回调JS方法

## 核心实现

### JS调用原生封装

在`src/services/jsCallNative.ts`中封装了JS调用原生的方法：

```typescript
import router from "@/router";
import { judgeSystem } from "@miracle-web/utils";

const { isAndroid, isiOS, isMobile } = judgeSystem();

/**
 * @description: 封装js调用原生App的方法
 */
export default class JsCallNative {
  static AppKey = "android";

  /**
   * @description: 返回
   */
  static back() {
    try {
      if (!isMobile) {
        router.go(-1);
      }
      if (isAndroid) {
        window[this.AppKey].back();
      }

      if (isiOS) {
        window.webkit.messageHandlers.back.postMessage({});
      }
    } catch (error) {
      router.go(-1);
      console.log(error);
    }
  }

  /**
   * @description: 示例方法（带参数）
   * @param {number} type 0:xx 1:微信 2:xx
   * @param {string} url xxx
   */
  static xxx(type: number, url: string) {
    try {
      if (isAndroid) {
        window[this.AppKey].xxx(type, url);
      }

      if (isiOS) {
        window.webkit.messageHandlers.xxx.postMessage({ type, url });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description: 示例方法（无参数）
   */
  static vvv() {
    try {
      if (isAndroid) {
        window[this.AppKey].vvv();
      }
      if (isiOS) {
        window.webkit.messageHandlers.vvv.postMessage({});
      }
    } catch (error) {
      console.log(error);
    }
  }
}
```

### 原生调用JS封装

在`src/services/nativeCallJs.ts`中封装了原生调用JS的方法：

```typescript
import emitter from "@/utils/emit";
import { judgeSystem } from "@miracle-web/utils";

const { isAndroid, isiOS } = judgeSystem();

/**
 * @description: 封装原生App调用js的方法
 */
export default class NativeCallJs {
  /**
   * @description: 示例方法
   * @param {object} data 数据
   */
  static xxx(data: string) {
    if (isAndroid) {
      emitter.emit("xxx", JSON.parse(data));
    }
    if (isiOS) {
      emitter.emit("xxx", data);
    }
  }
}
```

## 使用示例

### JS调用原生方法

```vue
<template>
  <div>
    <button @click="goBack">返回</button>
    <button @click="callNativeMethod">调用原生方法</button>
  </div>
</template>

<script setup lang="ts">
  import JsCallNative from "@/services/jsCallNative";

  // 调用返回方法
  const goBack = () => {
    JsCallNative.back();
  };

  // 调用原生方法（带参数）
  const callNativeMethod = () => {
    JsCallNative.xxx(1, "https://example.com");
  };
</script>
```

### 原生调用JS方法

原生调用JS的机制是通过事件发射器（emitter）来实现的。具体流程如下：

1. 原生代码中调用 NativeCallJs 类中的方法，并传入参数
2. NativeCallJs 类中的方法会触发一个事件，并携带参数
3. 在Vue页面中使用 emitter.on 方法监听这个事件，并执行相应的逻辑

在Android端，原生调用JS的方式如下：

```java
// 调用JS方法
webView.loadUrl("javascript:NativeCallJs.xxx('data')");
```

在iOS端，原生调用JS的方式如下：

```swift
// 调用JS方法
webView.evaluateJavaScript("NativeCallJs.xxx('data')", completionHandler: nil)
```

在Vue页面中，监听JS方法调用，并执行相应的逻辑：

```typescript
// 首先在main.ts挂载NativeCallJs类
import NativeCallJs from "@/services/nativeCallJs";
window.NativeCallJs = NativeCallJs;
```

```vue
<script setup lang="ts">
  import { onMounted, onUnmounted } from "vue";
  import emitter from "@/utils/emit";

  // 监听原生调用JS事件
  const handleNativeCall = data => {
    console.log("接收到原生调用:", data);
    // 处理原生传递的数据
  };

  onMounted(() => {
    // 注册事件监听
    emitter.on("xxx", handleNativeCall);
  });

  onUnmounted(() => {
    // 移除事件监听（重要：避免内存泄漏）
    emitter.off("xxx", handleNativeCall);
  });
</script>
```

这种方式的优势在于解耦了原生和H5的直接调用关系，通过事件机制使得通信更加灵活和安全。

## 添加新的交互方法

### 1. 在JsCallNative类中添加方法

在`src/services/jsCallNative.ts`中添加新的静态方法：

```typescript
static newMethod(params: any) {
  try {
    if (isAndroid) {
      window[this.AppKey].newMethod(params)
    }
    if (isiOS) {
      window.webkit.messageHandlers.newMethod.postMessage(params)
    }
  } catch (error) {
    console.log(error)
  }
}
```

### 2. 在NativeCallJs类中添加方法

在`src/services/nativeCallJs.ts`中添加新的静态方法：

```typescript
static newCallback(data: any) {
  // 处理原生回调数据
  emitter.emit('newCallback', data)
}
```

### 3. 在原生端实现对应方法

Android端需要在对应的WebView接口中实现`newMethod`方法，iOS端需要在WKScriptMessageHandler中处理`newMethod`消息。

## 注意事项

1. **平台兼容性**：确保在Web环境下有对应的降级处理
2. **异常处理**：所有的原生调用都应该包含try-catch异常处理
3. **数据格式**：iOS通过postMessage传递的数据格式可能与Android不同，需要做兼容处理
4. **事件监听**：使用事件总线时要注意在组件销毁时移除监听，避免内存泄漏
5. **安全性**：不要在H5页面中暴露敏感的原生功能接口
