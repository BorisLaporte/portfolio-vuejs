<template>
  <div id="home" class="sub-wrapper section big-text">
    <div class="container in-middle" ref="container">
      <div>
        <h1 ref="title" class="title elm">{{ home.hi }}</h1>
        <div ref="whoAmI" class="who-am-i elm" v-html="whoAmIMarked"></div>
        <div ref="status" class="status elm" v-html="statusMarked"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as status from 'STORE/scroll/status-types'
import * as types from 'STORE/scroll/mutation-types'
import { TimelineLite, TimelineMax, TweenLite, TweenMax, Power2 } from 'gsap'
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import marked from 'marked'

export default {
  name: 'home',
  data: function () {
    return {
      page: status.HOME
    }
  },
  computed: {
    ...mapGetters([
      'home',
      'getScController'
    ]),
    whoAmIMarked: function () {
      return marked(this.home.whoAmI, { sanitize: true, break: true })
    },
    statusMarked: function () {
      return marked(this.home.status, { sanitize: true, break: true })
    },
    tl: function () {
      return new TimelineLite()
    }
  },
  watch: {
    getScController: function (newController) {
      this.setSceneGlobal(newController)
      // this.setSceneEvent(newController)
    }
  },
  mounted () {
    this.enterAnim()
  },
  methods: {
    enterAnim: function () {
      const { $el, tl, $refs } = this
      const title = TweenLite.fromTo($refs.title, 0.8,
        {
          opacity: 0,
          x: -30
        },
        {
          opacity: 1,
          x: 0,
          ease: Power2.easeOut
        })
      const whoAmI = TweenLite.fromTo($refs.whoAmI, 0.8,
        {
          opacity: 0,
          x: -30
        },
        {
          opacity: 1,
          x: 0,
          ease: Power2.easeOut
        })
      const status = TweenLite.fromTo($refs.status, 0.8,
        {
          opacity: 0,
          x: -30
        },
        {
          opacity: 1,
          x: 0,
          ease: Power2.easeOut
        })
      tl.clear()
      tl.add([title], 0.2).add([whoAmI], '-=0.6').add([status], '-=0.6')
    },
    setSceneGlobal: function (controller) {
      const { $el } = this

      const scene = new ScrollMagic.Scene({
        triggerElement: $el,
        reverse: true,
        duration: $el.clientWidth
      })
      .addTo(controller)

      const onEnter = this.onEnter.bind(this)
      const onLeave = this.onLeave.bind(this)

      scene.on('enter leave', function (event) {
        switch (event.type) {
          case 'enter':
            onEnter()
            break
          case 'leave':
            onLeave()
            break
          default:
            break
        }
      })
    },
    onEnter: function () {
      const { $store, page } = this
      $store.commit(types.NEW_STATUS, { status: page })
    },
    onLeave: function () {

    },
    setSceneEvent (controller) {
      const { $el, $refs } = this
      const tl = new TimelineLite()
      const tween = tl.to($refs.container, 0.5, {
        opacity: 0,
        scale: 0.95,
        delay: 0.5
      })

      const scene = new ScrollMagic.Scene({
        triggerElement: $refs.container,
        reverse: true,
        duration: $refs.container.clientWidth
      })
      .setPin($refs.container)
      .setTween(tween)
      .addTo(controller)
    }
  }
}
</script>

<style lang="scss">
#home {
  .container{

    .title{
      padding-top: 80px;
      font-size: 1.2em;
      font-family: $harmonia;
    }
  }
  .elm{
    padding: 20px 0px;
  }
  strong{
    color: $pink;
    font-family: $garamondBold;
  }
}
</style>
