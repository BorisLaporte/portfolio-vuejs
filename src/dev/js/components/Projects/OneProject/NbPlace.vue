<template>
  <div class="nb-place" v-bind:class="{ pair: !isOdd }">
    <div class="content">
      <div class="number" v-bind:class="{ active: isOn }" >{{ data }}</div>
    </div>
  </div>
</template>

<script>
import { TimelineLite, TweenMax, Power2 } from 'gsap'

export default {
  name: 'nb-place',
  props: ['data', 'isOn', 'eventBus'],
  computed: {
    isOdd: function () {
      return this.data % 2
    },
    tl: function () {
      return new TimelineMax()
    },
    tween: function () {
      const { $el } = this
      return new TweenMax.fromTo($el, 1,
        {
          x: 60
        },
        {
          x: -48
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
      const { $el } = this
      const yValue = 20
      const fromValueY = this.isOdd ? yValue : -yValue
      TweenMax.fromTo($el, 0.6,
        {
          opacity: 0,
          y: fromValueY
        },
        {
          opacity: 1,
          y: 0,
          ease: Power2.easeOut,
          delay: 0.2
        })
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
.nb-place {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  user-select: none;

  &.pair{
    bottom: calc(100% + 25px);

    .number.active{
      transform: translateY(-10px);
    }
  }
  &:not(.pair){
    top: calc(100% + 25px);

    .number.active{
      transform: translateY(10px);
    }
  }
  .content{

    .number{
      font-family: $camingo;
      font-size: 1.1em;
      color: $white;
      opacity: 0.1;
      transition: all 1s ease-out;

      &.active{
        opacity: 1;
      }
    }
  }
}
</style>
