<template>
  <div class="max-w-svw mx-auto px-32 py-8 bg-background-dark text-text-primary">
    <h1 class="text-3xl font-bold mb-6 text-bitcoin-gold">График цен Bitcoin</h1>

    <PeriodSelector :period="period" @update:period="period = $event" />

    <DateRangePicker v-if="period === 'custom'" v-model="customRange" />

    <div v-if="error" class="text-center text-red-500">{{ error }}</div>
    <PriceChart v-else :data="data" />
    <div v-if="loading" class="text-center text-text-secondary">Загрузка данных…</div>
  </div>
</template>

<script setup lang="ts">
import DateRangePicker from '~/components/DateRangePicker.vue';
import PeriodSelector from '~/components/PeriodSelector.vue';
import PriceChart from '~/components/PriceChart.vue';
import type { UsePrices } from '~/composables/usePrices';
import { usePrices } from '~/composables/usePrices';

const { period, customRange, data, loading, error }: UsePrices = usePrices();
</script>
