<template>
  <div class="track-entry">
    <span>{{ track.albumTitle }}</span>
    <span>{{ track.title }}</span>
    <span>{{ track.size }}</span>
  </div>
</template>

<script>
export default {
  props: {
    track: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.track-entry {
  height: 60px;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
}
</style>
