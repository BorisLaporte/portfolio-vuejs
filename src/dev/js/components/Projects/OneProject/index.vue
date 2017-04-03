<template>
  <div class="one-project" v-bind:class="{ pair: !isOdd }">
    <div class="content-project" @click="onClick" >
      <Thumbnail :src="data.thumbnail" :name="data.name" />
      <NbPlace :data="naturalIndex" />
      <Technos :data="data.technos" />
      <OverContent :data="overPartContent" ></OverContent>
    </div>
  </div>
</template>

<script>
import Thumbnail from './Thumbnail'
import Technos from './Technos'
import OverContent from './OverContent'
import NbPlace from './NbPlace'

export default {
  name: 'one-project',
  props: ['data', 'index'],
  components: {
    Thumbnail,
    Technos,
    OverContent,
    NbPlace
  },
  computed: {
    overPartContent: function () {
      const { color, role, name, desc, mentions } = this.data
      return { color, role, name, desc, mentions }
    },
    naturalIndex: function () {
      return this.index + 1
    },
    isOdd: function () {
      return this.naturalIndex % 2
    }
  },
  methods: {
    onClick: function (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
.one-project {
  position: relative;
  display: inline-block;
  height: 100%;
  width: 960px;
  padding-right: 250px;
  @media screen and (max-width: 1650px) {
    width: 835px;
    padding-right: 220px;
  }
  @media screen and (max-width: 1400px) {
    width: 730px;
    padding-right: 190px;
  }

  &.pair .content-project{
    bottom: 13%;
    @media screen and (max-width: 800px) {
      bottom: 10%;
    }
  }
  &:not(.pair) .content-project{
    top: 13%;
    @media screen and (max-width: 800px) {
      bottom: 10%;
    }
  }
  .content-project{
    position: absolute;
    width: 460px;
    height: 300px;
    left: 27%;
    @media screen and (max-width: 1650px) {
      width: 400px;
      height: 260px;
    }
    @media screen and (max-width: 1400px) {
      width: 350px;
      height: 230px;
    }
  }
  
}
</style>
