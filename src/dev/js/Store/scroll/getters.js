export const getters = {
  getScController (state) {
    const { controller } = state
    return controller
  },
  status (state) {
    const { status } = state
    return status
  },
  progress (state) {
    const { progress } = state
    return progress
  },
  scrollBack (state) {
    const { scrollBack } = state
    return scrollBack
  }
}
