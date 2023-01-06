<template>
    <div id="controls">
        <button class="playerBtn fa fa-random" id="shuffle-songs"/>
        <button class="playerBtn fa fa-arrow-left" id="prev-song" @click="prevSong"/>
        <button class="playerBtn fa fa-play" id="play-pause-song" @click="playButtonAction"/>
        <button class="playerBtn fa fa-arrow-right" id="next-song" @click="nextSong"/>
        <button class="playerBtn fa fa-circle" id="loop-song"/>
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

<style>
.playerBtn {
  background: none;
  border: none;
  color: darkgreen;
  width: 4em;
}

.playerBtn:hover {
  color: green;
}

#controls{
  width:100%;
  height: 8%;
  background-color: #222222;
}
</style>