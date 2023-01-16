<template>
  <PlayerControls
      @togglePlayPauseButton="playButtonAction"
      @previousButton="prevSong"
      @nextButton="nextSong"
      @shuffleButton="shuffleSongs"
      @loopButton="loopSong"/>
  <div v-if="soundsAvailable()">
    <ProgressBar :currentSound="currentSound()"/>
  </div>
  <Song
      v-for="(song, idx) in props.songs"
      :key="song.identifier"
      :song="song"
      :index="idx"
      :currentIndex="index"
  />

</template>


<script setup lang="ts">
import {ref} from 'vue';
import {Howl, Howler} from 'howler';
import {SongData} from "@/components/SongData";
import Song from "@/components/Song.vue";
import PlayerControls from "@/components/PlayerControls.vue";
import ProgressBar from "@/components/ProgressBar.vue";


const props = defineProps<{
      songs: SongData[],
    }>()
// let isPlaying = false;
let playButtonLabel = ref('Play');
let sounds = ref<Howl[]>([]);
let index = ref(0);

let songs = ref<SongData[]>([]);

Howler.volume(0.1);

function currentSound(): Howl {
  return props.songs[index.value].howl;
}
function isPlaying(): boolean {
  return currentSound().playing()
}
function playButtonAction() {
  playButtonLabel.value = isPlaying() ? "Pause" : "Play";
  playSong(currentSound());
}

function playSong(sound: Howl) {
  isPlaying() ?  sound.pause() : sound.play();
}

function nextSong() {
  rewindCurrent();
  index.value++;
  loopIndex()
  playButtonAction();
}

function rewindCurrent() {
  currentSound().pause();
  currentSound().seek(0);
}

function loopIndex() {
    if (index.value >= props.songs.length || index.value <= 0) {
    index.value = 0;
  }
}

function prevSong() {
  rewindCurrent();
  index.value--;
  loopIndex()
  playButtonAction();
}

function shuffleSongs() {
}

function loopSong() {
}

function soundsAvailable() {
  return sounds.value.length != 0;
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