import {
  ProductType,
  ProductGroupType,
  ProductListType,
  CreateOrderType,
} from "../types/api";

type ProductUnionType = ProductType | ProductGroupType | ProductListType;
const url = "http://qa-games.ru/astore/";
export const getProducts = async (path: string): Promise<ProductUnionType> => {
  const response = await fetch(`${url}${path}`);
  const data = await response.json();
  return data;
};

export const createOrder = async (payload: CreateOrderType): Promise<any> => {
  const response = await fetch(`${url}create-order`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
};
