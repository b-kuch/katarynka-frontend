<template>
<div class="volume-bar">
  <div class="volume"  :style="{'width' : volume * 100 + '%'}"/>
</div>
</template>

<script setup>

const props = defineProps<{volumeLevel: number}>();

let progress
</script>

<style scoped>

</style>