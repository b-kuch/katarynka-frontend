<template>
<div>
    <div v-for="song in songs" :key="song.identifier">
      <p>{{ song.song_name }} - {{ song.artist.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {Song} from "@/components/Song";

let songs = ref<Song[]>();

let song_storage = new URL("", "http://localhost/stream")
let song_details = new URL("", "http://localhost/songs")

let trending_url = song_details + "/trending"


fetch(trending_url)
    .then(response => response.json())
    .then(data => data.songs)
    .then(data => data.map(json => new Song(json)))
    .then(data => {
      songs.value = data;
    })
    .catch((e) => console.log(e))
</script>

<style scoped>

</style>