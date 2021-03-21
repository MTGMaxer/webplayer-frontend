<template>
  <div id="app">
    <div id="covers-slider">
      <div class="cover" v-for="album in albums" :key="album">
        <album-cover :album="album"></album-cover>
      </div>
    </div>
    <div id="album-view">
      <album-view v-if="selectedAlbum"></album-view>
    </div>
  </div>
</template>

<script>
import AlbumCover from './components/AlbumCover.vue';
import AlbumView from './components/AlbumView.vue';

export default {
  name: 'App',
  created() {
    this.$store.dispatch('fetchAlbums');
  },
  computed: {
    albums() {
      return this.$store.state.albums;
    },
    selectedAlbum() {
      return this.$store.state.currentAlbum;
    },
  },
  components: {
    AlbumCover,
    AlbumView,
  },
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}

#covers-slider {
  background-color: rosybrown;
  padding: 10px;
  display: flex;
  justify-content: space-around;
}

.cover {
  display: inline-block;
}

#album-view {
  background-color: lightgray;
}
</style>
