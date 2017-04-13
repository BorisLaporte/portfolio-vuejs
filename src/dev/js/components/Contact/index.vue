<template>
  <div id="contact" class="sub-wrapper section big-text">
    <div class="container in-middle">
      <div class="punchline">{{ contact.punchline }}</div>
      <div class="mail">
        <SimpleLink :data="contact.mail"></SimpleLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as status from 'STORE/scroll/status-types'
import * as types from 'STORE/scroll/mutation-types'
import ScrollMagic from 'scrollmagic'

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
    ])
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
 .container{
    .punchline{
      font-family: $garamondBold;
      font-size: 2.8em;
      user-select: none;
      line-height: 2em;
    }
    .mail a{
      top: -25px;
      left: 0;
      color: $pink;
      &::before{
        display: none;
      }
    }
  }
}
</style>
