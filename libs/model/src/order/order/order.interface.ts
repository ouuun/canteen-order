export interface OrderCreateRequest {
  type: string;
  table: number;
  items: OrderItemRequest[];
  remark: any;
  operId: number;
}

export interface OrderItemRequest {
  id: number;
  num: number;
  price: number;
  priceIndex: number;
  tasteIndex: number;
  select: string;
}

export enum ORDER_STATE {
  '未支付' = '未支付',
  '已支付' = '已支付',
  '已确认' = '已确认',
  '已取消' = '已取消',
}
