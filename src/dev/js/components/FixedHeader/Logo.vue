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
  width: 50px;
  height: 50px;
  background-color: $pink;
  flex-shrink: 0;

  .text{
    font-family: $garamond;
    font-size: 1.25em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $blackFont;
  }
}
</style>
