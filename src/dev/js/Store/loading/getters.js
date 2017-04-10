export const getters = {
  loadingStatus (state) {
    const { loadingStatus } = state
    return loadingStatus
  },
  isReady (state) {
    const { ready } = state
    return ready
  },
  isLoaded (state) {
    const { loaded } = state
    return loaded
  }
}
