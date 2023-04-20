<script setup lang="ts">
import { onUnmounted } from 'vue';

const props = withDefaults(
  defineProps<{ modelValue: string; delay?: number }>(),
  { modelValue: '', delay: 1000 }
);
const emit = defineEmits<{ (e: 'update:modelValue', query: string): void }>();

let searchTimeoutId: ReturnType<typeof setTimeout>;

function handleInput(event: Event) {
  if (searchTimeoutId) {
    clearTimeout(searchTimeoutId);
  }

  searchTimeoutId = setTimeout(() => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }, props.delay)
}

onUnmounted(() => {
  if (searchTimeoutId) {
    clearTimeout(searchTimeoutId);
  }
});
</script>

<template>
  <div class="search-form d-flex justify-content-center align-items-center">
    <div class="form-floating w-50">
      <input type="text" id="search" class="form-control" placeholder="Szukaj..." :value="modelValue"
        @input="handleInput">
      <label for="search">Szukaj...</label>
    </div>
  </div>
</template>