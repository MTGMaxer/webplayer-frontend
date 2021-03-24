<template>
  <div id="app">
    <div id="sidebar">
      <img
        class="playlist-button"
        src="@/assets/show_playlist.svg"
        alt="Show playlist"
        @click="switchPlaylistView"
        :style="playlistButtonColor"
      />
    </div>
    <div id="content">
      <div id="covers-slider">
        <div class="cover" v-for="album in albums" :key="album">
          <album-cover
            :album="album"
            @coverchosen="playlistViewActive = false"
          ></album-cover>
        </div>
      </div>
      <keep-alive>
        <div id="album-view" :is="mainDisplay"></div>
      </keep-alive>
      <div id="player-controls">
        <player-controls></player-controls>
      </div>
    </div>
  </div>
</template>

<script>
import AlbumCover from './components/AlbumCover.vue';
import AlbumView from './components/AlbumView.vue';
import PlaylistView from './components/PlaylistView.vue';
import PlayerControls from './components/PlayerControls.vue';

export default {
  name: 'App',
  created() {
    this.$store.dispatch('fetchAlbums');
    this.$store.dispatch('fetchRemotePlaylist');
  },
  data() {
    return {
      playlistViewActive: false,
    };
  },
  computed: {
    mainDisplay() {
      return this.playlistViewActive ? 'PlaylistView' : 'AlbumView';
    },
    albums() {
      return this.$store.state.albums;
    },
    viewedAlbum() {
      return this.$store.state.viewedAlbum;
    },
    playlistButtonColor() {
      return this.playlistViewActive ? { backgroundColor: 'lightgray' } : {};
    },
  },
  watch: {
    viewedAlbum() {
      this.playlistViewActive = false;
    },
  },
  methods: {
    switchPlaylistView() {
      this.playlistViewActive = !this.playlistViewActive;
    },
  },

  components: {
    AlbumCover,
    AlbumView,
    PlaylistView,
    PlayerControls,
  },
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}

#app {
  display: flex;
}

#sidebar {
  width: 5%;
  background-color: whitesmoke;
}

#content {
  width: 95%;
}

#covers-slider {
  box-sizing: border-box;
  height: 175px;
  background-color: rosybrown;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  overflow-x: auto;
}

.cover {
  display: inline-block;
  margin: auto;
}

#album-view {
  overflow-y: scroll;
  height: calc(100vh - 175px - 200px);
}

#player-controls {
  width: 100%;
}

.playlist-button {
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
}

.playlist-button:hover {
  cursor: pointer;
}
</style>
