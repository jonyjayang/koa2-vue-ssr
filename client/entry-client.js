/**
 * 运行于浏览器
 * Created by zdliu on 2018/7/6.
 * */
import { createApp } from './index'

const { app, router } = createApp()

router.onReady(() => {
  app.$mount('#app')
})