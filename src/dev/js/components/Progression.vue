<template>
  <div id="progression"></div>
</template>

<script>

export default {
  name: 'progression'
}
</script>

<style lang="scss">
#progression{
  position: fixed;
  left: 0;
  bottom: 0;
  height: 4px;
  background-color: $pink;
  width: 100%;
  transform: scaleX(1);
  transform-origin: left;
  will-change: transform;
}
</style>
