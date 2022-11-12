<template>
    <div>
        <button id="shuffle-songs">shuffle</button>
        <button id="prev-song" @click="prevSong">prev</button>
        <button id="play-pause-song" @click="playButtonAction">{{ playButtonLabel }}</button>
        <button id="next-song" @click="nextSong">next</button>
        <button id="loop-song">loop</button>
    </div>
</template>

  
<script setup lang="ts">
import { ref } from 'vue';
import { Howl, Howler } from 'howler';

Howler.volume(0.1);

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

function currentSound(): Howl {
    return sounds[index];
}

function playButtonAction() {
    isPlaying = !isPlaying;
    playButtonLabel.value = isPlaying ? "Pause" : "Play";
    playSong();
}
function playSong() {
    isPlaying ? currentSound().play() : currentSound().pause();
}

function nextSong() {
    rewindCurrent();
    index++;
    if (index >= songs.length || index <= 0) {
        index = 0;
    }
    playButtonAction();
}

function rewindCurrent() {
    currentSound().pause();
    currentSound().seek(0);
    isPlaying = false;
}
function prevSong() {
    rewindCurrent();
    index--;
    if (index >= songs.length || index <= 0) {
        index = 0;
    }
    playButtonAction();
}
</script>