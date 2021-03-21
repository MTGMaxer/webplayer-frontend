import axios from 'axios';

export default {
  fetchAlbums({ commit }) {
    axios.post('http://localhost:3000/getAlbums')
      .then((response) => {
        commit('setAlbums', response.data);
      })
      .catch((error) => console.error(error));
  },
};
