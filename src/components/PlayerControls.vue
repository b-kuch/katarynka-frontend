<template>
  <div class="controls">
    <button class="playerBtn fa fa-arrow-left" id="prev-song"
            @click="emit('previousButton')"/>
    <button :class="'playerBtn fa ' + playButtonIconClass()" id="play-pause-song"
            @click="emit('togglePlayPauseButton')"/>
    <button class="playerBtn fa fa-arrow-right" id="next-song"
            @click="emit('nextButton')"/>
 </div>
</template>

<script setup lang="ts">

const props = defineProps<{ isPlaying: boolean }>()
const emit = defineEmits([
    "previousButton",
    "togglePlayPauseButton",
    "nextButton",
]);


function playButtonIconClass() {
  return props.isPlaying ? 'fa-pause' : 'fa-play'
}
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  /*align-content: flex-start;*/
  width: 30vw;
}
.playerBtn {
  background: none;
  border: none;
  color: var(--color-text);
  width: 4em;
}
.playerBtn:hover {
  color: green;
  border-color: green;
}
</style>