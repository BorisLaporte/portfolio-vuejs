<template>
  <a :href="data.url" target="_blank" :data-text="data.name" class="simple-link">{{ data.name }}</a>
</template>

<script>
export default {
  name: 'simple-link',
  props: ['data']
}
</script>

<style lang="scss" scoped>
.simple-link {
  position: relative;
  line-height: 1;
  color: $grey;
  padding: 1px 0;
  margin: 1px 0;
  display: inline-block;
  overflow: hidden;

  &::before{
    content: attr(data-text);
    position: absolute;
    color: $darkGrey;
    overflow: hidden;
    top: 0;
    left: 0;
    padding: 1px 0;
    z-index: 10;
    white-space: nowrap;
    width: 0;
    transition: width 0.4s ease-in-out 0.2s;
  }
  &::after{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: -10;
    width: 100%;
    height: 100%;
    padding: 1px;
    background-color: $pink;
    transform: translateX(-100%);
    transition: transform 0.6s ease-in-out;
  }

  &:hover{
    &::before{
      width: 100%;
    }
    &::after{
      z-index: 20;
      transform: translateX(100%);
    }
  }
}
</style>
