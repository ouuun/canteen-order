export interface DishPrice {
  name: string;
  price: string;
  sale: number;
}

export interface DishTaste {
  name: string;
  price: string;
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
