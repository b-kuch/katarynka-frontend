<script setup lang="ts">
import AudioPlayer from "./components/AudioPlayer.vue";

</script>

<template>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <suspense>
    <AudioPlayer/>
  </suspense>


</template>

<style scoped>


</style>
