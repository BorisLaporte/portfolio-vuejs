export const getters = {
  orientation (state) {
    const { orientation } = state
    return orientation
  },
  windowSize (state) {
    return {
      width: state.width,
      height: state.height
    }
  }
}
