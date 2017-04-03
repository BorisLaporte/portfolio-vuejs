import Vue from 'vue'
import Vuex from 'vuex'
import responsive from './responsive'
import data from './data'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    data,
    responsive
  },
  strict: debug
})

export default store

// if (module.hot) {
//   // accept actions and mutations as hot modules
//   module.hot.accept(['./responsive', './data'], () => {
//     // require the updated modules
//     // have to add .default here due to babel 6 module output
//     const newResponsive = require('./responsive').default
//     const newData = require('./data').default
//     // swap in the new actions and mutations
//     store.hotUpdate({
//       modules: {
//         newData,
//         newResponsive
//       }
//     })
//   })
// }
