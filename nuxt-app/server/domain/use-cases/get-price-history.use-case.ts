// server/domain/useCases/GetPriceHistoryUseCase.ts
import { Price } from '~/server/domain/entities/price.entity';
import { PriceRepository } from '~/server/domain/repositories/price.repository';
import { fetchAndSaveHistoricalPrices } from '~/server/services/historical.service';

export class GetPriceHistoryUseCase {
  private repo = new PriceRepository();

  public async execute(from: Date, to: Date, needRefresh = false): Promise<Price[]> {
    if (needRefresh) {
      await fetchAndSaveHistoricalPrices(from, to);
    }
    return this.repo.findByPeriod(from, to);
  }
}
