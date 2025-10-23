// Prettier基础配置对象，用于定义通用代码格式化规则
const basePrettierConfig = {
    // 最大行长规则通常设置为 100 或 120。
    printWidth: 100,
    // 指定每个标签缩进级别的空格数。
    tabWidth: 2,
    // 使用制表符而不是空格缩进行。
    useTabs: false,
    // true（默认）: 在每条语句的末尾添加一个分号。false：仅在可能导致 ASI 失败的行的开头添加分号。
    semi: true,
    // Vue 文件脚本和样式标签缩进
    vueIndentScriptAndStyle: true,
    // 使用单引号而不是双引号
    singleQuote: true,
    // 引用对象中的属性时，仅在需要时在对象属性周围添加引号。
    quoteProps: 'as-needed',
    // 在对象文字中的括号之间打印空格。
    bracketSpacing: true,
    // "none":没有尾随逗号。"es5": 在 ES5 中有效的尾随逗号（对象、数组等），TypeScript 中的类型参数中没有尾随逗号。"all"- 尽可能使用尾随逗号。
    trailingComma: 'es5',
    // 将>多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）。
    bracketSameLine: false,
    // 在 JSX 中使用单引号而不是双引号。
    jsxSingleQuote: true,
    // 在唯一的箭头函数参数周围始终包含括号。
    arrowParens: 'avoid',
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
    // 每行一个属性
    singleAttributePerLine: false,
};

// 导出配置对象以供Prettier使用
export default basePrettierConfig;
