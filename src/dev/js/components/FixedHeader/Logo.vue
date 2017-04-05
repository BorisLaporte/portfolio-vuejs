<template>
  <a href="#" @click="onClick" id="Logo">
    <div class="text">BL</div>
  </a>
</template>

<script>
export default {
  name: 'Logo',
  methods: {
    onClick: function (e) {
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
#Logo {
  position: relative;
  padding: 20px;
  background-color: $pink;
  flex-shrink: 0;

  .text{
    font-family: $garamond;
    font-size: 1.25em;
    position: relative;
    color: $blackFont;
  }
}
</style>
