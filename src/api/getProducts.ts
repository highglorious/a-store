import { ProductType, ProductGroupType, ProductListType } from "../types/api";

type ProductUnionType = ProductType | ProductGroupType | ProductListType;

export const getProducts = async (path: string): Promise<ProductUnionType> => {
  const response = await fetch(`http://qa-games.ru/astore/${path}`);
  const data = await response.json();
  return data;
};
