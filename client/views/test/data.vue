<template>
  <div class="demo">
    <button @click="increment">count +1</button>
    <button @click="decrement">count -1</button>
    <button @click="loading">重置</button>
    <p>Count is : {{count}}</p>
  </div>
</template>
<script type="text/babel">
  import { mapGetters, mapActions } from 'vuex'

  export default {
    title: 'Vuex store数据处理',
    asyncData({ store }) {
      // 触发 action 后，会返回 Promise
      return store.dispatch('test/loading')
    },
    computed: {
      ...mapGetters({
        count: 'getCount'
      })
    },
    methods: {
      ...mapActions([
        'increment',
        'decrement',
        'loading'
      ])
    }
  }
</script>
<style lang="stylus" scoped>
  .demo {
    padding: 20px;
    font-size 14px;
    text-align: center;
  }
</style>