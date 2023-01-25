<template>
  <div class="controls">
    <button class="playerBtn fa fa-random contrast outline" id="shuffle-songs"
            @click="emit('shuffleButton')"/>
    <button class="playerBtn fa fa-arrow-left contrast outline" id="prev-song"
            @click="emit('previousButton')"/>
    <button :class="'playerBtn fa  contrast outline ' + playButtonIconClass()" id="play-pause-song"
            @click="emit('togglePlayPauseButton')"/>
    <button class="playerBtn fa fa-arrow-right contrast outline" id="next-song"
            @click="emit('nextButton')"/>
    <button class="playerBtn fa fa-circle contrast outline" id="loop-song"
            @click="emit('loopButton')"/>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{ isPlaying: boolean }>()
const emit = defineEmits([
    "shuffleButton",
    "previousButton",
    "togglePlayPauseButton",
    "nextButton",
    "loopButton",
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