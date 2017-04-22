<template>
  <div id="mobile-links">
    <template v-for="(value, index) in links">
      <template v-for="(_value, _index) in value.content">
        <a ref="links" class="link" target="_blank" :href="_value.url">
          <img :src="imgSource(_value.img)" alt="_value.name">
        </a>
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TimelineMax, TweenMax, Power2 } from 'gsap'

export default {
  name: 'mobile-links',
  computed: {
    ...mapGetters([
      'webpackContext',
      'links'
    ]),
    tl: function () {
      return new TimelineMax()
    }
  },
  mounted () {
    this.enterAnim()
  },
  methods: {
    imgSource: function (src) {
      const { webpackContext } = this
      return webpackContext(src)
    },
    enterAnim: function () {
      const { tl, $refs } = this

      TweenMax.staggerFrom($refs.links, 0.6,
        {
          opacity:0,
          y: 10,
          ease: Power2.easeInOut,
          delay: 1
        }, 0.25)
    }
  }
}
</script>

<style lang="scss" scoped>
#mobile-links {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 30px 50px 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .link{
    width: 25px;
    height: 25px;
    position: relative;
    display: inline-block;
    margin: 5px;

    img{
      width: 100%;
      height: 100%;
      position: absolute;
      display: inline-block;
      top: 0;
      left: 0;
      object-fit: contain;
    }
  }
}
</style>
