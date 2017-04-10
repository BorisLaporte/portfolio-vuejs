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
      delay: 0.8,
      actualRotation: 0,
      animating: false
    }
  },
  computed: {
    tl: function () {
      return new TimelineLite()
    }
  },
  mounted: function () {
    this.setAnimating = this.setAnimating.bind(this)
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
      const { $refs, tl, actualRotation, animating } = this
      const time = 0.2
      if (!animating) {
        const square = new TweenLite.to($refs.square, time,
          {
            rotation: -actualRotation - 10,
            ease: Power2.easeOut
          })
        const text = new TweenLite.to($refs.text, time + 0.2,
          {
            rotation: actualRotation + 10,
            ease: Power2.easeOut
          })
        tl.clear()
        tl.add([square, text])
      }
    },
    mouseLeave: function (e) {
      const { $refs, tl, actualRotation, animating } = this
      const time = 0.2
      if (!animating){
        const square = new TweenLite.to($refs.square, time,
          {
            rotation: -actualRotation,
            ease: Power2.easeOut
          })
        const text = new TweenLite.to($refs.text, time + 0.2,
          {
            rotation: actualRotation,
            ease: Power2.easeOut
          })
        tl.clear()
        tl.add([square, text])
      }
    },
    onClickAnim: function () {
      const { $refs, tl } = this
      const time = 0.8
      this.actualRotation += 90
      this.setAnimating(true)
      const square = new TweenLite.to($refs.square, time,
        {
          rotation: -this.actualRotation,
          ease: Power2.easeOut
        })
      const text = new TweenLite.to($refs.text, time + 0.2,
        {
          rotation: this.actualRotation,
          ease: Power1.easeOut
        })
      tl.clear()
      tl.add([square, text]).add(this.setAnimating, '-=0.2')
    },
    setAnimating (bool = false) {
      this.animating = bool
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
  width: 45px;
  height: 45px;
  background-color: $pink;
  flex-shrink: 0;

  .text{
    font-family: $garamond;
    font-size: 1.25em;
    position: relative;
    color: $blackFont;
    position: absolute;
    left:  50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
