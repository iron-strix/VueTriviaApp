<script setup>
import BaseTitle from '@/components/BaseTitle.vue'
import { onMounted, ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import useAPI from '@/composables/useAPI.js'
import useColor from '@/composables/useColor'

const route = useRoute()
const api = useAPI()
const colors = useColor()
const question = ref(null)
const answers = ref([])

onMounted(async () => {
  question.value = await api.getQuestion(route.params.id)
  answers.value.push({
    id: answers.value.length,
    correct: true,
    answer: question.value.correct_answer,
  })

  question.value.incorrect_answers.map((answer) => {
    answers.value.push({
      id: answers.value.length,
      correct: false,
      answer,
    })
  })
})

onUnmounted(() => {
  question.value = null
  answers.value = null
})
</script>

<template>
  <div v-if="question && answers" class="question-container">
    <BaseTitle> {{ question.category }} </BaseTitle>
    <p class="question">{{ question.question }}</p>
    <div class="answers">
      <div v-for="answer in answers" :key="answer.id" :class="colors.getColor(answer.id)" class="answer">
        {{ answer.answer }}
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<style lang="postcss" scoped>
.question-container {
  @apply flex h-full w-full flex-col items-center gap-8;
  & .question {
    @apply text-center text-2xl font-bold;
  }
  & .answers {
    @apply grid w-full flex-grow grid-cols-2 gap-8;

    & .answer {
      @apply flex  items-center justify-center rounded-md text-3xl text-white;
    }
  }
}

.loading {
  @apply flex h-full w-full items-center justify-center text-7xl;
}
</style>
