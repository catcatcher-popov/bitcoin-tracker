import { defineEventHandler, createError, H3Event } from 'h3';

export function createHandler<T>(handler: (event: H3Event) => Promise<T>) {
  return defineEventHandler(async (event) => {
    try {
      return await handler(event);
    } catch (e: any) {
      if (e.statusCode) throw e;
      throw createError({
        statusCode: 500,
        statusMessage: e.message || 'Internal Server Error',
      });
    }
  });
}
