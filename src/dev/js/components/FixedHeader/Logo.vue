<template>
  <a
  href="#"
  @click="onClick"
  @mouseover="mouseOver"
  @mouseleave="mouseLeave"
  id="Logo"
  ref="square" >
    <div class="text" ref="text">BL</div>
  </a>
</template>

<script>
import { mapGetters } from 'vuex'
import { TimelineLite, TweenLite, Power2, Power1 } from 'gsap'

import * as types from 'STORE/scroll/mutation-types'

export default {
  name: 'Logo',
  data: function () {
    return {
      delay: 0.8
    }
  },
  computed: {
    tl: function () {
      return new TimelineLite()
    }
  },
  mounted: function () {
    this.enterAnim()
  },
  methods: {
    onClick: function (e) {
      const { $store } = this
      e.preventDefault()
      this.onClickAnim()
      $store.commit(types.START_SCROLL_BACK)
    },
    mouseOver: function (e) {
      
    },
    mouseLeave: function (e) {
      
    },
    onClickAnim: function () {
      
    },
    enterAnim: function () {
      const { $el, tl, delay } = this
      const logo = TweenLite.fromTo($el, 1,
        {
          opacity: 0,
          y: -30
        },
        {
          opacity: 1,
          y: 0,
          ease: Power2.easeOut
        })
      tl.clear()
      tl.add([logo], delay)
    }
  }
}
</script>

<style lang="scss" scoped>
#Logo {
  position: relative;
  width: 43px;
  height: 43px;
  background-color: $pink;
  flex-shrink: 0;

  .text{
    font-family: $garamond;
    font-size: 1.20em;
    position: relative;
    color: $blackFont;
    position: absolute;
    left:  50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
