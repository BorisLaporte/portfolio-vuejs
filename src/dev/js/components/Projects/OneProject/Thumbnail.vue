<template>
  <div class="thumbnail" :style="{backgroundImage: 'url('+imgSource+')'}">
  </div>
</template>

<script>
export default {
  name: 'thumbnail',
  props: ['src', 'name'],
  computed: {
    imgSource: function () {
      return require('IMG/' + this.src)
    }
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
