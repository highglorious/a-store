import { FC, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, InferType, boolean } from "yup";
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
import {
  CreateOrderType,
  DeliveryStateType,
  deliveryVariant,
} from "../../types/api";
import { Spinner } from "@alfalab/core-components/spinner";

export type OrderFormValues = Pick<
  CreateOrderType,
  "name" | "email" | "phone" | "address" | "comment"
> & {
  delivery: DeliveryStateType;
  agreement: boolean;
};

export const defaultFormValues: OrderFormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  comment: "",
  delivery: "self",
  agreement: false,
};

const requiredFieldMessage = "Обязательное поле для заполнения";
const phoneRegExp = /^[0-9+\- ]{16}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegExp = /^[A-zА-я\s-]+$/;

export const formSchema = object({
  name: string()
    .required(requiredFieldMessage)
    .matches(nameRegExp, "Используйте только буквы, пробел и символ -")
    .trim()
    .max(256, "Максимальное количество символов 256"),

  email: string()
    .email("Поле заполнено некорректно")
    .required(requiredFieldMessage)
    .matches(emailRegExp, "Поле заполнено некорректно"),
  phone: string()
    .required(requiredFieldMessage)
    .matches(phoneRegExp, "Введен неполный номер"),
  address: string()
    .trim()
    .max(256, "Максимальное количество символов 256")
    .when("delivery", {
      is: "self",
      then: (schema) => schema,
      otherwise: (schema) => schema.required(requiredFieldMessage),
    }),
  comment: string().trim().max(512),
  delivery: string<DeliveryStateType>().required(),
  agreement: boolean().oneOf([true], "Необходимо Ваше согласие").required(),
});

export const Order: FC = () => {
  const methods = useForm<OrderFormValues>({
    defaultValues: defaultFormValues,
    resolver: yupResolver(formSchema),
  });
  const cartItems = useAppSelector(itemsCartSelector);
  const totalPrice = useMemo(() => totalCostOfItems(cartItems), [cartItems]);
  const deliveryState: DeliveryStateType = useWatch({
    control: methods.control,
    name: "delivery",
  });

  const {
    formState: { isSubmitSuccessful, isSubmitting },
  } = methods;

  if (isSubmitting) {
    return <Spinner visible={true} size="m" />;
  }

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
            {isSubmitSuccessful ? "Заказ создан успешно!" : "Корзина пуста"}
          </Typography.TitleResponsive>
        </div>
      )}
    </div>
  );
};
