<template>
  <div id="app" >
    <Root/>
  </div>
</template>

<script>
import Root from './components/Root'

export default {
  name: 'app',
  components: {
    Root
  },
  created () {
    this.setListenerResizing()
  },
  methods: {
    setListenerResizing () {
      this.$store.dispatch('getWindowSize')
      window.onresize = () => {
        this.$store.dispatch('getWindowSize')
      }
    }
  }
}
</script>

<style>
#app {
}
</style>
