import axios from 'axios';

import { BINANCE_API_URL, SYMBOL } from '~/constants';

export async function fetchLatestPrice(): Promise<number> {
  const { data } = await axios.get<{ symbol: string; price: string }>(
    `${BINANCE_API_URL}/ticker/price`,
    { params: { symbol: SYMBOL } }
  );
  return parseFloat(data.price);
}
