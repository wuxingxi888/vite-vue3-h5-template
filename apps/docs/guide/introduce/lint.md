# 统一开发规范

在团队协作开发中，统一的代码风格和开发规范至关重要。它不仅能够提高代码的可读性和可维护性，还能减少团队成员之间的沟通成本。本项目集成了完善的代码规范工具链，包括 ESLint、Prettier、CommitLint 等，确保代码质量和提交规范。

## 为什么需要统一开发规范

在多人协作的项目中，如果没有统一的开发规范，可能会出现以下问题：

1. **代码风格不一致**：不同的开发者有不同的编码习惯，导致代码风格混乱
2. **代码质量参差不齐**：缺乏统一的质量标准，容易引入潜在的错误
3. **协作困难**：代码难以理解和维护，增加团队协作成本
4. **提交信息混乱**：Git 提交信息不规范，难以追踪变更历史
5. **代码审查困难**：缺乏统一标准，代码审查效率低下

通过建立统一的开发规范，我们可以：

- 提高代码质量和一致性
- 减少代码审查时间
- 提升团队协作效率
- 降低项目维护成本
- 确保提交历史清晰可追溯

## 技术栈概览

项目集成了以下代码规范工具：

| 工具                                                 | 用途                               | 配置文件               |
| ---------------------------------------------------- | ---------------------------------- | ---------------------- |
| [ESLint](https://eslint.org/)                        | JavaScript/TypeScript 代码质量检查 | [eslint.config.js]     |
| [Prettier](https://prettier.io/)                     | 代码格式化                         | [prettier.config.js]   |
| [CommitLint](https://commitlint.js.org/)             | Git 提交信息规范检查               | [commitlint.config.js] |
| [Husky](https://typicode.github.io/husky/)           | Git Hooks 管理                     | [.husky/]              |
| [Lint-staged](https://github.com/okonet/lint-staged) | 增量文件检查                       | [package.json]         |

## ESLint 配置

ESLint 是一个可插拔的 JavaScript 代码检查工具，用于识别和报告代码中的问题。

### 配置文件

项目在 [eslint.config.js] 中配置了 ESLint 规则：

```js
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  // 指定文件匹配模式和语言选项
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,vue}'],
  },
  // 指定全局变量和环境
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImportConfig.globals, // 合并自动导入的 globals
      },
      ecmaVersion: 'latest', // 使用最新的 ECMAScript 语法
      sourceType: 'module', // 代码是 ECMAScript 模块
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
        parser: tseslint.parser,
      }, // 使用 TypeScript 解析器
    },
  },

  /** js推荐配置 */
  pluginJs.configs.recommended,
  /** ts推荐配置 */
  ...tseslint.configs.recommended,
  /** vue推荐配置 */
  ...pluginVue.configs['flat/essential'],

  // 自定义规则
  {
    rules: {
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
      'no-unexpected-multiline': 'error', // 禁止空余的多行
      'no-useless-escape': 'off', // 禁止不必要的转义字符

      // typeScript (https://typescript-eslint.io/rules)
      '@typescript-eslint/no-unused-vars': 'warn', // 禁止定义未使用的变量
      '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
      '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off', // 禁止使用 Function 作为 type。
      '@typescript-eslint/no-unused-expressions': 'off', // 禁止无用的表达式。

      // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
      'vue/multi-word-component-names': 'off', // 要求组件名称始终为 "-" 链接的单词
      'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
      'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
      'vue/html-indent': ['error', 4],
      indent: ['error', 4], // 缩进使用4个空格
      semi: ['error', 'never'], //语句末尾不加分号
      'no-unused-vars': 'off',
    },
  },

  // 忽略文件
  {
    ignores: ['**/dist', '**/node_modules', '**/*.d.ts', '/public', '/plop-templates'],
  },

  /**
   * prettier 配置
   * 会合并根目录下的prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   */
  eslintPluginPrettier,
];
```

### 主要规则说明

1. **基本规则**：
   - 禁止使用 `var`，要求使用 `let` 或 `const`
   - 限制空行数量，最多允许1个空行
   - 禁止不必要的转义字符

2. **TypeScript 规则**：
   - 警告未使用的变量
   - 禁止使用 `@ts-ignore`，推荐使用 `@ts-expect-error`
   - 允许使用 `any` 类型（根据项目实际情况调整）

3. **Vue 规则**：
   - 关闭组件名必须为多单词的限制
   - 关闭禁止修改 props 的限制
   - 设置 HTML 缩进为4个空格

## Prettier 配置

Prettier 是一个代码格式化工具，能够统一团队的代码风格。

### 配置文件

项目在 [prettier.config.js] 中配置了 Prettier 规则：

```js
// prettier.config.js
/**
 * @type {import('prettier').Config}
 * @see https://www.prettier.cn/docs/options.html
 */

// Prettier配置对象，用于定义代码格式化规则
const config = {
  // 最大行长规则通常设置为 100 或 120。
  printWidth: 120,
  // 指定每个标签缩进级别的空格数。
  tabWidth: 4,
  // 使用制表符而不是空格缩进行。
  useTabs: true,
  // true（默认）: 在每条语句的末尾添加一个分号。false：仅在可能导致 ASI 失败的行的开头添加分号。
  semi: false,
  // Vue 文件脚本和样式标签缩进
  vueIndentScriptAndStyle: true,
  // 使用单引号而不是双引号
  singleQuote: true,
  // 引用对象中的属性时，仅在需要时在对象属性周围添加引号。
  quoteProps: 'as-needed',
  // 在对象文字中的括号之间打印空格。
  bracketSpacing: true,
  // "none":没有尾随逗号。"es5": 在 ES5 中有效的尾随逗号（对象、数组等），TypeScript 中的类型参数中没有尾随逗号。"all"- 尽可能使用尾随逗号。
  trailingComma: 'none',
  // 将>多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）。
  bracketSameLine: false,
  // 在 JSX 中使用单引号而不是双引号。
  jsxSingleQuote: false,
  // 在唯一的箭头函数参数周围始终包含括号。
  arrowParens: 'always',
  // 插入编译指示
  insertPragma: false,
  // 需要编译指示
  requirePragma: false,
  // 如果散文超过打印宽度，则换行
  proseWrap: 'always',
  // 所有标签周围的空格（或缺少空格）被认为是重要的。
  htmlWhitespaceSensitivity: 'strict',
  // 确保在文本文件中仅使用 ( \n)换行，常见于 Linux 和 macOS 以及 git repos 内部。
  endOfLine: 'lf',
  // 格式化文件时，回到包含所选语句的第一行的开头。
  rangeStart: 0,
  // 每个文件格式化的范围是文件的全部内容
  rangeEnd: Infinity,
  //（默认值）允许自动格式化内嵌的代码块
  embeddedLanguageFormatting: 'auto',
  // 不使用实验性三元语法
  experimentalTernaries: false,
  // 不将JSX括号放在同一行
  jsxBracketSameLine: false,
  // 每行一个属性
  singleAttributePerLine: true,
};

// 导出配置对象以供Prettier使用
export default config;
```

### 主要配置说明

1. **代码宽度**：设置为120个字符
2. **缩进**：使用制表符，宽度为4个空格
3. **分号**：语句末尾不加分号
4. **引号**：使用单引号
5. **尾随逗号**：不使用尾随逗号
6. **换行符**：使用 LF 换行符（Unix风格）

## Git Hooks 配置

项目使用 Husky 管理 Git Hooks，在 [package.json] 中配置：

```json
"simple-git-hooks": {
  "pre-commit": "pnpm lint-staged",
  "commit-msg": "npx --no-install commitlint --edit $1"
}
```

### Pre-commit Hook

在代码提交前，会自动运行 Lint-staged 检查暂存区的文件：

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx,vue}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

这样可以确保只有符合规范的代码才能被提交。

### Commit-msg Hook

在提交信息提交前，会检查提交信息是否符合规范：

```bash
npx --no-install commitlint --edit $1
```

## CommitLint 配置

CommitLint 用于检查 Git 提交信息是否符合规范。项目使用 [cz-git](https://cz-git.qbb.sh/zh/)
作为提交辅助工具。

### 提交规范

项目遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)
规范，提交信息格式如下：

```
<type>(<scope>): <subject>

<body>

<footer>
```

常见的提交类型：

- `feat`: 新功能
- `fix`: 修复bug
- `chore`: 构建工具相关
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关

## 自动化集成

### package.json 脚本

项目在 [package.json] 中配置了相关脚本：

```json
"scripts": {
  "lint": "eslint",
  "lint:fix": "eslint --fix",
  "lint:lint-staged": "lint-staged"
}
```

### IDE 集成

建议在 IDE 中安装以下插件以获得更好的开发体验：

1. **ESLint 插件**：实时显示代码问题
2. **Prettier 插件**：保存时自动格式化代码
3. **EditorConfig 插件**：统一编辑器基础配置

## 最佳实践

1. **及早发现问题**：通过 IDE 插件和 Git Hooks 在开发阶段就发现并修复问题
2. **统一配置**：确保团队成员使用相同的配置文件
3. **定期更新**：定期更新规范工具和规则配置
4. **团队培训**：对团队成员进行规范培训，确保每个人都了解并遵守规范
5. **自动化检查**：通过 CI/CD 流程确保所有代码都符合规范

通过这套完整的开发规范体系，项目能够确保代码质量和团队协作效率，为长期维护奠定良好基础。
