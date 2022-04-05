import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { REDIS_PREFIX } from '@utils/utils/redis/redis.interface';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async get(key: string, prefix: REDIS_PREFIX): Promise<any> {
    return await this.cacheManager.get(`${prefix}${key}`);
  }

  public async set(
    key: string,
    data: any,
    prefix: REDIS_PREFIX,
    ttl?: number,
  ): Promise<any> {
    return await this.cacheManager.set(`${prefix}${key}`, data, { ttl: ttl });
  }
}
