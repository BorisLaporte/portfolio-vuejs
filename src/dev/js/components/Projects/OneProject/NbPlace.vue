<template>
  <div class="nb-place" v-bind:class="{ pair: !isOdd }">
    <div class="content">
      <div class="number" v-bind:class="{ active: isOn }" >{{ data }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nb-place',
  props: ['data', 'isOn'],
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

    .number.active{
      transform: translateY(-10px);
    }
  }
  &:not(.pair){
    top: calc(100% + 25px);

    .number.active{
      transform: translateY(10px);
    }
  }
  .content{

    .number{
      font-family: $camingo;
      font-size: 1.1em;
      color: $white;
      opacity: 0.1;
      transition: all 1s ease-out;

      &.active{
        opacity: 1;
      }
    }
  }
}
</style>
