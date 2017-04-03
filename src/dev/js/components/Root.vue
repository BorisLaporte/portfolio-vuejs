<template>
  <div id="root">
    <div id="app-container">
      <div class="wrapper" ref="wrapper" >
        <Home/>
        <Projects />
        <Contact /> 
      </div>
    </div>
    <FixedHeader />
    <Progression />
  </div>
</template>

<script>
import Home from './Home'
import Projects from './Projects'
import Contact from './Contact'
import Progression from './Progression'
import FixedHeader from './FixedHeader'

export default {
  name: 'root',
  components: {
    Home,
    Projects,
    Contact,
    Progression,
    FixedHeader
  },
  mounted () {
    this.switchOrientationScroll = this.switchOrientationScroll.bind(this)
    this.setHorizontalScroll()
  },
  methods: {
    setHorizontalScroll: function () {
      const body = document.getElementsByTagName('body')[0]
      body.addEventListener('wheel', this.switchOrientationScroll)
    },
    switchOrientationScroll: function (e) {
      const { wrapper } = this.$refs
      const { deltaY } = e
      const { scrollLeft, scrollWidth } = wrapper
      let finalScroll = scrollLeft + deltaY
      if (finalScroll > scrollWidth) {
        finalScroll = scrollWidth
      } else if (finalScroll < 0) {
        finalScroll = 0
      }
      if (scrollLeft >= 0 && scrollLeft <= scrollWidth) {
        wrapper.scrollLeft = finalScroll
      }
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
#root {
  #app-container{
    position: relative;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;

    .wrapper{
      white-space: nowrap;
      overflow: hidden;
      height: 100%;
    }
  }
  
}
</style>
