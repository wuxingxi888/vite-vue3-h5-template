/**
 * @name ConfigProgressPlugin
 * @description 构建显示进度条
 */

import { Plugin } from 'vite'
import progress from 'vite-plugin-progress'

export const configProgressPlugin = () => {
	return progress() as Plugin
}
