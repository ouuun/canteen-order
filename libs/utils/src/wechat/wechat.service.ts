import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import {
  WECHAT_API_AUTH_CODE2SESSION,
  WECHAT_APPID,
  WECHAT_SECRET,
} from '@utils/utils/wechat/wechat.interface';

@Injectable()
export class WechatService {
  constructor(private readonly httpService: HttpService) {}

  public async getOpenid(code: string): Promise<any> {
    const url = WECHAT_API_AUTH_CODE2SESSION;
    const params: any = {
      appid: WECHAT_APPID,
      secret: WECHAT_SECRET,
      js_code: code,
      grant_type: 'authorization_code',
    };
    return await firstValueFrom(
      this.httpService
        .get(url, { params: params })
        .pipe(map((response) => response.data)),
    );
  }
}
