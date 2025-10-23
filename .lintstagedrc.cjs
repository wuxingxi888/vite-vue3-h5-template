module.exports = {
    // JavaScript、TypeScript 文件处理
    '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],

    // JSON 文件处理（排除 package-lock.json 等）
    '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write --parser json'],

    // package.json 文件处理
    'package.json': ['prettier --write'],

    // Vue 文件处理
    '*.vue': ['eslint --fix', 'prettier --write'],

    // 样式文件处理
    '*.{scss,less,styl,html}': ['prettier --write'],

    // Markdown 文件处理
    '*.md': ['prettier --write'],

    // YAML 文件处理
    '*.{yml,yaml}': ['prettier --write'],
};
