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
      <div class="progress">
        <input
          type="range"
          class="progressbar"
          min="0"
          :max="Math.trunc(trackDuration)"
          @input="changeTimestamp"
          :value="timeElapsed"
        />
      </div>
    </div>
    <div class="rightside">
      <span v-if="currentTrack">{{ durationDisplay }}</span>
    </div>
  </div>
</template>

<script>
const playImage = require('../assets/play.svg');
const pauseImage = require('../assets/pause.svg');

export default {
  data() {
    return {
      trackDuration: 0,
      timeElapsed: 0,
    };
  },
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
    changeTimestamp(e) {
      this.$refs.player.currentTime = e.target.value;
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
    encodedAlbum() {
      return encodeURIComponent(this.currentTrack.albumName);
    },
    encodedTrack() {
      return encodeURIComponent(this.currentTrack.filename);
    },
    trackUrl() {
      return this.currentTrack
        ? `http://localhost:3000/media/albums/${this.encodedAlbum}/${this.encodedTrack}`
        : '';
    },
    maximumPlaylistTrackIndex() {
      return this.$store.getters.maximumTrackIndex;
    },
    minimumPlaylistTrackIndex() {
      return this.$store.getters.minimumTrackIndex;
    },
    durationDisplay() {
      function timeString(secs) {
        function leadingZero(time) {
          return `0${time.toString()}`.substr(-2);
        }
        return `${leadingZero(Math.floor(secs / 60))}:${leadingZero(secs % 60)}`;
      }
      return `${timeString(Math.trunc(this.timeElapsed))}/${timeString(
        Math.trunc(this.trackDuration),
      )}`;
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
    currentTrack(newT, oldT) {
      if ((!oldT && newT) || newT.filename !== oldT.filename || newT.albumName !== oldT.albumName) {
        this.$refs.audiosrc.src = this.trackUrl;
        this.$refs.player.load();
      }
    },
    timeElapsed(value) {
      // TODO check if works (after fixing progress bar)
      if (value === this.trackDuration) {
        this.$store.commit('goForward');
      }
    },
  },
  mounted() {
    this.$refs.player.addEventListener('timeupdate', (e) => {
      this.timeElapsed = e.target.currentTime;
    });
    this.$refs.player.addEventListener('loadedmetadata', (e) => {
      e.target.play();
      this.trackDuration = e.target.duration;
      this.$store.commit('switchPlayingState', false);
    });
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
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 2.4em;
}

.center {
  width: 40%;
}

.controls {
  margin: auto;
  width: 30%;
  display: flex;
  justify-content: space-around;
  height: 170px;
}

.progress {
  height: 30px;
  text-align: center;
}

.progressbar {
  width: 100%;
  appearance: none;
  background-color: cornflowerblue;
}

.progressbar::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  background-color: blue;
  cursor: pointer;
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
