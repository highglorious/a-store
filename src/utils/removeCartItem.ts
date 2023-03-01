import { CartItemQueryType, CartItemType } from "../components/cart/cartSlice";

export const removeCartItem = (
  itemsList: CartItemType[],
  query: CartItemQueryType
) =>
  itemsList.filter(
    (item) =>
      !(
        item.id === query.id &&
        item.color === query.color &&
        item.size === query.size &&
        item.model === query.model &&
        item.stickerNumber === query.stickerNumber
      )
  );
