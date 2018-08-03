import '@babel/polyfill'
import Vue from 'vue'
import App from './app.vue'
import { createRouter } from './router'
// config配置文件
import './config'
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
  // 创建 router 实例
  const router = createRouter()

  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    render: h => h(App)
  })
  return { app, router }
}