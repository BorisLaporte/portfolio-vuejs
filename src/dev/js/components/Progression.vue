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
    ])
  },
  // data () {
  //   return {
  //     tl: null
  //   }
  // },
  // data () {
  //   return {
  //     tl: new TimelineLite()
  //   }
  // },
  mounted () {
  },
  watch: {
    progress: function (newProgress) {
      this.setScale(newProgress)
    }
  },
  methods: {
    setScale: function (scale) {
      const { $el } = this
      TweenLite.set($el,
        {
          scaleX: scale
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
