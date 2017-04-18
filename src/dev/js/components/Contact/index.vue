<template>
  <div id="contact" class="sub-wrapper section big-text">
    <div class="container in-middle">
      <div class="punchline">
        <span class="text" ref="text">{{ contact.punchline }}</span>
        <span class="emoji" ref="emoji">{{ contact.emoji }}</span>
      </div>
      <div class="mail">
        <SimpleLink :data="contact.mail"></SimpleLink>
      </div>
    </div>
    <div class="author">
      <span class="text">{{contact.design.text}}</span>
      <span>
        <SimpleLink :data="contact.design.author"></SimpleLink>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TimelineMax, TweenMax, Power2, Elastic } from 'gsap'
import ScrollMagic from 'scrollmagic'

import * as status from 'STORE/scroll/status-types'
import * as types from 'STORE/scroll/mutation-types'

import SimpleLink from '../SimpleLink'

export default {
  name: 'contact',
  components: {
    SimpleLink
  },
  data: function () {
    return {
      page: status.CONTACT
    }
  },
  computed: {
    ...mapGetters([
      'contact',
      'getScController'
    ]),
    tl: function () {
      return new TimelineMax()
    }
  },
  watch: {
    getScController: function (newController) {
      this.setScene(newController)
    }
  },
  methods: {
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
      const { $store, page } = this
      $store.commit(types.NEW_STATUS, { status: page })
    },
    onLeave: function () {

    }
  }
}
</script>

<style lang="scss">
#contact {
  .author{
    position: absolute;
    right: 70px;
    bottom: 120px;
    font-size: 0.625em;
    .text{
      color: $grey;
      vertical-align: middle;
    }
    a {
      color: $white;
      vertical-align: middle;
      &::before{
        color: $pink;
        vertical-align: middle;
      }
    }
  }
 .container{
    .punchline{
      font-family: $garamondBold;
      font-size: 2.8em;
      user-select: none;
      line-height: 2em;

      span{
        display: inline-block;
      }
      .emoji{
        transform-origin: 50% 50%;
      }
    }
    .mail a{
      top: -25px;
      left: 0;
      color: $grey;
      &::before{
        color: $pink;
      }
    }
  }
}
</style>
