<template>
  <div class="technos">
    <div class="content" ref="content">
      <div class="text" ref="text" >{{ allTechnos }}</div>
    </div>
  </div>
</template>

<script>
import { TimelineMax, TweenMax, TweenLite, Power2 } from 'gsap'

export default {
  name: 'technos',
  props: ['data', 'eventBus'],
  computed: {
    allTechnos: function () {
      const renderedTechnos = this.data.map(function (_techno) {
        return '#' + _techno
      })
      return renderedTechnos.join(', ')
    },
    tl: function () {
      return new TimelineMax()
    },
    tlMouse: function () {
      return new TimelineMax()
    },
    tween: function () {
      const { $refs } = this
      return new TweenMax.fromTo($refs.text, 1,
        {
          x: 40
        },
        {
          x: -40,
          ease: Power2.easeOut
        })
    }
  },
  mounted () {
    const { eventBus } = this
    this.setupTween()
    eventBus.$on('enter', this.enterAnim.bind(this))
    eventBus.$on('on-hover', this.onHover.bind(this))
    eventBus.$on('leave-hover', this.leaveHover.bind(this))
    eventBus.$on('progress', this.progressAnim.bind(this))
  },
  methods: {
    enterAnim () {
      const { $el } = this
      TweenLite.fromTo($el, 1,
        {
          opacity: 0,
          x: 60
        },
        {
          opacity: 1,
          x: 0,
          ease: Power2.easeInOut,
          delay: 0.8
        })
    },
    onHover () {
      const { tlMouse, $refs } = this
      const tween = new TweenMax.to($refs.content, 0.4,
        {
          x: 30,
          ease: Power2.easeInOut
        })
      tlMouse.clear()
      tlMouse.add([tween])
    },
    leaveHover () {
      const { tlMouse, $refs } = this
      const tween = new TweenMax.to($refs.content, 0.4,
        {
          x: 0,
          ease: Power2.easeInOut
        })
      tlMouse.clear()
      tlMouse.add([tween])
    },
    setupTween () {
      const { tl, tween } = this
      tl.pause()
      tl.add([tween])
    },
    progressAnim ({ progress }) {
      const { tl } = this
      tl.tweenTo(progress)
    }
  }
}
</script>

<style lang="scss" scoped>
.technos {
  position: absolute;
  bottom: 15px;
  left: calc(100% - 40px);
  opacity: 0;

  .content{

    .text{
      font-size: 0.875em;
    }
  }
}
</style>
