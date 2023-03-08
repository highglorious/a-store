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

export enum deliveryDesription {
  self = "Самовывоз (пр-т Андропова, 18 корп. 3)",
  country = "Доставка по России — 350₽",
  city = "Курьером по Москве — 300₽",
}

type DeliveryDescriptionType = `${deliveryDesription}`;

export type CreateOrderType = {
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryType: DeliveryDescriptionType;
  paymentType: "Банковская карта" | "Промокод";
  comment?: string;
  products: {
    id: number;
    totalPrice: number;
    totalCount: number;
    color?: string;
    model?: string;
    size?: string;
    sticketNumber?: number;
  }[];
};
