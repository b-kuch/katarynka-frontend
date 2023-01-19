<template>
  <main class="container-fluid">
    <nav>

  <VolumeControlBar
      :volumeLevel="volumeLevel"
      @changeVolume="(v) => Howler.volume(v/100)"/>
      <PlayerControls
          @togglePlayPauseButton="playButtonAction"
          @previousButton="prevSong"
          @nextButton="nextSong"
          @shuffleButton="shuffleSongs"
          @loopButton="loopSong"
          :sound="currentSound()"/>
      <ProgressBar :currentSound="currentSound()"/>
    </nav>
    <Song
        v-for="(song, idx) in songs"
        :key="song.identifier"
        :song="song"
        :index="idx"
        :currentIndex="index"
    />
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
let songs : SongData[] = await fetch_songs()

function onSongEnd() {
  nextSong();
}

function parseSongData(songsJSON: any[]) {
  let songs = songsJSON.map(song => new SongData(song));
  songs.forEach(song => {
    song.howl.on("end", () => onSongEnd)
  })
  return songs;
}

async function fetch_songs() {
  return await fetch(trending_url)
      .then(response => response.json())
      .then(data => data.songs)
      .then(data => parseSongData(data))
      .then(data => {
        return data
      })
      .catch((e) => console.log(e))
}

let index = ref(0);
let volumeLevel = 0.1
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
    sound.pause()
  } else {
    sound.play();
  }
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

function shuffleSongs() {
}

function loopSong() {
}

</script>

<style>
/*.playerBtn {*/
/*  background: none;*/
/*  border: none;*/
/*  color: darkgreen;*/
/*  width: 4em;*/
/*}*/


/*#controls {*/
/*  width: 100%;*/
/*  height: 8%;*/
/*  background-color: #222222;*/
/*}*/
</style>