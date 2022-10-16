<script setup>
import useScore from '@/composables/useScore.js'
const { score } = useScore()
</script>

<template>
  <p class="score">Score: {{ score }}</p>
</template>

<style lang="postcss" scoped>
.score {
  @apply absolute bottom-0 right-4 m-4 py-2 px-4 text-2xl font-medium uppercase text-white;
}
</style>
