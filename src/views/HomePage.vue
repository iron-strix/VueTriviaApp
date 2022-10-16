<script setup>
import { onMounted } from 'vue'
import useAPI from '@/composables/useAPI.js'
import BaseTitle from '@/components/BaseTitle.vue'

const { categories, getCategories } = useAPI()

onMounted(async () => {
  await getCategories()
})
</script>

<template>
  <BaseTitle>
    <template #logo> <img src="/logo.svg" alt="logo" /> </template>
    <h1 class="title">Vue Trivia App</h1>
    <h1 class="title">Categories:</h1>
  </BaseTitle>
  <div v-if="categories.length > 0" class="categories">
    <RouterLink
      v-for="category in categories"
      :key="category.id"
      :to="`/question/category/${category.id}`"
      class="category"
      >{{ category.name }}</RouterLink
    >
  </div>
</template>

<style class="postcss" scoped>
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
