<template>
  <div>
    <form>
      <input class="volume-bar" type="range" min="0" :max="100" id="volume" name="volume" v-model="volumeLevel" @input="changeVolume">
    </form>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{ volumeLevel: Number }>();
const emit = defineEmits(["changeVolume"])
let volumeLevel = props.volumeLevel;

function changeVolume(event) {
  const newVolume = event.currentTarget.value;
  emit('changeVolume', newVolume);
}

</script>

<style scoped>
.volume-bar {
  width: 8vw;
}
</style>