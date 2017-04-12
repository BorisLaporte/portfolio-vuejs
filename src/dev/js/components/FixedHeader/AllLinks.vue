<template>
  <div id="all-links">
    <template v-for="(value, index) in links">
      <ColumnLinks :name="value.name" :content="value.content" :index="index" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { TimelineLite, TweenLite, Power2 } from 'gsap'
import ColumnLinks from './ColumnLinks'

export default {
  name: 'all-links',
  components: {
    ColumnLinks
  },
  data () {
    return {
      delay: 1
    }
  },
  mounted () {
    // this.enterAnim()
  },
  computed: {
    ...mapGetters([
      'links'
    ]),
    isLinks () {
      return Object.keys(this.links) > 0
    },
    tl: function () {
      return new TimelineLite()
    }
  },
  methods: {
    enterAnim: function () {
      const { $el, tl, delay } = this
      const allLinks = TweenLite.fromTo($el, 1,
        {
          opacity: 0,
          y: -30
        },
        {
          opacity: 1,
          y: 0,
          ease: Power2.easeOut
        })
      tl.clear()
      tl.add([allLinks], delay)
    }
  }
}
</script>

<style>
#all-links {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  @media screen and (max-width: 500px) {
    
  }
}
</style>
