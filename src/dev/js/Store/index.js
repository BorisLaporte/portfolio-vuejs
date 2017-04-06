import Vue from 'vue'
import Vuex from 'vuex'
import responsive from './responsive'
import scroll from './scroll'
import data from './data'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    data,
    responsive,
    scroll
  },
  strict: debug
})

export default store
