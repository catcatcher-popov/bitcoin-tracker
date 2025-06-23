<template>
  <div class="flex space-x-2 mb-4">
    <button v-for="p in PERIODS" :key="p" :class="btnClass(p)" @click="$emit('update:period', p)">
      {{ PERIOD_LABELS[p] }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { PERIOD_LABELS } from 'constants/periodLabels';
import { PERIODS, type Period } from 'constants/periods';

const props = defineProps<{
  period: Period;
}>();

defineEmits<{
  (e: 'update:period', p: Period): void;
}>();

const btnClass = (v: Period) => [
  'px-4 py-2 rounded transition-all',
  props.period === v
    ? 'bg-bitcoin-gold text-background-dark shadow-md shadow-bitcoin-gold-secondary cursor-default'
    : 'bg-background-dark text-text-secondary hover:bg-bitcoin-gold-secondary hover:text-bitcoin-gold hover:text-shadow-lg hover:text-shadow-sky-300/90',
];
</script>
