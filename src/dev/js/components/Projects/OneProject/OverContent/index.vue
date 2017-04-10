<template>
  <div class="over-content" :style="{backgroundColor: data.color}">
    <NameBlock :name="data.name" :role="data.role" :link="data.link" />
    <MoreDetails :desc="data.desc" :mentions="data.mentions" />
  </div>
</template>

<script>
import NameBlock from './NameBlock'
import MoreDetails from './MoreDetails'

export default {
  name: 'over-content',
  props: ['data'],
  components: {
    NameBlock,
    MoreDetails
  }
}
</script>

<style lang="scss">
.over-content {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 117%;
  height: 55%;
  mix-blend-mode: lighten;
  background-size: cover;
}
</style>
