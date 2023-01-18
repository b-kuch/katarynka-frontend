<template>
  <div class="volume-bar">
    <form>
      <input type="range" min="0" :max="100" id="volume" name="volume" value="volumeLevel" @input="changeVolume">
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{ volumeLevel: Number }>();
const emit = defineEmits(["changeVolume"])

function changeVolume(event) {
  const progressEl = event.currentTarget;
  const newVolume = progressEl.value;

  console.log(newVolume)
  emit('changeVolume', newVolume);
}

// volume.value.on("change", () => )
</script>

<style scoped>

</style>