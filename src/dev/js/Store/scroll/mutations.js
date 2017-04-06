import * as types from './mutation-types'

export const mutations = {
  [types.INIT] (state, { controller }) {
    state.controller = controller
  },
  [types.NEW_STATUS] (state, { status }) {
    state.status = status
  },
  [types.PROGRESS] (state, { progress }) {
    state.progress = progress
  }
}
