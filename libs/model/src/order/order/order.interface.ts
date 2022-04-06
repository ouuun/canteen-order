export interface OrderCreateRequest {
  type: string;
  table: number;
  items: OrderItemRequest[];
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
