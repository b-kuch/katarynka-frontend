<template>
 <div>
    <div class="progress-bar">
      <div class="progress" ref="progress" @click="seek"></div>
    </div>
  </div>

</template>

<script setup lang="ts">
const props = defineProps<{song: Howl}>();


</script>

<style scoped>
.progress-bar {
  width: 50%;
  height: 20px;
  background-color: lightgray;
  position: relative;
}

.progress {
  height: 100%;
  background-color: blue;
  position: absolute;
  top: 0;
  left: 0;
}
</style>