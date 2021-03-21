<template>
  <div id="app">
    <div id="covers-slider">
      <div class="cover" v-for="album in albums" :key="album">
        <album-cover :album="album"></album-cover>
      </div>
    </div>
    <div id="album-view">
      <album-view v-if="viewedAlbum"></album-view>
    </div>
    <div id="player-controls">
      <player-controls></player-controls>
    </div>
  </div>
</template>

<script>
import AlbumCover from './components/AlbumCover.vue';
import AlbumView from './components/AlbumView.vue';
import PlayerControls from './components/PlayerControls.vue';

export default {
  name: 'App',
  created() {
    this.$store.dispatch('fetchAlbums');
  },
  computed: {
    albums() {
      return this.$store.state.albums;
    },
    viewedAlbum() {
      return this.$store.state.viewedAlbum;
    },
  },
  components: {
    AlbumCover,
    AlbumView,
    PlayerControls,
  },
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
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
</style>
