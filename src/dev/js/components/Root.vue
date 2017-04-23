<template>
  <div id="root">
    <div class="app-container">
      <div class="wrapper" ref="wrapper" >
        <div v-if="!this.isMobile"  class="scroller" ref="scroller">
          <Home />
          <Projects />
          <Contact />
        </div>
        <div v-else class="mobile-wrapper">
          <Home />
          <MobileLinks />
        </div>
      </div>
    </div>
    <FixedHeader />
    <Progression v-if="!this.isMobile" />
  </div>
</template>

<script>
import ScrollMagic from 'scrollmagic'
import * as types from 'STORE/scroll/mutation-types'
import { mapGetters } from 'vuex'
import { TimelineLite, TweenLite, Power2 } from 'gsap'

import Home from './Home'
import Projects from './Projects'
import Contact from './Contact'
import Progression from './Progression'
import FixedHeader from './FixedHeader'
import MobileLinks from './MobileLinks'

export default {
  name: 'root',
  components: {
    Home,
    Projects,
    Contact,
    Progression,
    FixedHeader,
    MobileLinks
  },
  computed: {
    ...mapGetters([
      'scrollBack',
      'isMobile'
    ])
  },
  data: function () {
    return {
      scController: null,
      scScene: null
    }
  },
  mounted () {
    const { $refs } = this
    this.finishScrollBack = this.finishScrollBack.bind(this)
    this.switchOrientationScroll = this.switchOrientationScroll.bind(this)
    if ($refs.scroller !== undefined) {
      this.init()
    }
  },
  methods: {
    init: function () {
      // document.body.addEventListener('wheel', this.switchOrientationScroll)
      document.body.onwheel = this.switchOrientationScroll
      this.setScrollMagic()
    },

    switchOrientationScroll: function (e) {
      const { wrapper } = this.$refs
      const { deltaY, deltaX } = e
      const { scrollLeft, scrollWidth } = wrapper
      let finalScroll = scrollLeft + (deltaY + deltaX) * 0.7
      if (finalScroll > scrollWidth) {
        finalScroll = scrollWidth
      } else if (finalScroll < 0) {
        finalScroll = 0
      } else {
        wrapper.scrollLeft = finalScroll
      }
      // console.log(wrapper)
      e.preventDefault()
    },

    finishScrollBack: function () {
      const { $store } = this
      $store.commit(types.FINISH_SCROLL_BACK)
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
  },
  watch: {
    scrollBack: function (value) {
      const { $refs } = this
      const { scrollLeft, scrollWidth } = $refs.wrapper
      if (value) {
        const duration = (scrollLeft / scrollWidth) + 1
        const tl = new TimelineLite()
        const tween = TweenLite.to($refs.wrapper, duration,
          {
            scrollLeft: 0,
            ease: Power2.easeOut
          })
        tl.clear()
        tl.add([tween]).add(this.finishScrollBack)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#root {
  .app-container{
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
      scroll-behavior: smooth;
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
