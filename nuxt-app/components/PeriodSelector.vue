<template>
  <div class="flex space-x-2 mb-4">
    <button
      v-for="opt in options"
      :key="opt.value"
      :class="buttonClass"
      @click="$emit('update:period', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import type { PeriodType } from '~/types';

const props = defineProps<{
  period: PeriodType;
}>();

defineEmits<{
  (e: 'update:period', value: PeriodType): void;
}>();

const options = [
  { label: 'День', value: 'day' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
  { label: 'Год', value: 'year' },
  { label: 'Свои…', value: 'custom' },
] as const;

const buttonClass = (value: PeriodType) =>
  computed(() => [
    'px-4 py-2 rounded transition',
    props.period === value ? 'bg-blue-600 text-white' : 'bg-gray-200',
  ]);
</script>
