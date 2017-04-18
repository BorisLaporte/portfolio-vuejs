<template>
  <div class="wrapper-thumbnail">
    <div class="thumbnail" ref="thumbnail" >
      <img ref="img" :src="imgSource" :alt="name">
    </div>
    <div class="grid-reveal" ref="grid"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TimelineMax, TweenMax, Power2 } from 'gsap'

export default {
  name: 'thumbnail',
  props: ['src', 'name', 'eventBus'],
  computed: {
    ...mapGetters([
      'webpackContext'
    ]),
    imgSource: function () {
      const { webpackContext } = this
      return webpackContext(this.src)
    },
    tl: function () {
      return new TimelineMax()
    },
    tlMouse: function () {
      return new TimelineMax()
    }
  },
  mounted () {
    const { eventBus } = this
    eventBus.$on('on-hover', this.onHover.bind(this))
    eventBus.$on('leave-hover', this.leaveHover.bind(this))
    eventBus.$on('enter', this.enterAnim.bind(this))
  },
  methods: {
    onHover () {
      const { tlMouse, $refs } = this
      const tween = new TweenMax.to($refs.img, 0.4,
        {
          scale: 1.05,
          ease: Power2.easeInOut
        })
      tlMouse.clear()
      tlMouse.add([tween])
    },
    leaveHover () {
      const { tlMouse, $refs } = this
      const tween = new TweenMax.to($refs.img, 0.4,
        {
          scale: 1,
          ease: Power2.easeInOut
        })
      tlMouse.clear()
      tlMouse.add([tween])
    },
    enterAnim () {
      const { tl, $refs } = this
      const thumbnailTween = new TweenMax.to($refs.thumbnail, 0.8,
        {
          opacity: 1,
          scale: 1,
          ease: Power2.easeInOut
        })
      const thumbnailGrid = new TweenMax.to($refs.grid, 0.8,
        {
          scaleX: 0,
          ease: Power2.easeInOut
        })
      tl.add([thumbnailTween, thumbnailGrid])
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-thumbnail{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  .thumbnail {
    display: block;
    opacity: 0;
    transform-origin: 50% 50% 0;
    transform: scale(0.8);
    overflow: hidden;

    img{
      width: 110%;
      display: block;
      z-index: -10;
      transform: scale(1);
      transform-origin: 50% 50%;
    }
  }
  .grid-reveal{
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 100% 50% 0px;
    transform: scaleX(1);
    width: 115%;
    height: 100%;
    background-color: $blackBack;
  }
}
</style>
