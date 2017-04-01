<template>
  <div id="root">
    <div class="wrapper">
      <Home/>
      <Contact /> 
    </div>
    <FixedHeader />
    <Progression />
  </div>
</template>

<script>
import Home from './Home'
import Contact from './Contact'
import Progression from './Progression'
import FixedHeader from './FixedHeader'

export default {
  name: 'root',
  components: {
    Home,
    Contact,
    Progression,
    FixedHeader
  }
}
</script>

<style lang="scss" unscoped>
#root {
  
}
</style>
