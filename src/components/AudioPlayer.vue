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
      v-for="(song, idx) in songs"
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

let isPlaying = false;
let playButtonLabel = ref('Play');
let sounds = ref<Howl[]>([]);
let index = ref(0);

let songs = ref<SongData[]>([]);

let song_details = new URL("", "http://localhost/songs")
let trending_url = song_details + "/trending"


Howler.volume(0.1);


fetch(trending_url)
    .then(response => response.json())
    .then(data => data.songs)
    .then(data => data.map((json: { song_name: string; artist: Object; album: Object; filename: string; }) => new SongData(json)))
    .then(data => doStuff(data))
    .catch((e) => console.log(e))

function doStuff(songList: SongData[]) {
  // console.log(songs);
  sounds.value = songList.map(song => song.howl());
  songs.value = songList;
  index.value = 0;
}

function currentSound(): Howl {
  return sounds.value[index.value];
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
  index.value++;
  if (index.value >= songs.value.length || index.value <= 0) {
    index.value = 0;
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
  index.value--;
  if (index.value >= songs.value.length || index.value <= 0) {
    index.value = 0;
  }
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