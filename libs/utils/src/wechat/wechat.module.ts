import { Module } from '@nestjs/common';
import { WechatService } from './wechat.service';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '@utils/utils/redis/redis.module';

@Module({
  imports: [HttpModule, RedisModule],
  providers: [WechatService],
  exports: [WechatService],
})
export class WechatModule {
  //
}
