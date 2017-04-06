<template>
  <div id="projects" class="sub-wrapper">
    <div class="list-container">
      <template v-for="(obj, index) in projects" >
        <OneProject :data="obj" :index="index" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ScrollMagic from 'ScrollMagic'
import * as status from 'STORE/scroll/status-types'
import * as types from 'STORE/scroll/mutation-types'

import OneProject from './OneProject'

export default {
  name: 'projects',
  computed: {
    ...mapGetters([
      'projects',
      'getScController'
    ])
  },
  data: function () {
    return {
      page: status.PROJECTS
    }
  },
  components: {
    OneProject
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
#projects {
  position: relative;
  height: 100%;
  padding: 0 200px 0 50px;
}
</style>
