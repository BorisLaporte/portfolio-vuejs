import { LANDSCAPE, actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'

const state = {
  width: 0,
  height: 0,
  orientation: LANDSCAPE,
  isMobile: false
}

export default {
  state,
  getters,
  actions,
  mutations
}
