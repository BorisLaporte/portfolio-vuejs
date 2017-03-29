import * as types from './mutation-types'

export const mutations = {
  [types.RESIZING] (state, { width, height, orientation }) {
    state.width = width
    state.height = height
    state.orientation = orientation
  }
}
