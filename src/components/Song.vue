<template>
<div>
    <div :class="currentIndex === index && 'selected'">
      <p>{{ song.song_name }} - {{ song.artist.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {SongData} from "@/components/SongData";

const props = defineProps<{song: SongData, index: number, currentIndex: number}>();
</script>

<style scoped>
.selected {
  color:red;
}
</style>