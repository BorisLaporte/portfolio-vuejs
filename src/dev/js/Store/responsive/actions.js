import * as types from './mutation-types'

export const LANDSCAPE = 'LANDSCAPE'
export const PORTRAIT = 'PORTRAIT'

export const actions = {
  getWindowSize ({ commit }) {
    const width = window.innerWidth
    const height = window.innerHeight
    let isMobile
    let orientation
    if (height <= width) {
      orientation = LANDSCAPE
    } else {
      orientation = PORTRAIT
    }
    if (orientation === PORTRAIT && width < 680) {
      isMobile = true
    } else {
      isMobile = false
    }

    commit(types.RESIZING, { width, height, orientation, isMobile })
  }
}
