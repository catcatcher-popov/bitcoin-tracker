<template>
  <div class="flex space-x-2 mb-4">
    <button
      v-for="opt in options"
      :key="opt.value"
      :class="[
        'px-4 py-2 rounded transition-colors',
        period === opt.value
          ? 'bg-bitcoin-gold text-background-dark'
          : 'bg-background-dark text-text-secondary hover:bg-bitcoin-gold-secondary hover:text-background-dark',
      ]"
      @click="$emit('update:period', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { PeriodType } from '~/types';

defineProps<{
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
  { label: 'Период...', value: 'custom' },
] as const;
</script>
