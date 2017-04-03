  <template>
  <div class="name-block">
    <div class="content">
      <div class="title">{{ name }}</div>
      <div class="role">{{ role }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'name-block',
  props: ['name', 'role']
}
</script>

<style lang="scss" scoped>
.name-block {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 60px;
  transform: translate(-100%, -50%);
  @media screen and (max-width: 1650px) {
    left: 50px;
  }

  .content{
    text-align: left;

    .title{
      font-family: $harmonia;
      color: $white;
      font-size: 2.5em;
    }
    .role{
      font-family: $garamondItalic;
      color: $grey;
      font-size: 0.875em;
      padding: 1px 0;
      position: absolute;
      top: 100%;
      left: 0;
    }
  }
}
</style>
