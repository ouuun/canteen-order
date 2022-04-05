import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@utils/utils/config/config.module';
import { ConfigService } from '@utils/utils/config/config.service';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from '@utils/utils/redis/redis.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password,
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  //
}
