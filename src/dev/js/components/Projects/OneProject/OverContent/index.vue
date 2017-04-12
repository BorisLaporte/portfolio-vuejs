<template>
  <div class="wrapper-over">
    <div ref="mouseColor" class="wrapper-color fullscreen" >
      <div ref="wrapperColor" class="wrapper-color fullscreen">
        <div ref="color" class="over-color fullscreen" :style="{backgroundColor: data.color}"></div>
      </div>
    </div>
    <div class="over-content fullscreen">
      <NameBlock 
      :eventBus="eventBus"
      :name="data.name" 
      :role="data.role" 
      :link="data.link" />
      <MoreDetails 
      :eventBus="eventBus"
      :desc="data.desc" 
      :mentions="data.mentions" />
    </div>
  </div>
</template>

<script>
import { TimelineMax, TweenMax, TweenLite, Power2 } from 'gsap'

import NameBlock from './NameBlock'
import MoreDetails from './MoreDetails'

export default {
  name: 'over-content',
  props: ['data', 'eventBus'],
  components: {
    NameBlock,
    MoreDetails
  },
  computed: {
    tl: function () {
      return new TimelineMax()
    },
    tlHover: function () {
      return new TimelineMax()
    },
    tlMouse: function () {
      return new TimelineMax()
    },
    paralax: function () {
      const { $el } = this
      return new TweenMax.fromTo($el, 1,
        {
          x: -140
        },
        {
          x: 40,
          ease: Power2.easeOut
        })
    }
  },
  mounted () {
    const { eventBus } = this
    this.setupTween()
    eventBus.$on('enter', this.enterAnim.bind(this))
    eventBus.$on('mouse-move', this.onMouseMove.bind(this))
    eventBus.$on('on-hover', this.onHover.bind(this))
    eventBus.$on('leave-hover', this.leaveHover.bind(this))
    eventBus.$on('progress', this.progressAnim.bind(this))
  },
  methods: {
    enterAnim () {
      const { $refs } = this
      const tl = new TimelineMax()
      const wrapperColor = new TweenLite.fromTo($refs.wrapperColor, 0.6,
        {
          scaleX: 0.6
        },
        {
          scaleX: 1,
          ease: Power2.easeInOut
        })
      const color = new TweenLite.fromTo($refs.color, 0.6,
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          ease: Power2.easeInOut
        })
      tl.add([wrapperColor, color], 0.4)
    },
    onMouseMove (e) {
      const { tlMouse, $refs } = this
      tlMouse.clear()
      const color = new TweenMax.to($refs.mouseColor, 0.2,
        {
          x: -e.x * 0.4,
          y: -e.y * 0.8,
          ease: Power2.ease
        })
      tlMouse.add([color])
    },
    onHover () {
      const { tlHover, $refs } = this
      const tween = new TweenMax.to($refs.wrapperColor, 0.4,
        {
          scaleY: 1.2,
          ease: Power2.easeInOut
        })
      tlHover.clear()
      tlHover.add([tween])
    },
    leaveHover () {
      const { tlHover, $refs } = this
      const tween = new TweenMax.to($refs.wrapperColor, 0.4,
        {
          scaleY: 1,
          ease: Power2.easeInOut
        })
      tlHover.clear()
      tlHover.add([tween])
    },
    setupTween () {
      const { tl, paralax } = this
      tl.pause()
      tl.add([paralax])
    },
    progressAnim ({ progress }) {
      const { tl } = this
      tl.tweenTo(progress)
    }
  }
}
</script>

<style lang="scss">
.wrapper-over{
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 117%;
  height: 55%;
  mix-blend-mode: lighten;

  .over-content {
  }
  .wrapper-color{
    transform-origin: 100% 50%;
    mix-blend-mode: inherit;

    .over-color{
      opacity: 0;
      mix-blend-mode: inherit;
      background-size: cover;
      transform-origin: 100% 100%;
    }
  }
}
</style>
