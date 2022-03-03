import { Module } from '@nestjs/common';
import { WechatService } from './wechat.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [WechatService],
  exports: [WechatService],
})
export class WechatModule {
  //
}
