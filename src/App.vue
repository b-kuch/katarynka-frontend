<script setup lang="ts">
import AudioPlayer from "./components/AudioPlayer.vue";
import {SongData} from "@/components/SongData";
import {onMounted, ref} from "vue";


let song_details = new URL("", "http://localhost/songs")
let trending_url = song_details + "/trending"
let songs = ref()
async function fetch_songs() {
  return await fetch(trending_url)
      .then(response => response.json())
      .then(data => data.songs)
      .then(data => data.map((json) => new SongData(json)))
      .then(data => {return data})
      .catch((e) => console.log(e))
}

fetch_songs().then(data => songs.value = data);
console.log(songs)
</script>

<template>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
      <AudioPlayer
      :songs="songs"/>

</template>

<style scoped>


</style>
