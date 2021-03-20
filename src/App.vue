<template>
  <div id="app">
    {{ $store.state.albums }}
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  created() {
    this.$store.dispatch('fetchAlbums');
  },
};
</script>

<style>

</style>
