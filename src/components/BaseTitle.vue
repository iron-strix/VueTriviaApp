<template>
  <div class="brand">
    <slot name="logo" />
    <h1 class="title">
      <slot />
    </h1>
    <slot name="title" />
    <slot name="logo" />
  </div>
</template>

<style lang="postcss" scoped>
.brand {
  @apply flex items-center justify-center gap-4;
  & :slotted(img) {
    @apply h-16 w-16;
  }

  & .title {
    @apply text-5xl uppercase tracking-wide text-gray-200;
  }
}
</style>
