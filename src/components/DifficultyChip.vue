<script setup>
const props = defineProps({
  difficulty: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <p
    class="difficulty"
    :class="
      props.difficulty === 'easy' ? 'bg-green-600' : props.difficulty === 'medium' ? 'bg-amber-600' : 'bg-red-500'
    "
  >
    {{ props.difficulty }}
  </p>
</template>

<style lang="postcss" scoped>
.difficulty {
  @apply absolute bottom-0 left-4 m-4 rounded-md py-2 px-4 text-xl font-medium capitalize text-white;
}
</style>
