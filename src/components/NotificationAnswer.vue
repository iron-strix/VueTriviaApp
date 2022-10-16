<script setup>
const props = defineProps({
  correct: {
    type: Boolean,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="notification" :class="props.correct ? 'bg-green-500' : 'bg-red-500'">
    {{ props.correct ? 'Correct' : 'Wrong' }}
    <div class="answer">
      {{ props.answer }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.notification {
  @apply absolute inset-0 flex items-start justify-center py-72 text-8xl font-bold uppercase tracking-widest text-white;

  & .answer {
    @apply absolute inset-y-2/4 items-center justify-center;
  }
}
</style>
