### 多环境

`package.json` 里的 `scripts` 配置 `dev` `prod` `build:test` `build:prod`

通过 `--mode xxx` 来执行不同环境

-   通过 `pnpm dev` 启动本地环境参数 , 执行 `development`
-   通过 `pnpm prod` 启动正式环境参数 , 执行 `production`

通过 `build --mode  xxx` 来打包不同环境

-   通过 `pnpm build:test` 打包测试环境参数 , 执行 `test`
-   通过 `pnpm build:prod` 打包正式环境参数 , 执行 `prod`

```javascript
"scripts": {
    "dev": "vite --mode development",
    "prod": "vite --mode production",
    "build:test": "vue-tsc --noEmit && vite build --mode test && esno ./src/utils/build.ts",
    "build:prod": "vue-tsc --noEmit && vite build --mode production && esno ./src/utils/build.ts",
}
```

### 打包完成显示该环境的详细信息

esno 是用于加载 TypeScript 和 ESM，Node.js 运行时增强了 esbuild，这里用于显示环境信息

```javascript
import pkg from "../../package.json";
import build from "../../build.json";

export const run = () => {
	const info = `
    ✨✨✨✨✨✨ 编译成功！✨✨✨✨✨✨
                项目名称：${pkg.name}
                项目版本：${build?.version}
                编译环境：${build?.env}
                环境名称：${build?.title}
                访问地址：${
					build?.baseUrl === "" ? "请配置访问地址" : build?.baseUrl
				}
    `;
	const ms =
		"background: rgba(252,234,187,1);background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:5em";

	console.log("%c", ms, info);
};

run();
```
