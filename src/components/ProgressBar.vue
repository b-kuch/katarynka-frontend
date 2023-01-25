<template>
  <div class="progress-bar">
      <label for="progress">{{ formatSeconds(progress*duration*0.01) }}</label>
      <input
          v-model.number="progress"
          @input="emit('seek', $event.currentTarget.value)"
          type="range"
          min="0"
          :max="100"
          id="range"
          class="progress-bar"
          name="progress"
      />
      <label for="progress">{{ formatSeconds(duration) }}</label>
</div>
</template>

<script setup lang="ts">
const emit = defineEmits(['seek'])
const props = defineProps<{progress: number, duration: number }>();

function formatSeconds(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  let minutesLabel = Math.round(minutes).toString();
  let remainingSecondsLabel = Math.round(remainingSeconds).toString().padStart(2, "0");

  return `${minutesLabel}:${remainingSecondsLabel}`;
}
</script>

<style scoped>

.progress-bar {
  display: flex;
  flex-direction: row;
  width: 60vw;
  margin-left: 1em;
  margin-right: 1em;
}
</style>