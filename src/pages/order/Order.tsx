import { FC, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Amount } from "@alfalab/core-components/amount";
import { Divider } from "@alfalab/core-components/divider";
import { Gap } from "@alfalab/core-components/gap";
import { GenericWrapper } from "@alfalab/core-components/generic-wrapper";
import { Grid } from "@alfalab/core-components/grid";
import { Typography } from "@alfalab/core-components/typography";
import "./Order.css";
import { Cart } from "../../components/cart";
import { itemsCartSelector } from "../../components/cart/cartSelectors";
import { OrderForm } from "../../components/order-form";
import { useAppSelector } from "../../hooks";
import { totalCostOfItems } from "../../utils/totalCostOfItems";
import { DeliveryStateType, deliveryVariant } from "../../types/api";

export type OrderFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
  delivery: DeliveryStateType;
  agreement: boolean;
};

export const Order: FC = () => {
  const methods = useForm<OrderFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
      delivery: "self",
      agreement: false,
    },
  });
  const cartItems = useAppSelector(itemsCartSelector);
  const totalPrice = useMemo(() => totalCostOfItems(cartItems), [cartItems]);
  const deliveryState: DeliveryStateType = useWatch({
    control: methods.control,
    name: "delivery",
  });

  return (
    <div className="order-container">
      <Typography.TitleResponsive view="small" tag="div" color="primary">
        Ваш заказ
      </Typography.TitleResponsive>
      <Divider />
      <Gap size="m" />
      {cartItems.length !== 0 ? (
        <Grid.Row gutter={{ mobile: 16, tablet: 16, desktop: 24 }}>
          <Grid.Col
            width={{ mobile: 12, tablet: 5, desktop: 6 }}
            order={{ mobile: "last", tablet: "first", desktop: "first" }}
          >
            <FormProvider {...methods}>
              <OrderForm />
            </FormProvider>
          </Grid.Col>
          <Grid.Col
            width={{ mobile: 12, tablet: 7, desktop: 6 }}
            order={{ mobile: "first", tablet: "last", desktop: "last" }}
          >
            <Cart />
            <GenericWrapper justifyContent="between" alignItems="center">
              <Typography.Text
                view="primary-medium"
                weight="bold"
                tag="div"
                color="primary"
              >
                Доставка:
              </Typography.Text>
              <Amount
                value={deliveryVariant[deliveryState]}
                minority={1}
                currency="RUB"
                bold="full"
              />
            </GenericWrapper>
            <Gap size="m" />
            <GenericWrapper justifyContent="between" alignItems="center">
              <Typography.Text
                view="primary-medium"
                weight="bold"
                tag="div"
                color="primary"
              >
                Итого:
              </Typography.Text>
              <Amount
                value={deliveryVariant[deliveryState] + totalPrice}
                minority={1}
                currency="RUB"
                bold="full"
              />
            </GenericWrapper>
            <Gap size="m" />
          </Grid.Col>
        </Grid.Row>
      ) : (
        <div className="order_empty-wrapper">
          <Typography.TitleResponsive view="xlarge" tag="div" color="primary">
            Корзина пуста
          </Typography.TitleResponsive>
        </div>
      )}
    </div>
  );
};
