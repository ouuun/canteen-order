export const WECHAT_API_AUTH_CODE2SESSION =
  'https://api.weixin.qq.com/sns/jscode2session';

export const WECHAT_API_GET_ACCESSTOKEN =
  'https://api.weixin.qq.com/cgi-bin/token';

export const WECHAT_API_GET_WXCODE =
  'https://api.weixin.qq.com/wxa/getwxacodeunlimit';

export const WECHAT_API_SENDSUBSCRIBEMESSAGE =
  'https://api.weixin.qq.com/cgi-bin/message/subscribe/send';

export const WECHAT_APPID = 'wx98a6766208b54ed3';

export const WECHAT_SECRET = '503e3f23c16050798bb155003173b797';

export enum MESSAGE_TEMPLATE {
  订单 = 'Jh3c8z8H_SBimPbWdhuZYX3biCMvojLBLjXpCsz0jbw',
}

export interface OrderTemplateData {
  thing9: { value: string };
  character_string1: { value: string };
  amount4: { value: string };
  thing5: { value: string };
  thing8: { value: string };
}
