<template>
  <div id="root">
    <div id="app-container">
      <RandCharBack />
      <div class="wrapper" ref="wrapper" >
        <div class="scroller" ref="scroller">
          <Home ref="home"/>
          <Projects ref="projects"/>
          <Contact ref="contact"/>
        </div>
      </div>
    </div>
    <FixedHeader />
    <Progression />
  </div>
</template>

<script>
import ScrollMagic from 'ScrollMagic'

import Home from './Home'
import Projects from './Projects'
import Contact from './Contact'
import Progression from './Progression'
import FixedHeader from './FixedHeader'
import RandCharBack from './RandCharBack'

import * as types from 'STORE/scroll/mutation-types'

export default {
  name: 'root',
  components: {
    Home,
    Projects,
    Contact,
    Progression,
    FixedHeader,
    RandCharBack
  },
  data: function () {
    return {
      scController: null,
      scScene: null
    }
  },
  mounted () {
    this.switchOrientationScroll = this.switchOrientationScroll.bind(this)
    this.init()
  },
  methods: {
    init: function () {
      // const body = document.getElementsByTagName('body')[0]
      document.body.addEventListener('wheel', this.switchOrientationScroll)
      this.setScrollMagic()
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
    },

    setScrollMagic: function () {
      const { $refs, $store } = this
      const { wrapper, scroller } = $refs
      const { innerWidth } = window
      const scController = this.scController = new ScrollMagic.Controller({
        container: $refs.wrapper,
        vertical: false
      })

      const mainScene = new ScrollMagic.Scene({
        triggerElement: scroller,
        reverse: true,
        duration: scroller.clientWidth
      })
      .addTo(scController)

      mainScene.on('progress', function (e) {
        const calcProgress = wrapper.scrollLeft / (scroller.clientWidth - innerWidth)
        $store.commit(types.PROGRESS, { progress: calcProgress })
      })
      $store.commit(types.INIT, { controller: scController })
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
      position: relative;
      top: 0;
      left: 0;
      overflow: hidden;
      width: inherit;
      height: inherit;

      .scroller {
        position: absolute;
        top: 0;
        left: 0;
        white-space: nowrap;
        width: auto;
        height: 100%;
      }
    }
  }
  
}
</style>
