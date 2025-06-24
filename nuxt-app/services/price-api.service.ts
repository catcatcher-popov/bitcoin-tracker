import type { PricePoint, CustomPeriodDTO, SetPeriod } from 'types';
import { BASE_API_PATH } from '~/constants';

export class PriceApi {
  static async initial(period: SetPeriod): Promise<PricePoint[]> {
    const resp = await $fetch<{ data: PricePoint[] }>(`${BASE_API_PATH}/${period}`);
    return resp.data;
  }

  static async refresh(period: SetPeriod): Promise<PricePoint[]> {
    const resp = await $fetch<{ data: PricePoint[] }>(`${BASE_API_PATH}/${period}?refresh=true`);
    return resp.data;
  }

  static async initialCustom(range: CustomPeriodDTO): Promise<PricePoint[]> {
    const resp = await $fetch<{ data: PricePoint[] }>(`${BASE_API_PATH}/custom`, {
      method: 'POST',
      body: range,
    });
    return resp.data;
  }

  static async refreshCustom(range: CustomPeriodDTO): Promise<PricePoint[]> {
    const resp = await $fetch<{ data: PricePoint[] }>(`${BASE_API_PATH}/custom?refresh=true`, {
      method: 'POST',
      body: range,
    });
    return resp.data;
  }
}
