import * as types from './mutation-types'

export const mutations = {
  [types.LOADING] (state, { loadingStatus }) {
    state.loadingStatus = loadingStatus
  },
  [types.READY] (state) {
    state.ready = true
  },
  [types.LOADED] (state) {
    state.loaded = true
  }
}
