<template>
  <div id="preloader">
    <slot></slot>
  </div>
</template>

<script>
import Preload from './Preload'
import { sortImgPath } from './sortImgPath'

export default {
  name: 'preloader'
}
</script>

<style lang="scss" scoped>
#preloader{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
