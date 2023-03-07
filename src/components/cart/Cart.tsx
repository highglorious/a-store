import { FC, useMemo } from "react";
import { GenericWrapper } from "@alfalab/core-components/generic-wrapper";
import { Divider } from "@alfalab/core-components/divider";
import { Typography } from "@alfalab/core-components/typography";
import { Amount } from "@alfalab/core-components/amount";
import "./Cart.css";
import { useAppSelector } from "../../hooks";
import { itemsCartSelector } from "./cartSelectors";
import { CartItem } from "../cart-item";
import { totalCostOfItems } from "../../utils/totalCostOfItems";

export const Cart: FC = () => {
  const cartItems = useAppSelector(itemsCartSelector);
  const items = useMemo(
    () => cartItems.map((item, key) => <CartItem key={key} {...item} />),
    [cartItems]
  );
  const totalPrice = useMemo(() => totalCostOfItems(cartItems), [cartItems]);
  return (
    <GenericWrapper column>
      {items}
      <Divider />
      <GenericWrapper justifyContent="between" alignItems="center">
        <Typography.Text
          view="primary-medium"
          weight="bold"
          tag="div"
          color="primary"
        >
          Сумма:
        </Typography.Text>
        <Amount value={totalPrice} minority={1} currency="RUB" bold="full" />
      </GenericWrapper>
    </GenericWrapper>
  );
};
