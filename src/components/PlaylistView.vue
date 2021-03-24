<template>
  <div>
    <table>
      <tr>
        <th></th>
        <th class="header">Playlist downloaded from server</th>
        <th></th>
        <th></th>
      </tr>
      <track-entry
        v-for="track in playlist"
        :key="'P' + track.index"
        :track="track"
        @trackchosen="switchPlaylist"
      ></track-entry>
    </table>
  </div>
</template>

<script>
import TrackEntry from './TrackEntry.vue';

export default {
  computed: {
    playlist() {
      return this.$store.getters.remotePlaylist;
    },
  },
  components: {
    TrackEntry,
  },
  methods: {
    switchPlaylist() {
      if (this.$store.state.currentPlaylist !== this.playlist) {
        this.$store.commit('switchPlaylist', this.playlist);
      }
    },
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
