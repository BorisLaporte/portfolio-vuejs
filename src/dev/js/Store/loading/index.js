// import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'

const state = {
  loadingStatus: 0,
  ready: false,
  loaded: false
}

export default {
  state,
  getters,
  mutations
}
