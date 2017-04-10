<template>
  <div id="preloader"></div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from 'STORE/loading/mutation-types'
import Preload from './Preload'
import sortImgPath from './sortImgPath'

export default {
  name: 'preloader',
  computed: {
    ...mapGetters([
      'allData',
      'isReady',
      'isLoaded',
      'webpackContext'
    ])
  },
  created () {
    this.bindAll()
  },
  methods: {
    launchLoading: function (data) {
      const { isLoaded, webpackContext } = this
      if (Object.keys(data).length > 0 && !isLoaded) {
        const img = sortImgPath(data)
        const preload = new Preload(img, this.onSuccess, this.onFail, this.onStatusChange, 6000, webpackContext)
        this.preload = preload
      }
    },
    bindAll: function () {
      this.onSuccess = this.onSuccess.bind(this)
      this.onFail = this.onFail.bind(this)
      this.onStatusChange = this.onStatusChange.bind(this)
    },
    onStatusChange: function (status) {
      const { $store } = this
      $store.commit(types.LOADING, { loadingStatus: status })
    },
    onSuccess: function () {
      console.log('DONE LOADING')
    },
    onFail: function () {
      const { $store } = this
      $store.commit(types.LOADED)
    }
  },
  watch: {
    allData: function (newData) {
      this.launchLoading(newData)
    },
    isReady: function () {
      console.log('is ready')
      const { allData } = this
      this.launchLoading(allData)
    }
  }
}
</script>

<style lang="scss" scoped>
#preloader{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
