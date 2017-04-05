<template>
  <div id="rand-char-back"></div>
</template>

<script>
import MainChars from './MainChars'

export default {
  name: 'rand-char-back',
  data: function () {
    return {
      fontFamily: 'CamingoCode-Bold',
      fontSize: 16 + 'px',
      fill: '#eee',
      spaceWidth: 4,
      spaceHeight: 8
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
