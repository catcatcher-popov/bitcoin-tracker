<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">График цен Bitcoin</h1>

    <PeriodSelector :period="period" @update:period="period = $event" />

    <DateRangePicker v-if="period === 'custom'" v-model="customRange" />

    <div v-if="error" class="text-center text-red-500">{{ error }}</div>
    <PriceChart v-else :data="data" />
    <div v-if="loading" class="text-center text-gray-500">Загрузка…</div>
  </div>
</template>

<script setup lang="ts">
import DateRangePicker from '../components/DateRangePicker.vue';
import PeriodSelector from '../components/PeriodSelector.vue';
import PriceChart from '../components/PriceChart.vue';
import { usePrices } from '../composables/usePrices';

const { period, customRange, data, loading, error } = usePrices();
</script>
