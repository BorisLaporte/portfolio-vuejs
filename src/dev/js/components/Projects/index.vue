<template>
  <div id="projects" class="sub-wrapper">
    <div class="list-container">
      <template v-for="(obj, index) in projects" >
        <OneProject :data="obj" :index="index" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OneProject from './OneProject'

export default {
  name: 'projects',
  computed: {
    ...mapGetters([
      'projects'
    ])
  },
  components: {
    OneProject
  }
}
</script>

<style lang="scss">
#projects {
  position: relative;
  height: 100%;
  padding: 50px 200px 50px 50px;
}
</style>
