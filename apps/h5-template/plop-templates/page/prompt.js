import fs from 'node:fs'
import path from 'node:path'
function getFolder(path) {
    const components = []
    const files = fs.readdirSync(path)
    files.forEach(item => {
        const stat = fs.lstatSync(`${path}/${item}`)
        if (stat.isDirectory() === true && item !== 'components') {
            components.push(`${path}/${item}`)
            components.push(...getFolder(`${path}/${item}`))
        }
    })
    return components
}

export default {
    description: '创建页面',
    prompts: [
        {
            type: 'list',
            name: 'directory',
            message: '请选择页面创建目录',
            choices: getFolder('src/views')
        },
        {
            type: 'input',
            name: 'name',
            message: '请输入文件名',
            validate: v => {
                if (!v || v.trim === '') {
                    return '文件名不能为空'
                } else {
                    return true
                }
            }
        },
        {
            type: 'input',
            name: 'title',
            message: '请输入页面标题Title',
            validate: v => {
                if (!v || v.trim === '') {
                    return '页面标题不能为空'
                } else {
                    return true
                }
            }
        },
        {
            type: 'confirm',
            name: 'keepAlive',
            message: '是否缓存页面',
            default: false
        }
    ],
    actions: data => {
        const relativeDir = path.relative('src/views', data.directory)

        const actions = [
            {
                type: 'add',
                path: `${data.directory}/{{camelCase name}}/index.vue`,
                templateFile: 'plop-templates/page/index.hbs',
                data: {
                    cpsName: `${data.name}`
                }
            },
            {
                type: 'append',
                path: 'src/router/modules.ts',
                pattern: /routeModuleList:\s*Array<RouteRecordRaw>\s*=\s*\[/,
                templateFile: 'plop-templates/page/router.hbs',
                data: {
                    name: '{{name}}',
                    title: '{{title}}',
                    keepAlive: '{{keepAlive}}',
                    dir: `${relativeDir}`
                }
            }
        ]

        return actions
    }
}
