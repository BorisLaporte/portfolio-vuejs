<template>
  <div id="root">
    <Home/>
    <FixedHeader />
    <Progression />
  </div>
</template>

<script>
import Home from './Home'
import Progression from './Progression'
import FixedHeader from './FixedHeader'

export default {
  name: 'root',
  components: {
    Home,
    Progression,
    FixedHeader
  }
}
</script>

<style lang="scss">
#root {
}
</style>
