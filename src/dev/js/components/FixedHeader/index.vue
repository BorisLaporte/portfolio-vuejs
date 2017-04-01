<template>
  <div id="fixed-header">
    <Logo />
    <AllLinks />
  </div>
</template>

<script>
import AllLinks from './AllLinks'
import Logo from './Logo'

export default {
  name: 'fixed-header',
  components: {
    AllLinks,
    Logo
  }
}
</script>

<style lang="scss">
#fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 30px 60px;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media screen and (max-width: 400px) {
    padding: 30px 10%;
  }
}
</style>
