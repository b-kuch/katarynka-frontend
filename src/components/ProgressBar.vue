<template>
 <div>
    <div class="progress-bar" @click="seek">
      <div class="progress" ref="progress"  :style="{'width' : progress * 100 + '%'}"/>
    </div>
  </div>

</template>

<script setup lang="ts">
import {Howl} from "howler";
import {ref} from "vue";

const props = defineProps<{currentSound: Howl}>();
let progress = ref(0)

props.currentSound.on('play', () => {
        const interval = setInterval(() => {
          progress.value = props.currentSound.seek() / props.currentSound.duration();
        }, 1000);
        props.currentSound.on('end', () => {
          clearInterval(interval);
        });
      });

function seek(e) {
      const progressEl = e.currentTarget;
      const x = e.clientX - progressEl.getBoundingClientRect().left;
      const percent = x / progressEl.clientWidth;
      const newX = Math.round(percent * props.currentSound.duration());
      props.currentSound.seek(newX);
    }

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