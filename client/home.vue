<template>
  <div class="home">
    <div>Home</div>
    <a @click="$router.push('/test')" href="javascript:;">test</a>
    <a @click="sendGet" href="javascript:;">API接口测试</a>
    <ul>
      <li>123123</li>
      <li>123123</li>
      <li>123123</li>
      <li>123123</li>
      <li>123123</li>
      <li>123123</li>
      <li>123123</li>
      <li>123123</li>
    </ul>
    {{data}}
  </div>
</template>
<script>
  export default {
    title: '首页',
    data() {
      return {
        data: '',
      }
    },
    methods: {
      /**
       * 测试
       */
      sendGet() {
        this.http.get('/api/v3/assistant/coordinate/convert?key=ff0bcf778c5eeb93bd8b068b6e3f7781&locations=116.481499,39.990475|116.481499,39.990375')
          .then((resp) => {
            this.data = resp
          })
          .catch(() => {
            this.error('出错了')
          })
      },
    }
  }
</script>
<style lang="stylus" scoped>
  .home {
    font-size: 30px;
    text-align: center;
    background: url('./assets/cc.jpg') no-repeat;
    background-size: cover;
  }
</style>