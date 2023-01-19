<template>
  <div>
<!--    <form>-->
      <label for="progress">{{ formatSeconds(progress) }}</label>
      <input
          v-model.lazy="progress"
          @input="seek"
          type="range"
          min="0"
          :max="100"
          id="range"
          class="progress-bar"
          name="progress"
      />
      <label for="progress">{{ formatSeconds(currentSound.duration()) }}</label>
<!--    </form>-->
  </div>

</template>

<script setup lang="ts">
import {Howl} from "howler";
import {ref} from "vue";

const props = defineProps<{ currentSound: Howl }>();
let progress = 0

props.currentSound.on('play', () => {
  const interval = setInterval(() => {
    progress = props.currentSound.seek() / props.currentSound.duration();
  }, 1000);
  props.currentSound.on('end', () => {
    clearInterval(interval);
  });
});

function seek(event: Event) {
  const newProgress = event.currentTarget.value;
  try {
    progress = newProgress;
    props.currentSound.seek( props.currentSound.duration() * (progress / 100) )
  } catch (e) {
    if (e instanceof TypeError) {
      console.log(props.currentSound, newProgress)
    } else {
      throw e;
    }
  }
}


function formatSeconds(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  minutes = minutes.toString();
  remainingSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}
</script>

<style scoped>
</style>