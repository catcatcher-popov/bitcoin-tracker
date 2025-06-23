<template>
  <div class="flex space-x-2 mb-4">
    <button
      v-for="opt in OPTIONS"
      :key="opt.value"
      :class="btnClass(opt.value)"
      @click="$emit('update:period', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Period } from '~/constants/periods';

const OPTIONS: { label: string; value: Period }[] = [
  { label: 'День', value: 'day' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
  { label: 'Год', value: 'year' },
  { label: 'Указать...', value: 'custom' },
];

const props = defineProps<{ period: Period }>();
defineEmits<{ (e: 'update:period', v: Period): void }>();

const btnClass = (v: Period) => [
  'px-4 py-2 rounded transition-all',
  props.period === v
    ? 'bg-bitcoin-gold text-background-dark shadow-md shadow-bitcoin-gold-secondary cursor-default'
    : 'bg-background-dark text-text-secondary hover:bg-bitcoin-gold-secondary hover:text-bitcoin-gold hover:text-shadow-lg hover:text-shadow-sky-300/90',
];
</script>
