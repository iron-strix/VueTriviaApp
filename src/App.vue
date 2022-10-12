<script setup></script>

<template>
  <main>
    <div class="card">
      <RouterView />
    </div>
    <p class="score">Score: 100</p>
  </main>
</template>

<style lang="postcss" scoped>
main {
  @apply flex h-screen items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black;

  & .card {
    @apply flex h-5/6 min-h-fit w-11/12 flex-col items-center gap-16 overflow-auto rounded-lg bg-slate-400 p-8 shadow-lg;
  }
}

.score {
  @apply absolute bottom-0 right-4 m-8 text-2xl font-medium uppercase text-white;
}
</style>
