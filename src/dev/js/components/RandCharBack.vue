<template>
  <div id="rand-char-back">
    <span ref="testing" class="testing" >a</span>
    <canvas ref="canvas" :width="windowSize.width" :height="windowSize.height"></canvas>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'rand-char-back',
  prop: ['test'],
  data: () => {
    return {
      specs: {
        lines: 0,
        columns: 0,
        charWidth: 0,
        charHeight: 0
      },
      char: 'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN1234567890<>?;/:!§ù%*µ$£ø^+=})]@àç\_è|-[({#é~&',
      pickRate: 0.4,
      content: null,
      loop: null,
      ctx: null
    }
  },
  computed: {
    ...mapGetters([
      'windowSize'
    ])
  },
  updated () {
    console.log('happy')
  },
  mounted () {
    console.log(this)
    console.log(this.$refs.testing)
    const test = this.getSpecs(this.$refs.testing, this.windowSize)
    console.log(test)
    this.$set(this.specs, )
  },
  methods: {
    getSpecs (el, window) {
      const { width, height } = window
      const charWidth = el.offsetWidth
      const charHeight = el.offsetHeight
      const columns = Math.ceil((width / charWidth)) + 2
      const lines = Math.ceil((height / charHeight)) + 2
      return {
        lines: lines,
        columns: columns,
        charWidth: charWidth,
        charHeight: charHeight
      }
    }
  },
  watch: {
    windowSize: function (nextState) {
      console.log(nextState)
    }
  }
}
</script>

<style >
#rand-char-back{
  .testing{

  }
}
</style>
