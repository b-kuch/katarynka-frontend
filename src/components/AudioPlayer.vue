<template>
    <div>
        <button id="shuffle-songs">shuffle</button>
        <button id="prev-song">prev</button>
        <button id="play-pause-song" v-on:click="playSong">{{ playButtonLabel }}</button>
        <button id="next-song">next</button>
        <button id="loop-song">loop</button>
    </div>
</template>

  
<script setup lang="ts">
import { ref } from 'vue';
import { Howl } from 'howler';

var sound: Howl;
var isPlaying = false;
var playButtonLabel = ref('Play');

sound = new Howl({
    src: ["http://localhost/stream/Here Comes A Big Black Cloud!! - Graverobbin.mp3"],
    html5: true
});
function playSong() {
    isPlaying = !isPlaying;
    isPlaying ? sound.play() : sound.pause();
    playButtonLabel.value = isPlaying ? "Pause" : "Play";
}


</script>