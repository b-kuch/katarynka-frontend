<template>
  <div id="controls">
    <button class="playerBtn fa fa-random" id="shuffle-songs"
            @click="emit('shuffleButton')"/>
    <button class="playerBtn fa fa-arrow-left" id="prev-song"
            @click="emit('previousButton')"/>
    <button :class="'playerBtn fa ' + playButtonIconClass()" id="play-pause-song"
            @click="emit('togglePlayPauseButton')"/>
    <button class="playerBtn fa fa-arrow-right" id="next-song"
            @click="emit('nextButton')"/>
    <button class="playerBtn fa fa-circle" id="loop-song"
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

</style>