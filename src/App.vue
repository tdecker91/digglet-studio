<script setup lang="ts">
  import DiggletStudio from './components/DiggletStudio.vue';
</script>

<template>
  <DiggletStudio />
</template>

<style>
  @font-face {
    font-family: digg;
    src: url('assets/digg.ttf');
  }

  :root {
    font-family: 'digg', sans-serif;
    text-transform: lowercase;
  }

  h1, h2, h3, h4, h5, h6, p, span, button, input, label {
    text-transform: lowercase;
  }
</style>