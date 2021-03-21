export default {
  currentlyPlayedTrack(state, getters) {
    return state.currentPlaylist.find((track) => track.index === state.currentPlayIndex);
  },
};
