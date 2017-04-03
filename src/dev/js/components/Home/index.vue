<template>
  <div id="home" class="sub-wrapper section big-text">
    <div class="container in-middle">
      <h1 class="title elm">{{ home.hi }}</h1>
      <div class="who-am-i elm" v-html="whoAmIMarked"></div>
      <div class="status elm" v-html="statusMarked"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import marked from 'marked'

export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'home'
    ]),
    whoAmIMarked: function () {
      return marked(this.home.whoAmI, { sanitize: true, break: true })
    },
    statusMarked: function () {
      return marked(this.home.status, { sanitize: true, break: true })
    }
  }
}
</script>

<style lang="scss">
#home {
  .container{

    .title{
      padding-top: 80px;
      font-size: 1.2em;
      font-family: $harmonia;
    }
  }
  .elm{
    padding: 20px 0px;
  }
  strong{
    color: $pink;
    font-family: $garamondBold;
  }
}
</style>
