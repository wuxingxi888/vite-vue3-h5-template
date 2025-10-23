# Plop 代码模板生成

在现代前端开发中，为了提高开发效率和代码一致性，项目通常会使用代码生成工具来自动生成常用的代码结构。本项目集成了 Plop.js 代码生成工具，通过预定义的模板快速生成页面、组件和状态管理模块。

## 什么是 Plop

Plop 是一个微型生成器框架，可用于创建任何类型的文件。它通过定义生成器（Generator）来创建文件模板，允许开发者通过交互式命令行界面快速生成代码文件。

在 H5 项目中，我们使用 Plop 来自动化生成常用的代码结构，避免重复劳动，提高开发效率。

## 项目集成

项目在 [package.json] 中配置了 Plop 相关的脚本：

```json
{
  "scripts": {
    "new": "plop"
  }
}
```

通过运行 `pnpm new` 命令即可启动 Plop 代码生成器。

## 配置文件

### 主配置文件 (plopfile.js)

项目根目录下的 [plopfile.js] 是 Plop 的主配置文件：

```js
import { promises as fs } from "node:fs";

export default async function (plop) {
  plop.setWelcomeMessage("请选择需要创建的模式：");
  const items = await fs.readdir("./plop-templates");
  for (const item of items) {
    const stat = await fs.lstat(`./plop-templates/${item}`);
    if (stat.isDirectory()) {
      const prompt = await import(`./plop-templates/${item}/prompt.js`);
      plop.setGenerator(item, prompt.default);
    }
  }
}
```

该配置文件会自动读取 [plop-templates] 目录下的所有模板，并将其注册为生成器。

### 模板目录结构

项目中的模板文件位于 [plop-templates] 目录下，目前包含以下三类模板：

```
plop-templates/
├── component/     # 组件模板
├── page/          # 页面模板
└── store/         # 状态管理模板
```

## 模板类型

### 页面模板 (Page)

页面模板用于快速生成新的页面组件，包含 Vue 组件文件和路由配置。

#### 配置文件 (prompt.js)

页面模板的配置文件 [plop-templates/page/prompt.js] 定义了交互式问题：

```js
export default {
  description: "创建页面",
  prompts: [
    {
      type: "list",
      name: "directory",
      message: "请选择页面创建目录",
      choices: getFolder("src/views"),
    },
    {
      type: "input",
      name: "name",
      message: "请输入文件名",
      validate: v => {
        if (!v || v.trim === "") {
          return "文件名不能为空";
        } else {
          return true;
        }
      },
    },
    {
      type: "input",
      name: "title",
      message: "请输入页面标题Title",
      validate: v => {
        if (!v || v.trim === "") {
          return "页面标题不能为空";
        } else {
          return true;
        }
      },
    },
    {
      type: "confirm",
      name: "keepAlive",
      message: "是否缓存页面",
      default: false,
    },
  ],
  actions: data => {
    // 定义生成动作
  },
};
```

#### 模板文件

1. **组件模板** ([index.hbs])：

```
<script setup lang="ts">
defineOptions({ name: '{{properCase cpsName}}' })
</script>

<template>
  <div class="h-screen overflow-y-scroll">
    <custom-nav-bar></custom-nav-bar>
  </div>
</template>

<style lang="scss" scoped></style>
```

2. **路由模板** ([router.hbs])：

```
{
  path: '/{{camelCase name}}',
  name: '{{properCase name}}',
  meta: {
    title: '{{ title }}',
    keepAlive: {{ keepAlive }}
  },
  component: () => import('@/views/{{ dir }}/{{camelCase name }}/index.vue')
},
```

### 组件模板 (Component)

组件模板用于快速生成新的 Vue 组件。

#### 配置文件 (prompt.js)

组件模板的配置文件 [plop-templates/component/prompt.js] 定义了交互式问题：

```js
export default {
  description: "创建组件",
  prompts: [
    {
      type: "confirm",
      name: "isGlobal",
      message: "是否为全局组件",
      default: false,
    },
    {
      type: "list",
      name: "path",
      message: "请选择组件创建目录",
      choices: getFolder("src/views"),
      when: answers => {
        return !answers.isGlobal;
      },
    },
    {
      type: "input",
      name: "name",
      message: "请输入组件名称",
      validate: v => {
        if (!v || v.trim === "") {
          return "组件名称不能为空";
        } else {
          return true;
        }
      },
    },
  ],
  actions: data => {
    // 定义生成动作
  },
};
```

#### 模板文件 ([index.hbs])

