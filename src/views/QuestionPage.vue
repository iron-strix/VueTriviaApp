<script setup>
import BaseTitle from '@/components/BaseTitle.vue'
import { onMounted, ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAPI from '@/composables/useAPI.js'
import useColor from '@/composables/useColor'
import { shuffle } from 'lodash-es'
import useScore from '@/composables/useScore.js'
import DifficultyChip from '@/components/DifficultyChip.vue'
import NotificationAnswer from '@/components/NotificationAnswer.vue'

const route = useRoute()
const router = useRouter()
const api = useAPI()
const colors = useColor()
const question = ref(null)
const answers = ref([])
const { changeScore } = useScore()
const showNotification = ref(false)
const isCorrect = ref(false)

const handleAnswer = (points) => {
  isCorrect.value = points > 0
  showNotification.value = true
  //wait 3 seconds
  setTimeout(() => {
    changeScore(points)
    router.push('/')
  }, 1500)
}

onMounted(async () => {
  question.value = await api.getQuestion(route.params.id)
  answers.value.push({
    id: answers.value.length,
    correct: true,
    answer: question.value.correct_answer,
    points: question.value.difficulty === 'easy' ? 10 : question.value.difficulty === 'medium' ? 20 : 30,
  })

  question.value.incorrect_answers.map((answer) => {
    answers.value.push({
      id: answers.value.length,
      correct: false,
      answer,
      points: -5,
    })
  })
  answers.value = shuffle(answers.value)
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
      <div
        v-for="answer in answers"
        :key="answer.id"
        :class="colors.getColor(answer.id)"
        class="answer"
        @click="handleAnswer(answer.points)"
      >
        {{ answer.answer }}
      </div>
    </div>
    <DifficultyChip :difficulty="question.difficulty" />
  </div>
  <div v-else class="loading">Loading...</div>
  <NotificationAnswer v-if="showNotification" :correct="isCorrect" />
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

      &:hover {
        @apply cursor-pointer;
      }
    }
  }
}

.loading {
  @apply flex h-full w-full items-center justify-center text-7xl;
}
</style>
