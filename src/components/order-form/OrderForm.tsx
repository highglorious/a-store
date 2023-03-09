import { FC, ReactNode, useCallback, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFormContext,
  FieldValues,
  useWatch,
} from "react-hook-form";
import { PhoneInput } from "@alfalab/core-components/phone-input";
import { Textarea } from "@alfalab/core-components/textarea";
import { Input } from "@alfalab/core-components/input";
import { RadioGroup } from "@alfalab/core-components/radio-group";
import { Radio } from "@alfalab/core-components/radio";
import { Checkbox } from "@alfalab/core-components/checkbox";
import { GenericWrapper } from "@alfalab/core-components/generic-wrapper";
import { Gap } from "@alfalab/core-components/gap";
import { Button } from "@alfalab/core-components/button";
import { Notification } from "@alfalab/core-components/notification";

import "./OrderForm.css";
import { createOrder } from "../../api/fetchData";
import { useAppSelector } from "../../hooks";
import { itemsCartSelector } from "../cart/cartSelectors";
import {
  CreateOrderType,
  deliveryDesription,
  DeliveryStateType,
} from "../../types/api";
import { cartActions } from "../cart/cartSlice";
import { useDispatch } from "react-redux";

export const OrderForm: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const hideNotification = useCallback(() => setIsVisible(false), []);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useFormContext();
  const deliveryState = useWatch({ name: "delivery" });
  const addressIsActive = deliveryState === "self" ? true : false;
  const cartItems = useAppSelector(itemsCartSelector);

  const products = cartItems.map(
    ({ id, preview, title, price, quantity, ...rest }) => ({
      id,
      totalPrice: price * quantity,
      totalCount: quantity,
      ...rest,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async ({
    name,
    email,
    phone,
    address,
    delivery,
    comment,
  }) => {
    try {
      const order: CreateOrderType = {
        name,
        email,
        phone,
        address,
        deliveryType: deliveryDesription[delivery as DeliveryStateType],
        paymentType: "Банковская карта",
        products,
      };
      if (comment) {
        order.comment = comment;
      }

      const res = await createOrder(order);

      if (!res.ok) {
        throw new Error();
      }
      dispatch(cartActions.clearCart());
      reset();
    } catch (e) {
      setIsVisible(true);
    }
  };

  return (
    <GenericWrapper column grow>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder={"Фамилия Имя Отчество"}
            block={true}
            label="ФИО"
            size="m"
            error={errors?.name?.message as ReactNode}
            labelView="outer"
          />
        )}
      />
      <Gap size={"s"} />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder={"example@site.ru"}
            block={true}
            type="email"
            labelView="outer"
            label="E-mail"
            error={errors?.email?.message as ReactNode}
          />
        )}
      />
      <Gap size={"s"} />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <PhoneInput
            {...field}
            placeholder="Номер телефона"
            block={true}
            labelView="outer"
            label="Телефон"
            error={errors?.phone?.message as ReactNode}
          />
        )}
      />
      <Gap size={"s"} />
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            block={true}
            labelView="outer"
            label="Адрес"
            size="m"
            error={errors?.address?.message as ReactNode}
            placeholder={"Индекс, город, улица, дом, квартира"}
            disabled={addressIsActive}
            value={addressIsActive ? "пр-т Андропова, 18 корп. 3" : undefined}
          />
        )}
      />
      <Gap size={"s"} />
      <Controller
        name="delivery"
        control={control}
        render={({ field }) => (
          <RadioGroup {...field} label="Доставка" error={false}>
            <Radio label="Доставка по России — 350₽" value="country" size="m" />
            <Radio label="Курьером по Москве — 300₽" value="city" size="m" />
            <Radio
              label="Самовывоз (пр-т Андропова, 18 корп. 3)"
              value="self"
              size="m"
            />
          </RadioGroup>
        )}
      />
      <Gap size={"s"} />
      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            autosize={false}
            resize="vertical"
            minRows={3}
            block={true}
            label={"Комментарий к заказу"}
            labelView="outer"
            maxLength={512}
            showCounter={true}
            error={errors?.comment?.message as ReactNode}
          />
        )}
      />
      <Gap size={"s"} />
      <Controller
        name="agreement"
        control={control}
        render={({ field }) => (
          <Checkbox
            {...field}
            block={true}
            size="m"
            checked={field.value}
            label="Согласен с политикой конфиденциальности и обработки персональных данных"
            error={errors?.agreement?.message as ReactNode}
          />
        )}
      />
      <Gap size={"s"} />
      <Button
        aria-label="next"
        size="m"
        view="primary"
        onClick={handleSubmit(onSubmit)}
      >
        Дальше
      </Button>
      <Notification
        badge="negative"
        title="Что-то пошло не так!"
        visible={isVisible}
        offset={180}
        onClickOutside={hideNotification}
        onClose={hideNotification}
        onCloseTimeout={hideNotification}
      >
        Попробуйте позже.
      </Notification>
    </GenericWrapper>
  );
};
