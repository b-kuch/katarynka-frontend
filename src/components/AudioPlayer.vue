<template>
  <div id="controls">
    <button class="playerBtn fa fa-random" id="shuffle-songs"/>
    <button class="playerBtn fa fa-arrow-left" id="prev-song" @click="prevSong"/>
    <button class="playerBtn fa fa-play" id="play-pause-song" @click="playButtonAction"/>
    <button class="playerBtn fa fa-arrow-right" id="next-song" @click="nextSong"/>
    <button class="playerBtn fa fa-circle" id="loop-song"/>
  </div>
  <Song
      v-for="song in songs"
      :key="song.identifier"
  />
</template>


<script setup lang="ts">
import {ref} from 'vue';
import {Howl, Howler} from 'howler';
import {SongData} from "@/components/SongData";

let isPlaying = false;
let playButtonLabel = ref('Play');
let sounds: Howl[];
let index = 0;

let songs = ref<SongData[]>();

let song_details = new URL("", "http://localhost/songs")
let trending_url = song_details + "/trending"


Howler.volume(0.1);


fetch(trending_url)
    .then(response => response.json())
    .then(data => data.songs)
    .then(data => data.map((json: { song_name: string; artist: Object; album: Object; filename: string; }) => new SongData(json)))
    .then(data => doshit(data))
    .catch((e) => console.log(e))

function doshit(songList: SongData[]) {
  // console.log(songs);
  sounds = songList.map(song => song.howl());
  songs.value = songList;
  index = 0;
}

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
  if (index >= songs.value.length || index <= 0) {
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
  if (index >= songs.value.length || index <= 0) {
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

#controls {
  width: 100%;
  height: 8%;
  background-color: #222222;
}
</style>