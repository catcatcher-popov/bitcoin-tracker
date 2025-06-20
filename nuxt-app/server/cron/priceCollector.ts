import cron from 'node-cron';

import { collectAndSavePrice } from '../services';

export function setupPriceCollector() {
  const task = cron.schedule('*/1 * * * *', async () => {
    try {
      const { timestamp, price } = await collectAndSavePrice();
      console.log(`[Cron] BTC ${price} @ ${timestamp.toISOString()}`);
    } catch (err) {
      console.error('[Cron] Ошибка сбора цены BTC:', err);
    }
  });

  return task;
}
