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
      <ProgressBar
          class="progress"
          :progress="progress"
          :duration="currentSound.duration()"
          @seek="seekMoment"/>
      <PlayerControls
          class="controls"
          @togglePlayPauseButton="playButtonAction"
          @previousButton="prevSong"
          @nextButton="nextSong"
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
let progress = ref(0);
let isPlaying = ref(false);
let index = ref(0);
let volumeLevel = 0.1;
let currentSound = ref(songs[index.value].getHowl());

function onSongEnd() {
  nextSong();
}

function parseSongData(songsJSON: any[]) {
  return songsJSON.map(song => new SongData(song));
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


Howler.volume(volumeLevel);

function playButtonAction() {
  playSong(currentSound.value);
}

function playSong(sound: Howl) {
  function getSongInterval() {
    return setInterval(() => {
      progress.value = 100 * sound.seek() / sound.duration();
    }, 1000);
  }

  if (sound.playing()) {
    sound.pause();
    isPlaying.value = false;
  } else {
    sound.play();
    isPlaying.value = true;

    sound.on('play', () => {
      let interval = getSongInterval();
      console.log("createdInterval");
      sound.on('pause', () => {
        clearInterval(interval);
        console.log("interval onpause");
      });
      // sound.on('end', () => {
      //   clearInterval(interval);
      //   console.log("clearedInterval");
      // });
      sound.on('seek', () => {
        clearInterval(interval);
        console.log("interval onseek");
        interval = getSongInterval()
      })
    });
    sound.on("end", () => onSongEnd)

  }
}

function changeVolume(v: number) {
  Howler.volume(v / 100)
}

function nextSong() {
  rewindCurrent();
  index.value++;
  loopIndex();
  currentSound.value = songs[index.value].getHowl();
  playSong(currentSound.value);
}

function rewindCurrent() {
  currentSound.value.pause();
  // currentSound.value.seek(0);
  progress.value = 0;
}

function loopIndex() {
  if (index.value >= songs.length || index.value <= 0) {
    index.value = 0;
  }
}

function prevSong() {
  rewindCurrent();
  index.value--;
  currentSound.value = songs[index.value].getHowl();
  loopIndex()
  playButtonAction();
}

function seekMoment(moment: number) {
  let sound = currentSound.value;
  console.log("Seeked value:", moment, "%")
  console.log("Full duration :", sound.duration())
  console.log("Current:", sound.duration() * (moment / 100))

  sound.seek(sound.duration() * (moment / 100))
}

</script>

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