<template>
  <div class="column-link">
    <div class="title" ref="title" >{{ name }}</div>
    <template v-for="(value, index) in content" >
      <span ref="link">
        <SimpleLink :data="value" ></SimpleLink>
      </span>
    </template>
  </div>
</template>

<script>
import { TimelineLite, TweenLite, Power2 } from 'gsap'
import SimpleLink from '../SimpleLink'

export default {
  name: 'column-link',
  components: {
    SimpleLink
  },
  computed: {
    delay: function () {
      const { index } = this
      return 1 + (index / 6)
    },
    tl: function () {
      return new TimelineLite()
    }
  },
  props: ['name', 'content', 'index'],
  mounted () {
    this.enterAnim()
  },
  methods: {
    enterAnim: function () {
      const { $refs, tl, delay } = this
      tl.clear()
      tl.pause()
      const titleTween = new TweenLite.fromTo($refs.title, 1,
        {
          opacity: 0,
          y: -10
        },
        {
          opacity: 1,
          y: 0,
          ease: Power2.easeOut
        })
      tl.add([titleTween], delay)
      for (let i = 0; i < $refs.link.length; i++) {
        const _linkTween = new TweenLite.fromTo($refs.link[i], 1,
          {
            opacity: 0,
            y: -5
          },
          {
            opacity: 1,
            y: 0,
            ease: Power2.easeOut
          })
        tl.add([_linkTween], '-=' + (0.9 - (i / 15)))
      }
      tl.play()
    }
  }
}
</script>

<style lang="scss">
.column-link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 80px;
  @media screen and (max-width: 500px) {
    margin-left: 10%;
  }

  .title{
    font-family: $harmonia;
    color: $white;
    padding: 3px 0;
  }
}
</style>
