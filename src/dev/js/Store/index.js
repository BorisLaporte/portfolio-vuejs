import Vue from 'vue'
import Vuex from 'vuex'
import responsive from './responsive'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    responsive
  },
  strict: debug
})
