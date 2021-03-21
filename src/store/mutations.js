/* eslint-disable prefer-destructuring */
export default {
  setAlbums(state, albums) {
    state.albums = albums;
    state.viewedAlbum = albums[0];
  },
  setViewedAlbum(state, album) {
    state.viewedAlbum = album;
  },
  switchPlayingState(state, paused) {
    state.musicPaused = paused;
  },
  switchTrack(state, track) {
    state.currentPlayIndex = track.index;
  },
  switchPlaylist(state, playlist) {
    state.currentPlaylist = playlist;
  },
  goForward(state) {
    let index = state.currentPlayIndex + 1;
    if (index > Math.max(state.currentPlaylist.map((track) => track.index))) {
      index = Math.min(state.currentPlaylist.map((track) => track.index));
    }
    console.log(`Changing from ${state.currentPlayIndex} to ${index}`);
    state.currentPlayIndex = index;
  },
  goBackwards(state) {
    let index = state.currentPlayIndex - 1;
    if (index < Math.min(state.currentPlaylist.map((track) => track.index))) {
      index = Math.max(state.currentPlaylist.map((track) => track.index));
    }
    console.log(`Changing from ${state.currentPlayIndex} to ${index}`);
    state.currentPlayIndex = index;
  },
};
