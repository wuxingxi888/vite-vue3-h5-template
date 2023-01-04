import { createRouter, createWebHistory } from 'vue-router'
import { defaultRouter } from './modules/default'
import { setDocumentTitle } from '@/utils'

const routes = [...defaultRouter]

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
	routes,
	strict: true,
	scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
	setDocumentTitle(to.meta.title as string)

	next()
})

export default router
