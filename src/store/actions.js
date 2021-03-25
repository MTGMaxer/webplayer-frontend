import axios from 'axios';

export default {
  fetchAlbums({ commit }) {
    axios.post('http://localhost:3000/getAlbums')
      .then((response) => {
        commit('setAlbums', response.data);
      })
      .catch((error) => console.error(error));
  },
  fetchTracksForAlbum({ commit }, albumName) {
    axios
      .post(
        'http://localhost:3000/getAlbumContent',
        { albumName },
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        },
      )
      .then((response) => {
        let trackList = response.data;
        trackList.sort((a, b) => a.index - b.index);
        commit('addAlbumTrackList', { trackList, albumName });
      })
      .catch((error) => console.error(error));
  },
  fetchRemotePlaylist({ commit }) {
    axios.post('http://localhost:3000/getPlaylist')
      .then((response) => {
        commit('setRemotePlaylist', response.data);
      })
      .catch((error) => console.error(error));
  },
  addTrackToPlaylist({ commit }, track) {
    axios.post('http://localhost:3000/addTrackToPlaylist', JSON.stringify(track), { 'Content-Type': 'text/plain' })
      .then((response) => {
        commit('addTrackToPlaylist', response.data);
      })
      .catch((error) => console.error(error));
  },
};
