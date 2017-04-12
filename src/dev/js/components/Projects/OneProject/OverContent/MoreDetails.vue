<template>
  <div class="more-details">
    <div class="content">
      <div ref="wrapperDesc" class="wrapper-desc">
        <div class="description" ref="desc" v-html="descMarked"></div> 
      </div>
      <div class="mentions" ref="mentions" v-if="mentions.length > 0" >
        <div ref="wrapperTitle" class="wrapper-title">
          <div class="title">Mentions</div>
        </div>
        <template v-for="_mention in mentions">
          <div ref="wrapperText" class="wrapper-text"> 
            <a :href="_mention.url" target="_blank" class="text">{{ _mention.name }}</a>
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
    paralax: function () {
      const { $el } = this
      return new TweenMax.fromTo($el, 1,
        {
          x: 80
        },
        {
          x: -65,
          ease: Power2.easeOut
        })
    }
  },
  mounted () {
    const { eventBus } = this
    this.setupTween()
    eventBus.$on('enter', this.enterAnim.bind(this))
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
      tl.add([desc], 1.4)
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

        }
      }
    }
  }
}
</style>
