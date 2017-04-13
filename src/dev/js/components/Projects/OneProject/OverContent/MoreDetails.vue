<template>
  <div class="more-details">
    <div class="content">
      <div ref="wrapperDesc" class="wrapper-desc">
        <div ref="hoverDesc">
          <div ref="mouseDesc">
            <div class="description" ref="desc" v-html="descMarked"></div> 
          </div>
        </div>
      </div>
      <div class="mentions" ref="mentions" v-if="mentions.length > 0" >
        <div ref="wrapperTitle" class="wrapper-title">
          <div ref="hoverTitle">
            <div ref="mouseTitle">
              <div class="title">Mentions</div>
            </div>
          </div>
        </div>
        <template v-for="_mention in mentions">
          <div ref="wrapperText" class="wrapper-text">
            <div ref="hoverText">
              <div ref="mouseText">
                <a :href="_mention.url" target="_blank" class="text">{{ _mention.name }}</a>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import { TimelineMax, TweenMax, TweenLite, Power2 } from 'gsap'

export default {
  name: 'more-details',
  props: ['desc', 'mentions', 'eventBus'],
  computed: {
    descMarked: function () {
      return marked(this.desc, { sanitize: true, break: true })
    },
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
      return new TweenMax.fromTo($el, 2,
        {
          x: 80
        },
        {
          x: -35,
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
      const tl = new TimelineMax().pause()
      const desc = new TweenLite.fromTo($refs.wrapperDesc, 0.6,
        {
          opacity: 0,
          x: 10
        },
        {
          opacity: 1,
          x: 0,
          ease: Power2.easeInOut
        })
      tl.add([desc], 1.2)
      if ($refs.wrapperTitle !== undefined) {
        const title = new TweenLite.fromTo($refs.wrapperTitle, 0.8,
          {
            opacity: 0,
            x: 5
          },
          {
            opacity: 1,
            x: 0,
            ease: Power2.easeInOut
          })
        tl.add([title], '-=0.4')
        for (let i = 0; i < $refs.wrapperText.length; i++) {
          const text = new TweenLite.fromTo($refs.wrapperText[i], 0.8,
            {
              opacity: 0,
              x: 5
            },
            {
              opacity: 1,
              x: 0,
              ease: Power2.easeInOut
            })
          tl.add([text], '-=0.6')
        }
      }
      tl.play()
    },
    onMouseMove (e) {
      const { tlMouse, $refs } = this
      const tweens = []
      const desc = new TweenMax.to($refs.mouseDesc, 0.2,
        {
          x: e.x * 0.8,
          y: -e.y * 0.8,
          ease: Power2.ease
        })
      tweens.push(desc)
      if ($refs.mouseTitle !== undefined) {
        const title = new TweenMax.to($refs.mouseTitle, 0.2,
          {
            x: -e.x * 0.3,
            y: e.y * 0.3,
            ease: Power2.ease
          })
        tweens.push(title)
        for (let i = 0; i < $refs.mouseText.length; i++) {
          const text = new TweenMax.to($refs.mouseText[i], 0.2,
            {
              x: e.x * 0.2,
              y: -e.y * 0.2,
              ease: Power2.ease
            })
          tweens.push(text)
        }
      }
      tlMouse.clear()
      tlMouse.add(tweens)
    },
    onHover () {
      const { tlHover, $refs } = this
      const tweens = []
      const desc = new TweenMax.to($refs.hoverDesc, 0.4,
        {
          y: -10,
          ease: Power2.easeInOut
        })
      tweens.push(desc)
      if ($refs.hoverTitle !== undefined) {
        const title = new TweenMax.to($refs.hoverTitle, 0.4,
          {
            y: -5,
            ease: Power2.easeInOut
          })
        tweens.push(title)
        for (let i = 0; i < $refs.hoverText.length; i++) {
          const text = new TweenMax.to($refs.hoverText[i], 0.4,
            {
              y: 3,
              ease: Power2.easeInOut
            })
          tweens.push(text)
        }
      }
      tlHover.clear()
      tlHover.add(tweens)
    },
    leaveHover () {
      const { tlHover, $refs } = this
      const tweens = []
      const desc = new TweenMax.to($refs.hoverDesc, 0.4,
        {
          y: 0,
          ease: Power2.easeInOut
        })
      tweens.push(desc)
      if ($refs.hoverTitle !== undefined) {
        const title = new TweenMax.to($refs.hoverTitle, 0.4,
          {
            y: 0,
            ease: Power2.easeInOut
          })
        tweens.push(title)
        for (let i = 0; i < $refs.hoverText.length; i++) {
          const text = new TweenMax.to($refs.hoverText[i], 0.4,
            {
              y: 0,
              ease: Power2.easeInOut
            })
          tweens.push(text)
        }
      }
      tlHover.clear()
      tlHover.add(tweens)
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

<style lang="scss" scoped>
.more-details {
  position: absolute;
  top: 50%;
  left: calc(100% - 30px);
  transform: translateY(-50%);
  
  .content{
    line-height: 1.38;

    .wrapper-desc{
      opacity: 0;
      
      .description{
        width: 100%;
        max-width: 400px;
        color: $lightGrey;
      }
    }
    .mentions{
      padding-top: 20px;
      .wrapper-title{
        opacity: 0;

        .title{
          font-family: $garamondBold;
        }
      }
      .wrapper-text{

        .text{
          padding-left: 0px;
          transition: all 0.1s ease-in-out;

          &:hover{
            padding-left: 5px;
          }
        }
      }
    }
  }
}
</style>
