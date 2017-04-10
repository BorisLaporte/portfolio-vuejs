// import { LANDSCAPE, actions } from './actions'
import * as status from './status-types'
import { mutations } from './mutations'
import { getters } from './getters'

const state = {
  controller: null,
  status: status.LOADING,
  progress: 0,
  scrollBack: false
}

export default {
  state,
  getters,
  mutations
}
