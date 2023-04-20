<script setup lang="ts">
import { SortOption } from '../types';

defineProps<{ modelValue: string; options: SortOption[] }>();
defineEmits<{ (e: 'update:modelValue', query: string): void }>();
</script>

<template>
  <select class="form-select" aria-label="Sort direction" :value="modelValue"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)" role="listbox">
    <option v-for="option in options" :value="option.value">{{ option.label }}</option>
  </select>
</template>