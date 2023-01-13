<template>
<div>
    <div>
      <p>{{ song.song_name }} - {{ song.artist.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {SongData} from "@/components/SongData";

const props = defineProps<SongData>();
</script>

<style scoped>

</style>