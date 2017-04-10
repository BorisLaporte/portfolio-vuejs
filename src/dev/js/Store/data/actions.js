import * as types from './mutation-types'

export const actions = {
  fillJson ({ commit }, payload) {
    const { home, contact, links, projects, webpackContext } = payload
    commit(types.FETCH_SUCCESS, { home, contact, links, projects, webpackContext })
  }
}
