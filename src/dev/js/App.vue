<template>
  <div id="app" >
    <Root/>
  </div>
</template>

<script>
import Root from './components/Root'
import Preloader from './components/Preloader'
import * as data from 'SRC/data.json'

export default {
  name: 'app',
  components: {
    Root,
    Preloader
  },
  created () {
    const { $store } = this
    this.setupStore($store, data)
  },
  methods: {
    setupStore (store, data) {
      store.dispatch('fillJson', data)
      store.dispatch('getWindowSize')
      window.addEventListener('resize', store.dispatch.bind(store, 'getWindowSize'))
    }
  }
}
</script>

<style lang="scss">
#app {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
