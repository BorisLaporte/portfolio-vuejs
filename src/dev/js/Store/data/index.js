import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'

const state = {
  home: {},
  contact: {},
  links: [],
  projects: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
