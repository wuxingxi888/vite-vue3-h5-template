import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from '@/store';
import { setupPlugins } from '@/plugins';

async function bootstrap() {
    const app = createApp(App);
    // 挂载状态管理
    setupStore(app);
    // 挂载路由
    setupRouter(app);
    // 挂载插件
    setupPlugins(app);

    await router.isReady();
    // 路由准备就绪后挂载APP实例
    app.mount('#app', true);
}

void bootstrap();
