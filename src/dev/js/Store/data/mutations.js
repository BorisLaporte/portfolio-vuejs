import * as types from './mutation-types'

export const mutations = {
  [types.FETCH_SUCCESS] (state, { home, contact, links, projects }) {
    state.home = home
    state.contact = contact
    state.links = links
    state.projects = projects
  }
}
