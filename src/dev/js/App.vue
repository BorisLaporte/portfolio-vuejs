<template>
  <div id="app" >
    <Root/>
  </div>
</template>

<script>
import Root from './components/Root'
import * as data from 'SRC/data.json'

export default {
  name: 'app',
  components: {
    Root
  },
  created () {
    const { $store } = this
    this.setupStore($store, data)
  },
  methods: {
    setupStore (store, data) {
      store.dispatch('fillJson', data)
      // this.setListenerResizing(store)
    }
    // setListenerResizing (store) {
    //   store.dispatch('getWindowSize')
    //   window.onresize = () => {
    //     store.dispatch('getWindowSize')
    //   }
    // }
  }
}
</script>

<style lang="scss">
#app {
}
</style>
