<script setup>
import { onMounted, ref } from 'vue'
import useAPI from '@/composables/useAPI.js'

const api = useAPI()
const categories = ref([])

onMounted(async () => {
  categories.value = await api.getCategories()
})
</script>

<template>
  <div class="brand">
    <img class="logo" src="logo.svg" alt="logo" />
    <h1 class="title">Vue Trivia App</h1>
    <img class="logo" src="logo.svg" alt="logo" />
  </div>
  <div class="categories">
    <RouterLink
      v-for="category in categories"
      :key="category"
      :to="`/question/category/${category.id}`"
      class="category"
      >Category - {{ category.name }}</RouterLink
    >
  </div>
</template>

<style class="postcss" scoped>
.brand {
  @apply flex items-center justify-center gap-4;
  & .logo {
    @apply h-16 w-16;
  }

  & .title {
    @apply text-5xl uppercase tracking-wide text-gray-200;
  }
}

.categories {
  @apply grid flex-grow grid-cols-4 gap-12;

  & .category {
    @apply flex h-32 w-40 items-center justify-center rounded-lg border-4 border-solid border-gray-600 py-4 text-center font-bold uppercase text-gray-800 transition-colors duration-300;

    &:hover {
      @apply cursor-pointer border-gray-900 bg-slate-500 text-white;
    }
  }
}
</style>
