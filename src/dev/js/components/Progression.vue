<template>
  <div id="progression"></div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TimelineLite, Power2, TweenLite } from 'gsap'

export default {
  name: 'progression',
  computed: {
    ...mapGetters([
      'progress'
    ]),
    tl: function () {
      return new TimelineLite()
    }
  },
  watch: {
    progress: function (newProgress) {
      this.setScale(newProgress)
    }
  },
  methods: {
    setScale: function (scale) {
      const { tl, $el } = this
      tl.clear()
      tl.set($el,
        {
          scaleX: scale
        })
    },
    toScale: function (scale) {
      const { tl, $el } = this
      tl.clear()
      tl.to($el, 0.5,
        {
          scaleX: scale,
          ease: Power2.easeOut
        })
    }
  }
}
</script>

<style lang="scss">
#progression{
  position: fixed;
  left: 0;
  bottom: 0;
  height: 4px;
  background-color: $pink;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  will-change: transform;
}
</style>
