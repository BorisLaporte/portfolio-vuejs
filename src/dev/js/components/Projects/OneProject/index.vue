<template>
  <div class="one-project" ref="section" v-bind:class="{ pair: !isOdd }">
    <a 
    :href="data.link"
    target="_blank"
    class="content-project"
    ref="main"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave">
      <Thumbnail
      :eventBus="eventBus"
      delay="0.1"
      :src="data.thumbnail" 
      :name="data.name" />
      <NbPlace
      :eventBus="eventBus"
      :isOn="isOn"
      :data="naturalIndex" />
      <Technos
      :eventBus="eventBus"
      delay="0.6" 
      :data="data.technos" />
      <OverContent
      :eventBus="eventBus"
      delay="0.3" 
      :data="overPartContent" />
    </a>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import ScrollMagic from 'scrollmagic'
import { TweenLite, TimelineMax, Power2 } from 'gsap'

import Thumbnail from './Thumbnail'
import Technos from './Technos'
import OverContent from './OverContent'
import NbPlace from './NbPlace'

export default {
  name: 'one-project',
  props: ['data', 'index'],
  data () {
    return {
      didEnter: false,
      isOn: false,
      mouseOver: false
    }
  },
  components: {
    Thumbnail,
    Technos,
    OverContent,
    NbPlace
  },
  mounted () {
    window.addEventListener('mousemove', this.onMouseMove.bind(this))
  },
  computed: {
    ...mapGetters([
      'getScController',
      'windowSize'
    ]),
    eventBus: function () {
      return new Vue()
    },
    overPartContent: function () {
      const { color, role, name, desc, mentions, link } = this.data
      return { color, role, name, desc, mentions, link }
    },
    naturalIndex: function () {
      return this.index + 1
    },
    isOdd: function () {
      return this.naturalIndex % 2
    }
  },
  methods: {
    onClick: function (e) {
      // e.preventDefault()
    },
    onMouseMove: function (e) {
      const { eventBus, windowSize } = this
      const { width, height } = windowSize
      const eventModified = {
        x: (e.x - (width / 2)) * 0.01,
        y: (e.y - (height / 2)) * 0.01
      }
      eventBus.$emit('mouse-move', eventModified)
    },
    onMouseOver: function (e) {
      const { mouseOver, eventBus } = this
      if (!mouseOver) {
        this.mouseOver = true
        eventBus.$emit('on-hover')
      }
    },
    onMouseLeave: function (e) {
      const { eventBus } = this
      eventBus.$emit('leave-hover')
      this.mouseOver = false
    },
    setScene: function (controller) {
      const { $el } = this

      const duration = $el.clientWidth * 2
      const scene = new ScrollMagic.Scene({
        triggerElement: $el,
        triggerHook: 0.7,
        reverse: true,
        duration: duration
      })
      .addTo(controller)

      const onEnter = this.onEnter.bind(this)
      const onLeave = this.onLeave.bind(this)
      const onProgress = this.onProgress.bind(this)

      scene.on('enter progress leave', function (event) {
        switch (event.type) {
          case 'enter':
            onEnter()
            break
          case 'leave':
            onLeave()
            break
          case 'progress':
            onProgress(event)
            break
          default:
            break
        }
      })
    },
    onProgress: function (e) {
      const { eventBus } = this
      eventBus.$emit('progress', e)
    },
    onEnter: function () {
      const { $store, eventBus } = this
      this.isOn = true
      if (!this.didEnter) {
        this.didEnter = true
        eventBus.$emit('enter')
      }
    },
    onLeave: function () {
      this.isOn = false
    }
  },
  watch: {
    getScController: function (newController) {
      this.setScene(newController)
    }
  }
}
</script>

<style lang="scss">
.one-project {
  position: relative;
  display: inline-block;
  height: 100%;
  width: 960px;
  padding-right: 250px;
  @media screen and (max-height: 900px) {
    width: 835px;
    padding-right: 220px;
  }
  @media screen and (max-height: 800px) {
    width: 730px;
    padding-right: 190px;
  }

  &.pair .content-project{
    bottom: 10%;
    @media screen and (max-height: 800px) {
      bottom: 7%;
    }
  }
  &:not(.pair) .content-project{
    top: calc(10% + 60px);
    @media screen and (max-height: 800px) {
      top: calc(7% + 60px);
    }
  }
  .content-project{
    position: absolute;
    width: 460px;
    height: 300px;
    left: 27%;
    cursor: pointer;
    display: inline-block;

    @media screen and (max-height: 900px) {
      width: 400px;
      height: 260px;
    }
    @media screen and (max-height: 800px) {
      width: 350px;
      height: 230px;
    }
  }
}
</style>
