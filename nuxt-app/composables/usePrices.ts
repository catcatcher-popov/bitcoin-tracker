import { ref, watch, type Ref } from 'vue';

import type { PricePoint, CustomPeriodDTO } from 'types';
import { BASE_API_PATH, type Period } from '~/constants';

export type UsePrices = {
  period: Ref<Period>;
  customRange: Ref<CustomPeriodDTO>;
  data: Ref<PricePoint[]>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
};

export function usePrices(): UsePrices {
  const period = ref<Period>('day');
  const customRange = ref<CustomPeriodDTO>({ from: '', to: '' });
  const data = ref<PricePoint[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  function setDefaultCustomRange(): void {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 3600_000);
    customRange.value = {
      from: yesterday.toISOString().slice(0, 16),
      to: now.toISOString().slice(0, 16),
    };
  }

  async function fetchPrices(): Promise<void> {
    loading.value = true;
    error.value = null;

    if (period.value === 'custom' && (!customRange.value.from || !customRange.value.to)) {
      setDefaultCustomRange();
      loading.value = false;
      return;
    }

    try {
      let init: { data: PricePoint[] };
      if (period.value === 'custom') {
        init = await $fetch(`${BASE_API_PATH}/custom`, {
          method: 'POST',
          body: customRange.value,
        });
      } else {
        init = await $fetch(`${BASE_API_PATH}/${period.value}`);
      }
      data.value = init.data.map((p) => ({
        timestamp: new Date(p.timestamp),
        price: p.price,
      }));
      let upd: { data: PricePoint[] };
      if (period.value === 'custom') {
        upd = await $fetch(`${BASE_API_PATH}/custom?refresh=true`, {
          method: 'POST',
          body: customRange.value,
        });
      } else {
        upd = await $fetch(`${BASE_API_PATH}/${period.value}?refresh=true`);
      }
      data.value = upd.data.map((p) => ({
        timestamp: new Date(p.timestamp),
        price: p.price,
      }));
    } catch (e: any) {
      error.value = e.message || 'Ошибка загрузки данных';
    } finally {
      loading.value = false;
    }
  }

  watch([period, customRange], fetchPrices, { immediate: true });

  return { period, customRange, data, loading, error };
}
