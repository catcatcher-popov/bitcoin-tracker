<template>
  <div class="p-4 bg-background-dark rounded shadow-md">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import 'chartjs-adapter-date-fns';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

import type { ChartOptions } from 'chart.js';
import { computed, defineProps } from 'vue';
import { Line } from 'vue-chartjs';

import type { PricePoint } from '~/types';

const props = defineProps<{ data: PricePoint[] }>();

const chartData = computed(() => ({
  labels: props.data.map((p) => p.timestamp),
  datasets: [
    {
      label: 'Цена BTC, USD',
      data: props.data.map((p) => p.price),
      borderColor: '#F7931A', // золотой
      backgroundColor: 'rgba(247,147,26,0.2)',
      fill: true,
      pointRadius: 0,
      borderWidth: 2,
    },
  ],
}));

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  scales: {
    x: {
      type: 'time',
      time: { unit: 'day' },
      grid: { color: '#2a2a2a' },
    },
    y: {
      grid: { color: '#2a2a2a' },
    },
  },
  plugins: {
    legend: { labels: { color: '#E0E0E0' } },
  },
}));
</script>
