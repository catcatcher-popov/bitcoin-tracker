import { $fetch } from 'ofetch';
import { ref, watch } from 'vue';

import type { PricePoint, CustomPeriodDTO, PeriodType } from '~/types';

export function usePrices() {
  const period = ref<PeriodType>('day');
  const customRange = ref<CustomPeriodDTO>({ from: '', to: '' });
  const data = ref<PricePoint[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchPrices() {
    loading.value = true;
    error.value = null;

    try {
      let response: { data: PricePoint[] };
      if (period.value === 'custom') {
        response = await $fetch('/api/prices/custom', {
          method: 'POST',
          body: customRange.value,
        });
      } else {
        response = await $fetch(`/api/prices/${period.value}`);
      }
      data.value = response.data.map((p) => ({
        timestamp: new Date(p.timestamp),
        price: p.price,
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      error.value = e.message || 'Ошибка загрузки данных';
    } finally {
      loading.value = false;
    }
  }

  watch([period, customRange], fetchPrices, { immediate: true });

  return { period, customRange, data, loading, error };
}
