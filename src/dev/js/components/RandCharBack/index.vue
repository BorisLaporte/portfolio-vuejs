<template>
  <div id="rand-char-back"></div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as statusTypes from 'STORE/scroll/status-types'
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
      'status'
    ])
  },
  watch: {
    windowSize: function (newWindowSize) {
      const { randCB } = this
      const { width, height } = newWindowSize
      randCB.resize(width, height)
    },
    status: function (newStatus) {
      this.onChangeStatus(newStatus)
    }
  },
  mounted () {
    const { $el, fontFamily, fontSize, fill, spaceWidth, spaceHeight } = this
    const _randCB = new MainChars({
      target: $el,
      fontFamily: fontFamily,
      fontSize: fontSize,
      fill: fill,
      spaceWidth: spaceWidth,
      spaceHeight: spaceHeight
    })
    this.randCB = _randCB
  },
  methods: {
    onChangeStatus (status) {
      const { randCB } = this
      const { HOME, PROJECTS, CONTACT } = statusTypes
      switch (status) {
        case HOME:
          randCB.resume()
          break
        case PROJECTS:
          randCB.finish()
          break
        case CONTACT:
          randCB.resume()
          break
        default:
          break
      }
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
}
</style>
