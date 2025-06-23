<template>
  <div class="p-4 bg-background-dark rounded shadow-md">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import type { ChartOptions } from 'chart.js';
import { computed } from 'vue';
import { Line } from 'vue-chartjs';

import type { PricePoint } from 'types';

ChartJS.register(...registerables);
const props = defineProps<{ data: PricePoint[] }>();
const sortedData = computed(() =>
  [...props.data].sort((b, a) => a.timestamp.getTime() - b.timestamp.getTime())
);

const chartData = computed(() => ({
  labels: sortedData.value.map((p) => p.timestamp),
  datasets: [
    {
      label: 'Цена BTC, USD',
      data: sortedData.value.map((p) => p.price),
      borderColor: '#F7931A',
      backgroundColor: 'rgba(247,147,26,0.2)',
      fill: true,
      pointRadius: 0,
      borderWidth: 2,
    },
  ],
}));

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  animation: {
    duration: 800,
  },
  animations: { x: false },
  responsive: true,
  indexAxis: 'x',
  interaction: {
    intersect: false,
    axis: 'x',
  },
  scales: {
    x: {
      type: 'time',
      time: { unit: false },
      grid: { color: '#2a2a2a' },
    },
    y: {
      grid: { color: '#2a2a2a' },
    },
  },
  plugins: {
    legend: { labels: { color: '#E0E0E0' } },
    decimation: {
      enabled: true,
      algorithm: 'lttb',
    },
  },
}));
</script>
