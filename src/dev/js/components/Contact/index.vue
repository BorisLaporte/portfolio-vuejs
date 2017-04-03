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

import SimpleLink from '../SimpleLink'

export default {
  name: 'contact',
  components: {
    SimpleLink
  },
  computed: {
    ...mapGetters([
      'contact'
    ])
  }
}
</script>

<style lang="scss">
#contact {
  
 .container{
    .punchline{
      font-family: $garamondBold;
      font-size: 2.8em;
    }
    .mail a{
      color: $pink;
    }
  }
}
</style>
