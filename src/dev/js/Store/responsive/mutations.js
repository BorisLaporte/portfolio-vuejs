import * as types from './mutation-types'

export const mutations = {
  [types.RESIZING] (state, { width, height, orientation, isMobile }) {
    state.width = width
    state.height = height
    state.orientation = orientation
    state.isMobile = isMobile
  }
}
