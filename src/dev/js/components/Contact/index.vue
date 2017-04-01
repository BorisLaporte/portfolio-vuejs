<template>
  <div id="contact" class="sub-wrapper">
    <div class="container">
      <div class="punchline">{{ contact.punchline }}</div>
      <div class="mail">{{ contact.mail }}</div>
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
  

  .container{
    .punchline{
      
      font-size: 2.8em;
    }
    .mail{
      color: $pink;
    }
  }
}
</style>
