import { ref, watch, type Ref } from 'vue';

import type { PricePoint, CustomPeriodDTO, Period } from 'types';
import { DEFAULT_CUSTOM_RANGE_HOURS } from '~/constants';
import { PriceApi } from '~/services';

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
    const startTime = new Date(now.getTime() - DEFAULT_CUSTOM_RANGE_HOURS * 3600_000);
    customRange.value = {
      from: startTime.toISOString().slice(0, 16),
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
      let points: PricePoint[];
      // Initial
      if (period.value === 'custom') {
        points = await PriceApi.initialCustom(customRange.value);
      } else {
        points = await PriceApi.initial(period.value);
      }
      data.value = points.map((p) => ({ ...p, timestamp: new Date(p.timestamp) }));

      // Refresh
      if (period.value === 'custom') {
        points = await PriceApi.refreshCustom(customRange.value);
      } else {
        points = await PriceApi.refresh(period.value);
      }
      data.value = points.map((p) => ({ ...p, timestamp: new Date(p.timestamp) }));
    } catch (e: any) {
      error.value = e.message || 'Ошибка загрузки';
    } finally {
      loading.value = false;
    }
  }

  watch([period, customRange], fetchPrices, { immediate: true });

  return { period, customRange, data, loading, error };
}
