export default {
  setAlbums(state, albums) {
    state.albums = albums;
    [state.viewedAlbum] = albums;
    let emptyTrackList = {};
    albums.forEach((album) => { emptyTrackList[album] = null; });
    state.albumTrackList = emptyTrackList;
  },
  addAlbumTrackList(state, { trackList, albumName }) {
    state.albumTrackList[albumName] = trackList;
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
    let maxIndex = state.currentPlaylist.reduce((max, cur) => Math.max(max, cur.index), 0);
    if (index > maxIndex) {
      index = state.currentPlaylist.reduce((min, cur) => Math.min(min, cur.index), maxIndex);
    }
    state.currentPlayIndex = index;
  },
  goBackwards(state) {
    let index = state.currentPlayIndex - 1;
    if (index < state.currentPlaylist.reduce((min, cur) => Math.min(min, cur.index), Infinity)) {
      index = state.currentPlaylist.reduce((max, cur) => Math.max(max, cur.index), 0);
    }
    state.currentPlayIndex = index;
  },
  setRemotePlaylist(state, playlist) {
    state.remotePlaylist = playlist;
    state.remotePlaylist.sort((a, b) => a.index - b.index);
  },
  addTrackToPlaylist(state, track) {
    state.remotePlaylist.push(track);
    state.remotePlaylist.sort((a, b) => a.index - b.index);
  },
};
