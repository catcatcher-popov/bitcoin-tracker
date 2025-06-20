import { setupPriceCollector } from '../cron/priceCollector';

import { defineNitroPlugin } from '#imports';

export default defineNitroPlugin(() => {
  console.log('[Cron Plugin] Инициализируем сбор цен BTC…');
  setupPriceCollector();
});
