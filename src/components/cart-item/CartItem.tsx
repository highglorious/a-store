import { FC } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@alfalab/core-components/typography";
import { GenericWrapper } from "@alfalab/core-components/generic-wrapper";
import { CrossCircleMIcon } from "@alfalab/icons-glyph/CrossCircleMIcon";
import { MinusCircleMIcon } from "@alfalab/icons-glyph/MinusCircleMIcon";
import { PlusCircleMIcon } from "@alfalab/icons-glyph/PlusCircleMIcon";
import { IconButton } from "@alfalab/core-components/icon-button";
import { Gap } from "@alfalab/core-components/gap";
import { Grid } from "@alfalab/core-components/grid";
import { Amount } from "@alfalab/core-components/amount";
import "./CartItem.css";
import { useAppDispatch } from "../../hooks";
import { cartActions, CartItemType } from "../cart/cartSlice";
import { colorVariant } from "../../types/api";

export const CartItem: FC<CartItemType> = (cartItemProps) => {
  const {
    title,
    size,
    model,
    color,
    stickerNumber,
    price,
    preview,
    quantity,
    id,
  } = cartItemProps;

  const cartItemQueryParams = { id, size, model, color, stickerNumber };

  const dispatch = useAppDispatch();

  const handleAddItem = () => {
    dispatch(cartActions.addItem(cartItemQueryParams));
  };
  const handleRemoveItem = () => {
    dispatch(cartActions.removeItem(cartItemQueryParams));
  };
  const handleDeleteItem = () => {
    dispatch(cartActions.deleteItems(cartItemQueryParams));
  };

  return (
    <div>
      <Grid.Row
        justify="around"
        gutter={{ mobile: 0, tablet: 16, desktop: 24 }}
      >
        <Grid.Col width={{ mobile: 12, tablet: 6, desktop: 6 }}>
          <GenericWrapper alignItems="center">
            <GenericWrapper className="cart-item__image-wrapper">
              <img className="cart-item__image" src={preview} alt={title} />
            </GenericWrapper>
            <Gap size={"s"} direction="horizontal" />
            <GenericWrapper column>
              <Link className="cart-item__link" to={`/product/${id}`}>
                <Typography.Text
                  view="primary-medium"
                  weight="bold"
                  tag="div"
                  color="primary"
                  id="target"
                >
                  {title}
                </Typography.Text>
              </Link>
              <GenericWrapper column>
                {color && (
                  <Typography.Text view="primary-small" color="primary">
                    {" "}
                    {"Цвет: " + colorVariant[color]}
                  </Typography.Text>
                )}
                {size && (
                  <Typography.Text view="primary-small" color="primary">
                    {" "}
                    {"Размер: " + size}
                  </Typography.Text>
                )}
                {model && (
                  <Typography.Text view="primary-small" color="primary">
                    {" "}
                    {"Модель: " + model}
                  </Typography.Text>
                )}

                {stickerNumber && (
                  <Typography.Text view="primary-small" color="primary">
                    {"Стикер: " + stickerNumber}
                  </Typography.Text>
                )}
              </GenericWrapper>
            </GenericWrapper>
          </GenericWrapper>
        </Grid.Col>
        <Grid.Col width={{ mobile: 3, tablet: 3, desktop: 3 }}>
          <GenericWrapper justifyContent="center" alignItems="center">
            <IconButton
              aria-label="decrement"
              view="primary"
              icon={MinusCircleMIcon}
              onClick={handleRemoveItem}
            />
            <Gap size={"s"} direction="horizontal" />
            <Typography.Text
              view="primary-medium"
              weight="bold"
              tag="div"
              color="primary"
            >
              {quantity}
            </Typography.Text>
            <Gap size={"s"} direction="horizontal" />
            <IconButton
              aria-label="increment"
              view="primary"
              icon={PlusCircleMIcon}
              onClick={handleAddItem}
            />
          </GenericWrapper>
        </Grid.Col>
        <Grid.Col width={{ mobile: 3, tablet: 3, desktop: 3 }}>
          <GenericWrapper alignItems="center" justifyContent="end">
            <Amount value={price * quantity} minority={1} currency="RUB" />

            <Gap size="m" direction="horizontal" />
            <IconButton
              aria-label="delete"
              view="primary"
              icon={CrossCircleMIcon}
              onClick={handleDeleteItem}
            />
          </GenericWrapper>
        </Grid.Col>
      </Grid.Row>
      <Gap size={"m"} />
    </div>
  );
};
