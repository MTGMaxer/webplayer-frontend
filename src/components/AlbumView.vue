<template>
  <div>
    <table>
      <colgroup>
        <col span="1" style="width: 36%" />
        <col span="1" style="width: 30%" />
        <col span="1" />
        <col span="1" />
      </colgroup>
      <tr>
        <th></th>
        <th class="header">
          {{ currentAlbum }}
        </th>
        <th></th>
        <th></th>
      </tr>
      <track-entry
        v-for="track in trackList"
        :key="track.index"
        :track="track"
        @trackchosen="switchPlaylist"
      ></track-entry>
    </table>
  </div>
</template>

<script>
import TrackEntry from './TrackEntry.vue';

export default {
  components: {
    TrackEntry,
  },
  computed: {
    currentAlbum() {
      return this.$store.state.viewedAlbum;
    },
    trackList() {
      return this.$store.state.albumTrackList[this.currentAlbum];
    },
  },
  methods: {
    switchPlaylist() {
      if (this.$store.state.currentPlaylist !== this.trackList) {
        this.$store.commit('switchPlaylist', this.trackList);
      }
    },
    fetchTracks() {
      if (this.currentAlbum && !this.trackList) {
        this.$store.dispatch('fetchTracksForAlbum', this.currentAlbum);
      }
    },
  },
  watch: {
    currentAlbum() {
      this.fetchTracks();
    },
  },
  mounted() {
    this.fetchTracks();
  },
};
</script>

<style scoped>
th {
  text-align: center;
  border-bottom: 1px solid gray;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid gray;
}

.header {
  height: 60px;
  font-family: serif;
  font-size: 1.5em;
}
</style>
