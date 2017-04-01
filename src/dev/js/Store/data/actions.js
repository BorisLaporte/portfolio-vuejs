import * as types from './mutation-types'

export const actions = {
  fillJson ({ commit }, json) {
    const { home, contact, links, projects } = json
    commit(types.FETCH_SUCCESS, { home, contact, links, projects })
  }
}
