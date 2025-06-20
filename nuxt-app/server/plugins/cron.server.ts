import { defineNitroPlugin } from "#imports";
import { setupPriceCollector } from "../cron/priceCollector";

export default defineNitroPlugin(() => {
  console.log("[Cron Plugin] Инициализируем сбор цен BTC…");
  setupPriceCollector();
});
