<template>
  <div v-if="data.length">
    <Line :data="chartData" :options="chartOptions" />
  </div>
  <p v-else class="text-center text-gray-500">Нет данных для отображения.</p>
</template>

<script setup lang="ts">
// 1. STRONG TYPING и ИМПОРТ АДАПТЕРА до ChartJS.register
import 'chartjs-adapter-date-fns';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

import type { ChartOptions } from 'chart.js';
import { computed, defineProps } from 'vue';
import { Line } from 'vue-chartjs';

import type { PricePoint } from '~/types';

// 2. SRP: получаем только пропс data с типом PricePoint[]
const props = defineProps<{ data: PricePoint[] }>();

// 3. DRY: вычисляем chartData и chartOptions, без магических строк
const chartData = computed(() => ({
  labels: props.data.map((p) => p.timestamp),
  datasets: [
    {
      label: 'Цена BTC (USD)',
      data: props.data.map((p) => p.price),
      fill: false,
      borderWidth: 2,
      pointRadius: 0,
    },
  ],
}));

// 4. STRICT TYPING опций
const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  scales: {
    x: {
      type: 'time', // используем 'time', а не 'timeseries'
      time: { unit: 'day' },
      title: { display: true, text: 'Дата' },
    },
    y: {
      title: { display: true, text: 'Цена, USD' },
    },
  },
  plugins: {
    legend: { position: 'top' },
  },
}));
</script>
