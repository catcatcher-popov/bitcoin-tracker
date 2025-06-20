import axios from 'axios';

export async function fetchLatestPrice(): Promise<number> {
  const { data } = await axios.get<{ symbol: string; price: string }>(
    'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
  );
  return parseFloat(data.price);
}
