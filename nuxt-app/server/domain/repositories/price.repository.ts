import type { PrismaClient } from '@prisma/client';

import { getPrisma } from '~/server/db/prisma-client';
import { Price } from '~/server/domain/entities/price.entity';

export class PriceRepository {
  private async prisma(): Promise<PrismaClient> {
    return await getPrisma();
  }

  public async findByPeriod(from: Date, to: Date): Promise<Price[]> {
    const prisma = await this.prisma();
    const recs = await prisma.price.findMany({
      where: { timestamp: { gte: from, lte: to } },
      orderBy: { timestamp: 'asc' },
    });
    return recs.map((r) => new Price(r.timestamp, r.price));
  }

  public async saveOne(entity: Price): Promise<Price> {
    const prisma = await this.prisma();
    const rec = await prisma.price.create({
      data: {
        timestamp: entity.timestamp,
        price: entity.price,
      },
    });
    return new Price(rec.timestamp, rec.price);
  }

  public async saveMany(entities: Price[]): Promise<void> {
    if (entities.length === 0) return;
    const prisma = await this.prisma();
    await prisma.price.createMany({
      data: entities.map((e) => ({
        timestamp: e.timestamp,
        price: e.price,
      })),
      skipDuplicates: true,
    });
  }
}
