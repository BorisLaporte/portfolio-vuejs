<template>
  <div id="home" class="sub-wrapper section big-text">
    <div class="container in-middle">
      <h1 class="title elm">{{ home.hi }}</h1>
      <div class="who-am-i elm" v-html="whoAmIMarked"></div>
      <div class="status elm" v-html="statusMarked"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as status from 'STORE/scroll/status-types'
import * as types from 'STORE/scroll/mutation-types'
import ScrollMagic from 'ScrollMagic'
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
    }
  },
  mounted: function () {
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
