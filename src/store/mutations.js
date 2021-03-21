/* eslint-disable prefer-destructuring */
export default {
  setAlbums(state, albums) {
    state.albums = albums;
    state.currentAlbum = albums[0];
  },
  setCurrentAlbum(state, album) {
    state.currentAlbum = album;
  },
};
