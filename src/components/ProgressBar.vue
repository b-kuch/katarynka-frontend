<template>
  <div>
    <form>
      <input class="progress-bar" @input="seek"
             type="range" min="0" :max="currentSound.duration()" id="range" v-model="progress" name="range">
    </form>
  </div>

</template>

<script setup lang="ts">
import {Howl} from "howler";
import {ref} from "vue";

const props = defineProps<{ currentSound: Howl}>();
let progress = ref(0)

props.currentSound.on('play', () => {
  const interval = setInterval(() => {
    progress.value = props.currentSound.seek() / props.currentSound.duration();
  }, 1000);
  props.currentSound.on('end', () => {
    clearInterval(interval);
  });
});

function seek(event) {
  const progressEl = event.currentTarget;
  const newX = progressEl.value;
  try {
    props.currentSound.seek(newX);
    progress.value = newX;
  } catch (e) {
    if (e instanceof TypeError) {
      console.log(x, percent, props.currentSound, newX)
    } else {
      throw e;
    }
  }
}

</script>

<style scoped>
</style>