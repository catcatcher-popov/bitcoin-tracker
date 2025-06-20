import { defineNitroPlugin } from '#imports'
import { setupPriceCollector } from '../cron'

export default defineNitroPlugin(() => {
  // Запускаем задачу при старте сервера
  setupPriceCollector()
})
