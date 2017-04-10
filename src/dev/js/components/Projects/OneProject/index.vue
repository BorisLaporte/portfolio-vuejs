<template>
  <div class="one-project" v-bind:class="{ pair: !isOdd }">
    <div class="content-project" ref="main" >
      <Thumbnail
      :didEnter="didEnter"
      delay="0.1"
      :src="data.thumbnail" 
      :name="data.name" />
      <NbPlace
      :isOn="isOn"
      :data="naturalIndex" />
      <Technos
      :didEnter="didEnter"
      delay="0.6" 
      :data="data.technos" />
      <OverContent
      :didEnter="didEnter"
      delay="0.3" 
      :data="overPartContent" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ScrollMagic from 'scrollmagic'

import Thumbnail from './Thumbnail'
import Technos from './Technos'
import OverContent from './OverContent'
import NbPlace from './NbPlace'

import { EventBus } from './inner-bus'

export default {
  name: 'one-project',
  props: ['data', 'index'],
  data () {
    return {
      didEnter: false,
      isOn: false
    }
  },
  components: {
    Thumbnail,
    Technos,
    OverContent,
    NbPlace
  },
  computed: {
    ...mapGetters([
      'getScController'
    ]),
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
      console.log(e)
    },
    setScene: function (controller) {
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
      const { $store } = this
      this.isOn = true
      if (!this.didEnter){
        this.didEnter = true
        EventBus.$emit('test', 'lol')
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
