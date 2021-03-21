<template>
  <div>
    <div v-for="track in trackList" :key="track.title">
      <track-entry :track="track"></track-entry>
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
      return this.$store.state.currentAlbum;
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
          tracks.sort((a, b) => {
            if (a.index && b.index) {
              return a.index - b.index;
            }
            return a.title.localeCompare(b.title);
          });
          this.trackList = tracks;
        })
        .catch((error) => console.log(error));
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
