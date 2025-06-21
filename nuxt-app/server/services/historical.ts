import axios from 'axios'
import { getPrisma } from '~/server/db/prismaClient'
import type { PricePoint } from '~/types'

const BINANCE_INTERVALS: { ms: number; label: string }[] = [
  { ms:  60_000,   label: '1m'  },
  { ms:  3*60_000, label: '3m'  },
  { ms:  5*60_000, label: '5m'  },
  { ms: 15*60_000, label: '15m' },
  { ms: 30*60_000, label: '30m' },
  { ms:  60*60_000, label: '1h' },
  { ms:  2*60*60_000, label: '2h' },
  { ms:  4*60*60_000, label: '4h' },
  { ms:  6*60*60_000, label: '6h' },
  { ms: 12*60*60_000, label: '12h'},
  { ms: 24*60*60_000, label: '1d' }
]

function selectInterval(from: Date, to: Date): string {
  const span = to.getTime() - from.getTime()
  const targetPoints = 100
  let ideal = span / targetPoints
  const minMs = 10 * 60 * 1000
  const maxMs = 12 * 60 * 60 * 1000
  ideal = Math.max(minMs, Math.min(maxMs, ideal))
  const found = BINANCE_INTERVALS.find(i => i.ms >= ideal)
  return found ? found.label : BINANCE_INTERVALS[BINANCE_INTERVALS.length - 1].label
}

export async function fetchAndSaveHistoricalPrices(
  from: Date,
  to:   Date
): Promise<void> {
  const prisma = await getPrisma()

  const existing = await prisma.price.findMany({
    where: { timestamp: { gte: from, lte: to } },
    select: { timestamp: true }
  })
  const have = new Set(existing.map(r => +r.timestamp))
  const interval = selectInterval(from, to)
  const resp = await axios.get<any[]>('https://api.binance.com/api/v3/klines', {
    params: {
      symbol:    'BTCUSDT',
      interval,
      startTime: from.getTime(),
      endTime:   to.getTime(),
      limit:     1000
    }
  })

  const points: PricePoint[] = resp.data.map(k => ({
    timestamp: new Date(k[0]),       // openTime
    price:     parseFloat(k[4])      // close price
  }))

  await prisma.price.createMany({
    data: points
      .filter(p => !have.has(+p.timestamp))
      .map(p => ({ timestamp: p.timestamp, price: p.price })),
    skipDuplicates: true
  })
}
