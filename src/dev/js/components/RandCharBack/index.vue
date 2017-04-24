<template>
  <div id="rand-char-back"></div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as statusTypes from 'STORE/scroll/status-types'
import * as types from 'STORE/loading/mutation-types'
import MainChars from './MainChars'

export default {
  name: 'rand-char-back',
  data: function () {
    return {
      fontFamily: 'CamingoCode-Bold',
      fontSize: 16 + 'px',
      fill: '#fff',
      spaceWidth: 4,
      spaceHeight: 8
    }
  },
  computed: {
    ...mapGetters([
      'windowSize',
      'status',
      'loadingStatus'
    ])
  },
  watch: {
    windowSize: function (newWindowSize) {
      const { randCB } = this
      const { width, height } = newWindowSize
      if (randCB.loaded !== undefined && randCB.loaded) {
        randCB.resize(width, height)
      }
    },
    status: function (newStatus) {
      const { loaded } = this.randCB
      if (loaded !== undefined && loaded) {
        this.onChangeStatus(newStatus)
      }
    },
    loadingStatus: function (newStatus) {
      const { randCB } = this
      randCB.fadeInHardText(newStatus, 1, this.onReady)
    }
  },
  created () {
    this.bindAll()
  },
  mounted () {
    const { $el, fontFamily, fontSize, fill, spaceWidth, spaceHeight } = this
    this.randCB = new MainChars({
      target: $el,
      fontFamily: fontFamily,
      fontSize: fontSize,
      fill: fill,
      spaceWidth: spaceWidth,
      spaceHeight: spaceHeight,
      callbackReady: this.letsStart
    })
  },
  methods: {
    bindAll () {
      this.letsStart = this.letsStart.bind(this)
      this.onReady = this.onReady.bind(this)
    },
    letsStart () {
      const { $store, status } = this
      this.onChangeStatus(status)
      $store.commit(types.READY)
    },
    onChangeStatus (status) {
      const { randCB } = this
      const { HOME, PROJECTS, CONTACT, LOADING } = statusTypes
      switch (status) {
        case LOADING:
          randCB.fadeInApp()
          randCB.setHardText(0.5, 0.5, 'L O A D I N G')
          break
        case HOME:
          randCB.fadeInApp(0.4)
          break
        case PROJECTS:
          randCB.fadeOutApp(0.4)
          break
        case CONTACT:
          randCB.fadeInApp(0.4)
          break
        default:
          break
      }
    },
    onReady () {
      const { $store } = this
      $store.commit(types.LOADED)
    }
  }
}
</script>

<style lang="scss" scoped>
#rand-char-back{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-family: $camingo;

  canvas{
    max-height: 100%;
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
