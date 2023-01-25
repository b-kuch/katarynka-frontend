<template>
  <main class="container">
    <div class="songs">
      <Song
          v-for="(song, idx) in songs"
          :key="song.identifier"
          :song="song"
          :index="idx"
          :selected="idx===index"
          :currentIndex="index"
      />
    </div>
    <img
        class="cover"
        src="@/assets/cover.png"
        alt="">
    <div class="player">
      <ProgressBar class="progress" :progress="progress" :duration="currentSound().duration()" @seek="seekMoment"/>
      <PlayerControls
          class="controls"
          @togglePlayPauseButton="playButtonAction"
          @previousButton="prevSong"
          @nextButton="nextSong"
          @shuffleButton="shuffleSongs"
          @loopButton="loopSong"
          :isPlaying="isPlaying"/>
      <VolumeControlBar
          class="volume"
          :volumeLevel="volumeLevel*100"
          @changeVolume="changeVolume"/>
    </div>

  </main>
</template>


<script setup lang="ts">
import {ref} from 'vue';
import {Howl, Howler} from 'howler';
import {SongData} from "@/components/SongData";
import Song from "@/components/Song.vue";
import PlayerControls from "@/components/PlayerControls.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import VolumeControlBar from "@/components/VolumeControlBar.vue";

let song_details = new URL("", "http://localhost/songs")
let trending_url = song_details + "/trending"
let songs: SongData[] = await fetch_songs()
let progress = 0;
let isPlaying = false;

function onSongEnd() {
  nextSong();
}

function parseSongData(songsJSON: any[]) {
  let songs = songsJSON.map(song => new SongData(song));
  songs.forEach(song => {
    let howl = song.howl
    howl.on("end", () => onSongEnd)

    howl.on('play', () => {
      const interval = setInterval(() => {
        progress = howl.seek() / howl.duration();
      }, 1000);
      howl.on('end', () => {
        clearInterval(interval);
      });
    });
  })
  return songs;
}

async function fetch_songs(): Promise<SongData[]> {
  return fetch(trending_url)
      .then(response => response.json())
      .then(data => data.songs)
      .then(data => parseSongData(data))
      .then(data => {
        return data
      })
}

let index = ref(0);
let volumeLevel = 0.1;

Howler.volume(volumeLevel);

function currentSound(): Howl {
  let s = songs[index.value];
  return s.howl;
}

function playButtonAction() {
  playSong(currentSound());
}

function playSong(sound: Howl) {
  if (sound.playing()) {
    sound.pause();
    isPlaying = false;
  } else {
    sound.play();
    isPlaying = true;
  }
}

function changeVolume(v: number) {
  Howler.volume(v / 100)
}

function nextSong() {
  rewindCurrent();
  index.value++;
  loopIndex();
  playSong(currentSound());
}

function rewindCurrent() {
  currentSound().pause();
  currentSound().seek(0);
}

function loopIndex() {
  if (index.value >= songs.length || index.value <= 0) {
    index.value = 0;
  }
}

function prevSong() {
  rewindCurrent();
  index.value--;
  loopIndex()
  playButtonAction();
}

function seekMoment(moment: number) {
  progress = moment;
  currentSound().seek(currentSound().duration() * (moment / 100))
}

function shuffleSongs() {
}

function loopSong() {
}

</script>


<style>

</style>
<style scoped>
main.container {
  width: 95vw;
  height: 95vh;
  display: grid;
  grid-template:
          "songs cover" 1fr
          "player player" 10%
          /20% 1fr;
  justify-items: center;
  align-items: center;
}

.songs {
  margin-bottom: auto;
  grid-area: songs;
}

.cover {
  grid-area: cover;
  height: 75vh;
}

.player {
  border: #181818 1px solid;
  grid-area: player;
  display: grid;
  grid-template:
              "controls volume" 1fr
              "progress volume" 1fr
              /8fr 2fr;
  background-color: var(--color-background-soft);
  border-radius: 1em 1em 0 0;
  height: 15vh;

  justify-items: center;
  align-items: center;
}

.controls {
  grid-area: controls;
}

.progress {
  grid-area: progress;
}

.volume {
  grid-area: volume;
}

</style>