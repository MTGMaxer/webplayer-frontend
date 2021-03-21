<template>
  <div class="cover-container">
    <img :src="coverUrl" :alt="album" :title="album" @click="changeAlbum" />
  </div>
</template>

<script>
export default {
  props: {
    album: {
      type: String,
    },
  },
  computed: {
    coverUrl() {
      return `http://localhost:3000/media/albums/${this.album}/cover.jpg`;
    },
  },
  methods: {
    changeAlbum() {
      this.$store.commit('setViewedAlbum', this.album);
    },
  },
};
</script>

<style scoped>
.cover-container {
  display: inline-block;
  height: 150px;
  widows: 150px;
  cursor: pointer;
}

img {
  max-height: 150px;
  max-width: 150px;
}
</style>
