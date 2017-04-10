import Vue from 'vue'
import Vuex from 'vuex'
import responsive from './responsive'
import scroll from './scroll'
import data from './data'
import loading from './loading'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    data,
    responsive,
    scroll,
    loading
  },
  strict: debug
})

export default store
