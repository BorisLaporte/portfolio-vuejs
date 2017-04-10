<template>
  <div class="thumbnail" :style="{backgroundImage: 'url('+imgSource+')'}" >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { EventBus } from './inner-bus'

export default {
  name: 'thumbnail',
  props: ['src', 'name', 'didEnter'],
  computed: {
    ...mapGetters([
      'webpackContext'
    ]),
    imgSource: function () {
      const { webpackContext } = this
      return webpackContext(this.src)
    }
  },
  mounted () {
    EventBus.$on('test', function (e) {
      console.log(e)
    })
  }
}
</script>

<style lang="scss" scoped>
.thumbnail {
  position: absolute;
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
