export const getters = {
  allData (state) {
    const { home, contact, links, projects } = state
    return { home, contact, links, projects }
  },
  home (state) {
    const { home } = state
    return home
  },
  contact (state) {
    const { contact } = state
    return contact
  },
  links (state) {
    const { links } = state
    return links
  },
  projects (state) {
    const { projects } = state
    return projects
  },
  webpackContext (state) {
    const { webpackContext } = state
    return webpackContext
  }
}
