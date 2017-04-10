<template>
  <div id="app" >
    <RandCharBack />
    <Preloader/>
    <Root v-if="this.isLoaded"/>
    <!-- <Root /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Root from './components/Root'
import Preloader from './components/Preloader'
import RandCharBack from './components/RandCharBack'
import * as data from 'SRC/data.json'

const pathToImg = require.context('IMG', true)

export default {
  name: 'app',
  components: {
    Root,
    Preloader,
    RandCharBack
  },
  computed: {
    ...mapGetters([
      'isLoaded'
    ])
  },
  created () {
    const { $store } = this
    this.setupStore($store, data)
  },
  methods: {
    setupStore (store, data) {
      const allData = Object.assign({ webpackContext: pathToImg }, data)
      store.dispatch('fillJson', allData)
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
