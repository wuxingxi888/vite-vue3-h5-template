# Axios 封装

在现代前端开发中，HTTP 请求是与后端服务交互的核心方式。本项目对 Axios 进行了深度封装，提供了统一的请求管理机制，以提高代码的可维护性和开发效率。

## 为什么封装 Axios

直接使用 Axios 虽然已经很方便，但在大型项目中，我们通常需要：

1. **统一的请求/响应处理**：对请求头、参数、响应数据进行统一处理
2. **错误处理**：统一处理网络错误、业务错误等
3. **拦截器管理**：添加请求和响应拦截器，处理通用逻辑
4. **配置管理**：统一管理请求配置，如超时时间、基础URL等
5. **重试机制**：在网络不稳定时自动重试请求
6. **取消重复请求**：避免重复发送相同请求
7. **Token 管理**：自动携带认证信息

## 封装结构

项目中的 Axios 封装主要位于
[src/utils/http/](file:///Users/wuxingxi/Desktop/miracle-vue3-h5-template/apps/h5-template/src/utils/http)
目录下：

```
src/utils/http/
├── index.ts       # Axios 实例创建和核心封装
├── httpEnum.ts    # 枚举类型定义
└── types.ts       # 类型定义
```

### 核心封装 (index.ts)

项目基于
[@miracle-web/utils](file:///Users/wuxingxi/Desktop/miracle-vue3-h5-template/apps/h5-template/package.json#L35-L35)
中的
[MAxios](file:///Users/wuxingxi/Desktop/miracle-vue3-h5-template/node_modules/.pnpm/@miracle-web+utils@0.0.6/node_modules/@miracle-web/utils/es/axios/index.d.mts#L54-L54)
类进行了二次封装，主要包含以下几个部分：

#### 请求转换器 (transform)

定义了请求各个阶段的处理逻辑：

```ts
const transform: AxiosTransform = {
  /**
   * @description: 请求之前处理config
   */
  beforeRequestHook: (config, options) => {
    // 处理URL前缀、参数、时间戳等
  },

  /**
   * @description: 请求成功数据处理
   */
  requestSuccessResult: (response: AxiosResponse<Result>, options: RequestOptions) => {
    // 处理响应数据，显示消息提示等
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config: InternalAxiosRequestConfig, options: CreateAxiosOptions) => {
    // 添加token、平台信息等
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (response: AxiosResponse) => {
    // 处理业务错误、token过期等
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: error => {
    // 处理网络错误、取消请求等
  },
};
```

#### Axios 实例创建

通过 `createAxios` 函数创建 Axios 实例：

```ts
function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new MAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        // token 前缀 Bearer
        authenticationScheme: '',
        // 接口前缀
        prefixUrl: urlPrefix,

        // 如果是json格式
        headers: { 'Content-Type': ContentTypeEnum.JSON },

        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 接口地址
          apiUrl: getEnvConfig().apiUrl,
          // 接口拼接地址
          urlPrefix,
          // 是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          retryOptions: {
            isRetry: true,
            retryCount: 2,
            __retryCount: 0,
            retryWaitTime: 1000,
          },
        },
      },
      opt || {}
    )
  );
}

export const http = createAxios();
```

### 枚举定义 (httpEnum.ts)

定义了常用的枚举类型：

```ts
/**
 * @description: 请求结果集
 */
export enum ResultEnum {
  SUCCESS = 200,
  TOKEN_EXPIRED = 401,
  ERROR = 300,
  TIMEOUT = 10042,
}

/**
 * @description: 请求方法
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description: 常用的contentTyp类型
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // text
  TEXT = 'text/plain;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data 上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
```

## 使用方式

### API 接口定义

在 [src/api/](file:///Users/wuxingxi/Desktop/miracle-vue3-h5-template/apps/h5-template/src/api)
目录下按模块定义 API 接口：

```ts
// src/api/system/user.ts
import { http } from '@/utils/http';

export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * @description: 用户登录
 */
export function login(params: any) {
  return http.request<BasicResponseModel>(
    {
      url: '/login',
      method: 'POST',
      params,
    },
    {
      successMessageText: '登录成功，即将进入系统',
    }
  );
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: '/getUserInfo',
    method: 'get',
  });
}
```

### 在组件中使用

```vue
<script setup lang="ts">
  import { login, getUserInfo } from '@/api/system/user';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();

  const handleLogin = async () => {
    try {
      const res = await login({ username: 'admin', password: '123456' });
      if (res) {
        userStore.setToken(res.data.token);
        // 跳转到首页
      }
    } catch (error) {
      console.error('登录失败', error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const res = await getUserInfo();
      userStore.setUserInfo(res.data);
    } catch (error) {
      console.error('获取用户信息失败', error);
    }
  };
</script>
```

## 核心特性

### 1. 自动携带 Token

在请求拦截器中自动从 Pinia store 获取并携带 Token：

```ts
requestInterceptors: (config: InternalAxiosRequestConfig, options: CreateAxiosOptions) => {
  const userStore = useUserStoreWidthOut();
  const token = userStore.getToken;
  // jwt token
  if (token && config.requestOptions?.withToken) {
    config.headers.Authorization = options.authenticationScheme
      ? `${options.authenticationScheme} ${token}`
      : token;
  }
  // ...
};
```

### 2. 智能错误处理

根据不同的错误码进行相应的处理：

```ts
responseInterceptors: (response: AxiosResponse) => {
  const { code, message } = response.data;

  if (code === ResultEnum.ERROR) {
    showFailToast(message);
  }

  if (code === ResultEnum.TOKEN_EXPIRED) {
    showDialog({
      title: '提示',
      message: '登录身份已失效，请重新登录!',
    }).then(() => {
      window.location.href = PageEnum.BASE_LOGIN;
    });
  }

  return response;
};
```

### 3. 请求重试机制

在网络不稳定时自动重试请求：

```ts
retryOptions: {
  isRetry: true,
  retryCount: 2,
  __retryCount: 0,
  retryWaitTime: 1000
}
```

### 4. 取消重复请求

通过 `ignoreCancelToken` 配置避免重复请求：

```ts
// 忽略重复请求
ignoreCancelToken: true,
```

### 5. 环境配置支持

通过环境变量配置不同的 API 地址：

```ts
// 接口地址
apiUrl: getEnvConfig().apiUrl,
```

## 最佳实践

1. **模块化管理**：按业务模块组织 API 接口
2. **类型安全**：为请求参数和响应数据定义 TypeScript 接口
3. **统一错误处理**：通过拦截器统一处理错误，避免在业务代码中重复处理
4. **合理配置**：根据不同接口需求合理配置请求选项
5. **避免硬编码**：使用枚举定义状态码、请求方法等常量

通过这套封装，项目实现了统一、高效、可维护的 HTTP 请求管理，大大提升了开发效率和代码质量。
