export type ProductType = {
  id: number;
  preview: string;
  images?: string[];
  title: string;
  subtitle?: string;
  price: number;
  description: string;
  colors?: string[];
  sizes?: string[];
  stickerNumbers?: number[];
  models?: string[];
  availability: boolean;
};
export type ProductGroupType = {
  id: number;
  title: string;
  description: string;
  products: ProductListType;
};

export type ProductListType = ProductType[];
export type ProductListGroupType = ProductGroupType[];

export enum colorVariant {
  white = "Белый",
  black = "Черный",
  red = "Красный",
  green = "Зеленый",
  gray = "Серый",
}

export type ProductColorType = keyof typeof colorVariant;

export enum deliveryVariant {
  self = 0,
  country = 350,
  city = 300,
}

export type DeliveryStateType = keyof typeof deliveryVariant;
