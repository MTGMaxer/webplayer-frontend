<template>
  <div>
    <div v-for="track in trackList" :key="track.index">
      <track-entry :track="track" @trackchosen="switchPlaylist"></track-entry>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TrackEntry from './TrackEntry.vue';

export default {
  data() {
    return {
      trackList: [],
    };
  },
  components: {
    TrackEntry,
  },
  computed: {
    currentAlbum() {
      return this.$store.state.viewedAlbum;
    },
  },
  methods: {
    fetchTracks(albumName) {
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
          let tracks = response.data;
          tracks.sort((a, b) => a.index - b.index);
          this.trackList = tracks;
        })
        .catch((error) => console.log(error));
    },
    switchPlaylist() {
      if (this.$store.state.currentPlaylist !== this.trackList) {
        this.$store.commit('switchPlaylist', this.trackList);
      }
    },
  },
  watch: {
    currentAlbum(newValue) {
      this.fetchTracks(newValue);
    },
  },
  mounted() {
    this.fetchTracks(this.currentAlbum);
  },
};
</script>

<style scoped>
</style>
