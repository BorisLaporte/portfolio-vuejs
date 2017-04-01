<template>
  <div id="home">
    <div class="container">
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
  font-size: 1.6em;
  line-height: 1.24;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .container{
    width: 100%;
    max-width: 920px;
    padding: 0 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    @media screen and (max-width: 400px) {
      padding: 50px 10%;
    }

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
