import { LANDSCAPE, actions } from './actions.js'
import { mutations } from './mutations.js'

const state = {
  width: 0,
  height: 0,
  orientation: LANDSCAPE
}

export default {
  state,
  actions,
  mutations
}
