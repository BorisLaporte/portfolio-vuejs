<template>
  <div id="all-links">
    <template v-for="value in links">
      <ColumnLinks :name="value.name" :content="value.content" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ColumnLinks from './ColumnLinks'

export default {
  name: 'all-links',
  components: {
    ColumnLinks
  },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'links'
    ]),
    isLinks () {
      return Object.keys(this.links) > 0
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
