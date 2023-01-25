<template>
  <article>
    <div v-if="currentIndex === index || null ">
      <a class="highlight">
        {{ song.song_name }} - {{ song.artist.name }}
      </a>
    </div>
    <div v-else>
      <a>
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
.highlight {
  color: var(--color-heading);
}
</style>