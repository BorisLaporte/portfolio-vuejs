<template>
  <div class="column-link">
    <div class="title">{{ name }}</div>
    <template v-for="obj in content" >
      <SimpleLink :data="obj"></SimpleLink>
    </template>
  </div>
</template>

<script>
import SimpleLink from '../SimpleLink'

export default {
  name: 'column-link',
  components: {
    SimpleLink
  },
  props: ['name', 'content'],
  mounted () {
    console.log(this.content)
  },
  updated () {
    console.log(this.name)
  }
}
</script>

<style lang="scss">
.column-link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 80px;
  @media screen and (max-width: 500px) {
    margin-left: 10%;
  }

  .title{
    font-family: $harmonia;
    color: $white;
    padding: 3px 0;
  }
}
</style>