```
<!-- @example -->
<!-- const {{properCase name}}Ref = ref<InstanceType<typeof {{properCase name}}>>(); -->
<!-- {{properCase name}}Ref.value?.onOpen() -->
<!-- <{{dashCase name}} ref="{{properCase name}}Ref"></{{dashCase name}}> -->
<script setup lang="ts">
defineOptions({ name: '{{properCase name}}' })

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  }
})

const openModal = ref(false)

const emit = defineEmits(['onClose', 'onRefresh'])

const onOpen = () => {
  openModal.value = true
}

const onClose = () => {
  emit('onClose')
}

const onRefresh = () => {
  emit('onRefresh')
}

defineExpose({ onOpen })
</script>

<template>
  <mi-popup
    v-model:show="openModal"
    :close-on-click-overlay="false"
    round
    closeable
    @close="onClose"
  >
    <div class="w-300px h-300px flex-center">
      <p class="text-10">hello modal</p>
    </div>
  </mi-popup>
</template>

<style lang="scss" scoped></style>
```

### 状态管理模板 (Store)

状态管理模板用于快速生成新的 Pinia Store 模块。

#### 配置文件 (prompt.js)

状态管理模板的配置文件 [plop-templates/store/prompt.js] 定义了交互式问题：

```js
export default {
  description: "创建全局状态",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "请输入模块名称",
      validate: v => {
        if (!v || v.trim === "") {
          return "模块名称不能为空";
        } else {
          return true;
        }
      },
    },
  ],
  actions: () => {
    // 定义生成动作
  },
};
```

#### 模板文件 ([index.hbs])

```handlebars
import { acceptHMRUpdate, defineStore, type StateTree } from 'pinia' import { store } from '@/store'
import { encryptAES, decryptAES } from '@miracle-web/utils' import { useEnv } from '@/hooks/useEnv'
export interface I{{properCase name}}State { openEruda: boolean } const { isProdMode } = useEnv()
export const use{{properCase name}}Store = defineStore({ id: 'app-{{camelCase name}}-store', state:
(): I{{properCase name}}State => ({ openEruda: false }), getters: { getOpenEruda(): boolean { return
this.openEruda } }, actions: { setOpenEruda(openEruda: boolean) { this.openEruda = openEruda } }, //
开启数据缓存 persist: { key: 'APP-{{constantCase name}}-STORE', storage: window.localStorage,
serializer: { serialize: isProdMode() ? (value: StateTree) => { return encryptAES(value) } :
JSON.stringify, deserialize: isProdMode() ? (value: string) => { return
JSON.parse(decryptAES(value)) } : JSON.parse } } }) if (import.meta.hot) {
import.meta.hot.accept(acceptHMRUpdate(use{{properCase name}}Store, import.meta.hot)) } // Need to
be used outside the setup export function use{{properCase name}}StoreWidthOut() { return use{{properCase
  name
}}Store(store) }
```

## 使用方法

### 启动代码生成器

在项目根目录下运行以下命令启动 Plop 代码生成器：

```bash
pnpm new
```

### 生成页面

运行命令后，会显示选择菜单：

```
? 请选择需要创建的模式：
❯ page
  component
  store
```

选择 `page` 后，会依次提示：

1. 选择页面创建目录
2. 输入文件名
3. 输入页面标题
4. 选择是否缓存页面

生成的文件包括：

- 页面组件文件：`src/views/[选择的目录]/[文件名]/index.vue`
- 路由配置：自动添加到 `src/router/modules.ts` 文件中

### 生成组件

选择 `component` 后，会依次提示：

1. 选择是否为全局组件
2. 如果不是全局组件，选择组件创建目录
3. 输入组件名称

生成的文件：

- 全局组件：`src/components/[组件名]/index.vue`
- 局部组件：`[选择的目录]/components/[组件名]/index.vue`

### 生成状态管理模块

选择 `store` 后，会提示输入模块名称，生成文件：

- 状态管理文件：`src/store/modules/[模块名].ts`

## 自定义模板

如果需要添加新的模板类型或修改现有模板，可以按照以下步骤操作：

1. 在 [plop-templates] 目录下创建新的模板文件夹
2. 在新文件夹中创建 `prompt.js` 配置文件
3. 创建对应的模板文件（.hbs）
4. Plop 会自动识别新模板并在 `pnpm new` 命令中显示

## 最佳实践

1. **统一使用代码生成器**：新创建页面、组件或状态管理模块时，优先使用 Plop 生成，确保代码结构一致性
2. **根据需求选择模板**：根据实际需要选择合适的模板类型
3. **合理命名**：遵循项目命名规范，使用有意义的名称
4. **及时更新模板**：当项目架构或代码规范发生变化时，及时更新模板文件
5. **扩展模板功能**：根据团队需求，扩展模板功能，提高开发效率

通过 Plop 代码生成器，我们可以显著提高开发效率，减少重复性工作，同时确保代码结构的一致性。
