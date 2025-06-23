import { ref, watch, type Ref } from 'vue';

import type { PricePoint, CustomPeriodDTO } from 'types';

export type UsePrices = {
  period: Ref<'day' | 'week' | 'month' | 'year' | 'custom'>;
  customRange: Ref<CustomPeriodDTO>;
  data: Ref<PricePoint[]>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
};

export function usePrices(): UsePrices {
  const period = ref<'day' | 'week' | 'month' | 'year' | 'custom'>('day');
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
      let initResp: { data: PricePoint[] };
      if (period.value === 'custom') {
        initResp = await $fetch('/api/prices/custom', {
          method: 'POST',
          body: customRange.value,
        });
      } else {
        initResp = await $fetch(`/api/prices/${period.value}`);
      }
      data.value = initResp.data.map((p) => ({
        timestamp: new Date(p.timestamp),
        price: p.price,
      }));
      let updResp: { data: PricePoint[] };
      if (period.value === 'custom') {
        updResp = await $fetch('/api/prices/custom?refresh=true', {
          method: 'POST',
          body: customRange.value,
        });
      } else {
        updResp = await $fetch(`/api/prices/${period.value}?refresh=true`);
      }
      data.value = updResp.data.map((p) => ({
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
