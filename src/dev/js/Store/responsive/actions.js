import * as types from './mutation-types'

export const LANDSCAPE = 'LANDSCAPE'
export const PORTRAIT = 'PORTRAIT'

export const actions = {
  getWindowSize ({ commit }) {
    const width = window.innerWidth
    const height = window.innerHeight
    let orientation
    if (height <= width) {
      orientation = LANDSCAPE
    } else {
      orientation = PORTRAIT
    }

    commit(types.RESIZING, { width, height, orientation })
  }
}
