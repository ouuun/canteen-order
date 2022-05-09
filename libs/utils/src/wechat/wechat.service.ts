import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import {
  MESSAGE_TEMPLATE,
  OrderTemplateData,
  WECHAT_API_AUTH_CODE2SESSION,
  WECHAT_API_GET_ACCESSTOKEN,
  WECHAT_API_GET_WXCODE,
  WECHAT_API_SENDSUBSCRIBEMESSAGE,
  WECHAT_APPID,
  WECHAT_SECRET,
} from '@utils/utils/wechat/wechat.interface';
import { RedisService } from '@utils/utils/redis/redis.service';
import { REDIS_PREFIX } from '@utils/utils/redis/redis.interface';

@Injectable()
export class WechatService {
  constructor(
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,
  ) {}

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

  public async getAccessToken(): Promise<any> {
    const accessToken = await this.redisService.get(
      'accessToken',
      REDIS_PREFIX.wx,
    );
    if (accessToken) return accessToken;

    const url = WECHAT_API_GET_ACCESSTOKEN;
    const params: any = {
      appid: WECHAT_APPID,
      secret: WECHAT_SECRET,
      grant_type: 'client_credential',
    };

    const res = await firstValueFrom(
      this.httpService
        .get(url, { params: params })
        .pipe(map((response) => response.data)),
    );

    await this.redisService.set(
      'accessToken',
      res.access_token,
      REDIS_PREFIX.wx,
      res.expires_in - 100,
    );

    return res.access_token;
  }

  public async creataQrCode(scene: string, page: string): Promise<any> {
    const accessToken = await this.getAccessToken();

    const url = WECHAT_API_GET_WXCODE + `?access_token=${accessToken}`;

    const data: any = {
      scene: scene,
      page: page,
      check_path: false,
      env_version: 'develop',
    };

    const res = await firstValueFrom(
      this.httpService
        .post(url, data, { responseType: 'arraybuffer' })
        .pipe(map((response) => response.data)),
    );

    return res;
  }

  public async sendMessage(
    touser: string,
    template_id: MESSAGE_TEMPLATE,
    page: string,
    info: OrderTemplateData,
  ): Promise<any> {
    const accessToken = await this.getAccessToken();
    const url =
      WECHAT_API_SENDSUBSCRIBEMESSAGE + `?access_token=${accessToken}`;

    const data: any = {
      touser: touser,
      template_id: template_id,
      page: page,
      miniprogram_state: 'developer',
      lang: 'zh_CN',
      data: info,
    };

    const res = await firstValueFrom(
      this.httpService.post(url, data).pipe(map((response) => response.data)),
    );

    console.log(res);
  }
}
