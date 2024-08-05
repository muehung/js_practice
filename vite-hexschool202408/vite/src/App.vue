<script setup>
import { ref } from 'vue';
  const num = ref(1);

  console.log(num.value);
  function addOnce(){
      num.value ++
  }
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      {{ num }}
      <button type="button" v-on:click="addOnce">Click</button>
    </div>
  </header>

  <main>
    
  </main>
</template>

<style scoped>
</style>
