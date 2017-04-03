<template>
  <a :href="data.url" target="_blank" class="simple-link">{{ data.name }}</a>
</template>

<script>
export default {
  name: 'simple-link',
  props: ['data']
}
</script>

<style lang="scss" scoped>
.simple-link {
  color: $grey;
  padding: 1px 0;
  margin: 1px 0;
  display: inline-block;
}
</style>
