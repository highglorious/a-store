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

export const colorVariant = {
  white: "Белый",
  black: "Черный",
  red: "Красный",
  green: "Зеленый",
  gray: "Серый",
} as const;

export type ProductColorType = keyof typeof colorVariant;
