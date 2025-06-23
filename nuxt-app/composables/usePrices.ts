// composables/usePrices.ts
import { ref, watch } from 'vue';

import type { PricePoint, CustomPeriodDTO, PeriodType } from '~/types';

export function usePrices() {
  const period = ref<PeriodType>('day');
  const customRange = ref<CustomPeriodDTO>({ from: '', to: '' });
  const data = ref<PricePoint[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  function setDefaultCustomRange() {
    const now = new Date();
    const fromDate = new Date(now.getTime() - 24 * 3600_000);
    customRange.value.from = fromDate.toISOString().slice(0, 16);
    customRange.value.to = now.toISOString().slice(0, 16);
  }

  async function fetchPrices() {
    loading.value = true;
    error.value = null;

    if (period.value === 'custom' && (!customRange.value.from || !customRange.value.to)) {
      setDefaultCustomRange();
      loading.value = false;
      return;
    }

    try {
      let resp: { data: PricePoint[] };
      if (period.value === 'custom') {
        resp = await $fetch('/api/prices/custom', {
          method: 'POST',
          body: {
            from: customRange.value.from,
            to: customRange.value.to,
          },
        });
      } else {
        resp = await $fetch(`/api/prices/${period.value}`);
      }
      data.value = resp.data.map((p) => ({
        timestamp: new Date(p.timestamp),
        price: p.price,
      }));
    } catch (e: any) {
      error.value = e.message || 'Ошибка при загрузке данных';
    } finally {
      loading.value = false;
    }
  }

  watch([period, customRange], fetchPrices, { immediate: true });

  return { period, customRange, data, loading, error };
}
