<template>
  <div class="control-container">
    <div class="leftside">
      <span v-if="currentTrack">{{ currentTrack.albumTitle }}</span>
      <br />
      <span v-if="currentTrack">{{ currentTrack.title }}</span>
    </div>
    <div class="center">
      <audio ref="player">
        <source ref="audiosrc" src="" type="audio/mpeg" />
      </audio>
      <div class="controls">
        <img
          class="sidebtn"
          src="@/assets/skip_previous.svg"
          alt="Previous track"
          @click="previousTrack"
        />
        <img
          class="mainbtn"
          :src="buttonImage"
          :alt="buttonAction"
          @click="changePlayingState"
        />
        <img
          class="sidebtn"
          src="@/assets/skip_next.svg"
          alt="Next track"
          @click="nextTrack"
        />
      </div>
    </div>
    <div class="rightside"></div>
  </div>
</template>

<script>
const playImage = require('../assets/play.svg');
const pauseImage = require('../assets/pause.svg');

export default {
  methods: {
    changePlayingState() {
      if (this.currentTrack) {
        this.$store.commit('switchPlayingState', !this.musicPaused);
      }
    },
    previousTrack() {
      this.$store.commit('goBackwards');
    },
    nextTrack() {
      this.$store.commit('goForward');
    },
  },
  computed: {
    buttonImage() {
      return this.musicPaused ? playImage : pauseImage;
    },
    buttonAction() {
      return this.musicPaused ? 'Play' : 'Pause';
    },
    currentTrack() {
      return this.$store.getters.currentlyPlayedTrack;
    },
    musicPaused() {
      return this.$store.state.musicPaused;
    },
    trackUrl() {
      return this.currentTrack
        ? `http://localhost:3000/media/albums/${this.currentTrack.albumName}/${this.currentTrack.filename}`
        : '';
    },
    maximumPlaylistTrackIndex() {
      return this.$store.getters.maximumTrackIndex;
    },
    minimumPlaylistTrackIndex() {
      return this.$store.getters.minimumTrackIndex;
    },
  },
  watch: {
    musicPaused(paused) {
      if (paused) {
        this.$refs.player.pause();
      } else {
        this.$refs.player.play();
      }
    },
    currentTrack() {
      this.$refs.audiosrc.src = this.trackUrl;
      this.$refs.player.load();
      this.$refs.player.play();
      this.$store.commit('switchPlayingState', false);
    },
  },
};
</script>

<style scoped>
.control-container {
  height: 200px;
  background-color: navy;
  display: flex;
}

.leftside {
  color: white;
  width: 30%;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

span {
  font-family: sans-serif;
  font-size: 1.2em;
  margin-left: 20px;
}

.rightside {
  width: 30%;
}

.center {
  width: 40%;
}

.controls {
  margin: auto;
  width: 30%;
  display: flex;
  justify-content: space-around;
  height: 200px;
}

audio {
  display: none;
}

img {
  cursor: pointer;
}

.mainbtn {
  height: 170px;
  margin: auto;
}

.sidebtn {
  height: 120px;
  margin: auto;
}
</style>
