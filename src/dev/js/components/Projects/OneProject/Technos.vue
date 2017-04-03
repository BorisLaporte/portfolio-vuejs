<template>
  <div class="technos">
    <div class="content">
      <div class="text">{{ allTechnos }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'technos',
  props: ['data'],
  computed: {
    allTechnos: function () {
      const renderedTechnos = this.data.map(function (_techno) {
        return '#' + _techno
      })
      return renderedTechnos.join(', ')
    }
  }
}
</script>

<style lang="scss" scoped>
.technos {
  position: absolute;
  bottom: 15px;
  left: calc(100% - 40px);

  .content{

    .text{
      font-size: 0.875em;
    }
  }
}
</style>
