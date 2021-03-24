<template>
  <tr class="track-entry" :style="highlightStyle">
    <td class="album-title">
      {{ track.albumTitle }}
    </td>
    <td class="track-title">
      {{ track.title }}
    </td>
    <td class="file-size">{{ trackSizeMb }} MB</td>
    <td class="track-buttons">
      <img
        class="action-button left-btn"
        :src="playButtonIcon"
        :alt="playButtonDesc"
        @click="playTrack"
      />
      <img
        class="action-button"
        src="@/assets/add_playlist.svg"
        :style="playlistButtonStyle"
        :alt="playlistButtonDesc"
        @click="addToPlaylist"
      />
    </td>
  </tr>
</template>

<script>
const playImg = require('../assets/play-light.svg');
const pauseImg = require('../assets/pause-light.svg');

export default {
  props: {
    track: {
      type: Object,
    },
  },
  methods: {
    playTrack() {
      if (this.isSelected) {
        this.$store.commit('switchPlayingState', !this.isPaused);
      } else {
        this.$emit('trackchosen');
        this.$store.commit('switchTrack', this.track);
      }
    },
    addToPlaylist() {
      if (!this.isInRemotePlaylist) {
        this.$store.dispatch('addTrackToPlaylist', this.track);
      }
    },
  },
  computed: {
    trackSizeMb() {
      return (this.track.size / (1024 * 1024)).toFixed(2);
    },
    isSelected() {
      let currentTrack = this.$store.getters.currentlyPlayedTrack;
      if (!currentTrack) {
        return false;
      }
      return currentTrack === this.track;
    },
    isPaused() {
      return this.$store.state.musicPaused;
    },
    playButtonIcon() {
      return this.isSelected && !this.isPaused ? pauseImg : playImg;
    },
    playButtonDesc() {
      return this.isSelected && !this.isPaused ? 'Pause' : 'Play';
    },
    playlistButtonDesc() {
      return this.isInRemotePlaylist ? 'Track already in playlist' : 'Add to playlist';
    },
    playlistButtonStyle() {
      return {
        opacity: this.isInRemotePlaylist ? 0.3 : 1,
      };
    },
    highlightStyle() {
      if (this.isSelected) {
        return {
          backgroundColor: 'dodgerblue',
          color: 'white',
        };
      }
      return {
        backgroundColor: 'cornsilk',
        color: 'black',
      };
    },
    isInRemotePlaylist() {
      let t = this.track;
      return this.$store.getters.remotePlaylist.some(
        (track) => t.filename === track.filename && t.albumName === track.albumName,
      );
    },
  },
};
</script>

<style scoped>
.track-entry {
  background-color: cornsilk;
  border-bottom: 1px solid gray;
}

.album-title {
  font-family: sans-serif;
  font-size: 1.2em;
  text-align: start;
  padding-left: 5px;
}

.track-title {
  font-family: sans-serif;
  font-size: 1.2em;
  text-align: center;
}

.file-size {
  font-family: sans-serif;
  font-size: 1.2em;
  text-align: end;
  padding-right: 5px;
}

.track-buttons {
  width: 10%;
}

.action-button {
  width: 50%;
}

.track-buttons .action-button {
  visibility: hidden;
  background-color: bisque;
}

.track-buttons:hover .action-button {
  visibility: visible;
}

img {
  box-sizing: border-box;
  height: 60px;
  cursor: pointer;
  padding: 5px 3px 5px 7px;
  vertical-align: bottom;
}

.left-btn {
  border-right: 1px solid gray;
}

td {
  border-bottom: 1px solid gray;
  box-sizing: border-box;
}
</style>
