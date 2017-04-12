  <template>
  <div class="name-block">
    <div class="content">
      <div ref="wrapperTitle" class="wrapper-title">
        <div ref="name" class="title">{{ name }}</div> 
        <!-- <a ref="name" :href="link" target="_blank" class="title">{{ name }}</a>  -->
      </div>
      <div ref="wrapperRole" class="wrapper-role">
        <div ref="role" class="role">{{ role }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { TimelineMax, TweenMax, TweenLite, Power2 } from 'gsap'

export default {
  name: 'name-block',
  props: ['name', 'role', 'link', 'eventBus'],
  computed: {
    tl: function () {
      return new TimelineMax()
    },
    paralaxName: function () {
      const { name } = this.$refs
      return new TweenMax.fromTo(name, 1,
        {
          x: 60
        },
        {
          x: -30,
          ease: Power2.easeOut
        })
    },
    paralaxRole: function () {
      const { role } = this.$refs
      return new TweenMax.fromTo(role, 1,
        {
          x: 80
        },
        {
          x: -40,
          ease: Power2.easeOut
        })
    }
  },
  mounted () {
    const { eventBus } = this
    this.setupTween()
    eventBus.$on('enter', this.enterAnim.bind(this))
    eventBus.$on('progress', this.progressAnim.bind(this))
  },
  methods: {
    enterAnim () {
      const { $refs } = this
      const tl = new TimelineMax()
      const name = new TweenLite.fromTo($refs.wrapperTitle, 1,
        {
          opacity: 0,
          x: -30
        },
        {
          opacity: 1,
          x: 0,
          ease: Power2.easeInOut
        })
      const role = new TweenLite.fromTo($refs.wrapperRole, 1,
        {
          opacity: 0,
          x: -20
        },
        {
          opacity: 1,
          x: 0,
          ease: Power2.easeInOut
        })
      tl.add([name], 1).add([role], '-=0.8')
    },
    setupTween () {
      const { tl, paralaxName, paralaxRole } = this
      tl.pause()
      tl.add([paralaxName, paralaxRole])
    },
    progressAnim ({ progress }) {
      const { tl } = this
      tl.tweenTo(progress)
    }
  }
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

    .wrapper-title{
      opacity: 0;

      .title{
        font-family: $harmonia;
        color: $white;
        font-size: 2.5em;
        display: inline-block;
      }
    }
    .wrapper-role{
      opacity: 0;

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
}
</style>
