<template>
  <div class="nb-place" v-bind:class="{ pair: !isOdd }">
    <div class="content">
      <div class="number">{{ data }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nb-place',
  props: ['data'],
  computed: {
    isOdd: function () {
      return this.data % 2
    }
  }
}
</script>

<style lang="scss" scoped>
.nb-place {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  &.pair{
    bottom: calc(100% + 25px);
  }
  &:not(.pair){
    top: calc(100% + 25px);
  }
  .content{

    .number{
      font-family: $camingo;
      font-size: 1.1em;
      color: $white;
      opacity: 0.1;

      &.active{
        opacity: 1;
      }
    }
  }
}
</style>
