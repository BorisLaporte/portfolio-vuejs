<template>
  <div id="contact">
    <div class="container">

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'contact',
  computed: {
    ...mapGetters([
      'contact'
    ])
  }
}
</script>

<style lang="scss">
#contact {
  
}
</style>
