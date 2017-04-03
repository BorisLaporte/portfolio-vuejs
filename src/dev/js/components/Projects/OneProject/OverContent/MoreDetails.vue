<template>
  <div class="more-details">
    <div class="content">
      <div class="description" v-html="descMarked"></div>
      <div class="mentions" v-if="mentions.length > 0" >
        <div class="title">Mentions</div>
        <template v-for="_mention in mentions">
          <a :href="_mention.url" class="text">{{ _mention.name }}</a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'more-details',
  props: ['desc', 'mentions'],
  computed: {
    descMarked: function () {
      return marked(this.desc, { sanitize: true, break: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.more-details {
  position: absolute;
  top: 50%;
  left: calc(100% - 30px);
  transform: translateY(-50%);
  
  .content{
    line-height: 1.38;

    .description{
      width: 100%;
      max-width: 400px;
      color: $lightGrey;
    }
    .mentions{
      padding-top: 20px;
      .title{
        font-family: $garamondBold;
      }
      .text{

      }
    }
  }
}
</style>
