<template>
  <div class="track-entry" :style="highlightStyle">
    <div class="track-data">
      <span class="album-title">{{ track.albumTitle }}</span>
      <span class="track-title">{{ track.title }}</span>
      <span class="file-size">{{ trackSizeMb }} MB</span>
    </div>
    <div class="track-button">
      <img
        class="action-button"
        :src="buttonIcon"
        :alt="buttonDesc"
        @click="playTrack"
      />
    </div>
  </div>
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
    buttonIcon() {
      return this.isSelected && !this.isPaused ? pauseImg : playImg;
    },
    buttonDesc() {
      return this.isSelected && !this.isPaused ? 'Pause' : 'Play';
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
  },
};
</script>

<style scoped>
.track-entry {
  background-color: cornsilk;
  display: flex;
  border-bottom: 1px solid gray;
  height: 60px;
}

.track-data {
  height: 60px;
  display: flex;
  justify-content: space-between;
  width: 95%;
  padding-left: 5px;
  padding-right: 5px;
}

.album-title {
  font-family: sans-serif;
  font-size: 1.2em;
  margin-top: auto;
  margin-bottom: auto;
}

.track-title {
  font-family: sans-serif;
  font-size: 1.2em;
  margin-top: auto;
  margin-bottom: auto;
}

.file-size {
  font-family: sans-serif;
  font-size: 1.2em;
  margin-top: auto;
  margin-bottom: auto;
}

.track-button {
  width: 5%;
  height: 100%;
}

.action-button {
  width: 100%;
}

.track-button .action-button {
  visibility: hidden;
  background-color: bisque;
}

.track-button:hover .action-button {
  visibility: visible;
}

img {
  box-sizing: border-box;
  height: 60px;
  cursor: pointer;
  padding: 5px 3px 5px 7px;
}
</style>
