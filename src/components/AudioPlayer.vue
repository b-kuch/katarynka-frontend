<template>
    <div>
        <button id="shuffle-songs">shuffle</button>
        <button id="prev-song">prev</button>
        <button id="play-pause-song" v-on:click="playButtonAction">{{ playButtonLabel }}</button>
        <button id="next-song" v-on:click="nextSong">next</button>
        <button id="loop-song">loop</button>
    </div>
</template>

  
<script setup lang="ts">
import { ref } from 'vue';
import { Howl } from 'howler';

var sound: Howl;
var isPlaying = false;
var playButtonLabel = ref('Play');

var songs = [
    "http://localhost/stream/Here Comes A Big Black Cloud!! - Graverobbin.mp3",
    "http://localhost/stream/Jazz at Mladost Club - Arana.mp3"
]
var sounds = songs.map((song) => new Howl({
    src: song,
    html5: true
}));
var index = 0;

function playButtonAction() {
    isPlaying = !isPlaying;
    playButtonLabel.value = isPlaying ? "Pause" : "Play";
    playSong();
}
function playSong() {
    isPlaying ? sounds[index].play() : sounds[index].pause();
}

function nextSong() {
    sounds[index].pause();
    sounds[index].seek(0);
    isPlaying = false;
    index++;
    if (index >= songs.length || index <= 0) {
        index = 0;
    }
    playButtonAction();
}

</script>