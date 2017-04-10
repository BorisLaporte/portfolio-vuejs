import * as types from './mutation-types'

export const actions = {
  updateLoadingStatus ({ commit }, loadingStatus) {
    if (loadingStatus === 1) {
      commit(types.READY)
    } else {
      commit(types.LOADING, { loadingStatus })
    }
  }
}
