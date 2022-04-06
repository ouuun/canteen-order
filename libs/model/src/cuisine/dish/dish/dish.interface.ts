export interface DishPrice {
  name: string;
  price: number;
  sale: number;
}

export interface DishTaste {
  name: string;
  price: number;
  sale: number;
}

export enum DishCheck {
  name = '未设置菜品名',
  type = '菜品类型选择错误',
  mainImages = '未设置主图',
  detailImages = '未设置详情图',
  prices = '未设置规格',
  material = '未设置原材料',
  cooking = '未设置烹饪方式',
  weight = '未设置份量',
}

export interface changeSaleRequest {
  id: number;
  price: { name: string; price: number; sale: number };
  taste: { name: string; price: number; sale: number };
  quantity: number;
}
