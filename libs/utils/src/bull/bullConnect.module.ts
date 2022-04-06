import { Module } from '@nestjs/common';
import { ConfigModule } from '@utils/utils/config/config.module';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@utils/utils/config/config.service';

@Module({
  imports: [
    BullModule.forRootAsync('default', {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.redis.host,
          port: config.redis.port,
          password: config.redis.password,
        },
        prefix: 'bull:' + config.env,
      }),
    }),
  ],
})
export class BullConnectModule {}
