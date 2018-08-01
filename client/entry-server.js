/**
 * 运行于服务器
 * Created by zdliu on 2018/7/6.
 * */

import { createApp } from './index'

// 客户端特定引导逻辑……

const { app } = createApp()

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount('#app')

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    // 设置服务器端 router 的位置
    router.push(context.url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      // 获取该url路由下的所有Component，这些组件定义在Vue Router中。
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 使用Promise.all执行匹配到的Component的asyncData方法，即预取数据
      Promise.all(matchedComponents.map(component => {
        return component.asyncData && component.asyncData({
          // store,
          route: router.currentRoute
        })
      })).then(() => {
        // context.state = store.state
        // 返回state, router已经设置好的Vue实例app
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}