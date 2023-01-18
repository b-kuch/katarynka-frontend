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
import {Howl} from "howler";

const props = defineProps<{ sound: Howl }>()
const emit = defineEmits([
    "shuffleButton",
    "previousButton",
    "togglePlayPauseButton",
    "nextButton",
    "loopButton",
]);


function playButtonIconClass() {
  return props.sound.playing() ? 'fa-pause' : 'fa-play'
}
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
}

.playerBtn:hover {
  color: green;
  border-color: green;
}
</style>