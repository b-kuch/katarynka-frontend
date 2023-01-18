<template>
  <article>
    <div v-if="currentIndex === index || null ">
      <a>
        {{ song.song_name }} - {{ song.artist.name }}
      </a>
    </div>
    <div v-else>
      <a class="secondary">
        {{ song.song_name }} - {{ song.artist.name }}
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import {SongData} from "@/components/SongData";

const props = defineProps<{ song: SongData, index: number, currentIndex: number }>();
</script>

<style scoped>
</style>