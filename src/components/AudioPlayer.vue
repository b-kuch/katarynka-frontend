<template>
    <div>
        <button id="play-pause-song" v-on:click="playSong">play</button>
        <button id="next-song">next</button>
    </div>
</template>

  
<script setup lang="ts">
import { Howl } from 'howler';
// const player = document.getElementById("audio-player");
// const button = document.getElementById("start-stream-button") as HTMLButtonElement;

function playSong() {
    var sound: Howl;
    let request = new XMLHttpRequest();

    request.open("GET", "http://localhost:8000/audio/Here Comes A Big Black Cloud!! - Graverobbin.mp3", true);
    request.responseType = "blob";
    request.onload = () => {
        console.log(request)
        var howlSource = URL.createObjectURL(request.response)
        sound = new Howl({
            src: ["http://localhost:8000/audio/Here Comes A Big Black Cloud!! - Graverobbin.mp3"],
            html5: true
        });
        sound.play()
    };

    request.send();
}


</script>