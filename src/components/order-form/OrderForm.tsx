import { FC } from "react";
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
import { MaskedInput } from "@alfalab/core-components/masked-input";
import { GenericWrapper } from "@alfalab/core-components/generic-wrapper";
import { Gap } from "@alfalab/core-components/gap";
import { Button } from "@alfalab/core-components/button";
import { Typography } from "@alfalab/core-components/typography";
import emailMask from "text-mask-addons/dist/emailMask";
import "./OrderForm.css";

export const OrderForm: FC = () => {
  const { handleSubmit, control, watch } = useFormContext();
  const deliveryState = useWatch({ name: "delivery" });
  const addressIsActive = deliveryState === "self" ? true : false;

  const agreementState = useWatch({ name: "agreement" });

  const onSubmit: SubmitHandler<FieldValues> = (formData) =>
    console.log(formData);

  return (
    <GenericWrapper column grow>
      <Controller
        name="name"
        control={control}
        rules={{ required: true, maxLength: 40 }}
        render={({ field }) => (
          <Input
            {...field}
            placeholder={"Фамилия Имя Отчество"}
            block={true}
            label="ФИО"
            size="m"
            error={false}
            labelView="outer"
          />
        )}
      />
      <Gap size={"s"} />
      <Controller
        name="email"
        control={control}
        rules={{ required: true, pattern: /^\S+@\S+$/i }}
        render={({ field }) => (
          <MaskedInput
            {...field}
            // mask={emailMask}
            placeholder={"example@site.ru"}
            block={true}
            type="email"
            labelView="outer"
            label="E-mail"
            error={false}
          />
        )}
      />
      <Gap size={"s"} />
      <Controller
        name="phone"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <PhoneInput
            {...field}
            placeholder="Номер телефона"
            block={true}
            labelView="outer"
            label="Телефон"
            error={false}
          />
        )}
      />
      <Gap size={"s"} />
      <Controller
        name="address"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            {...field}
            block={true}
            labelView="outer"
            label="Адрес"
            size="m"
            error={false}
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
        // rules={{ required: true }}
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
        // rules={{ required: true }}
        render={({ field }) => (
          <Textarea
            {...field}
            autosize={false}
            resize="vertical"
            minRows={3}
            block={true}
            label={"Комментарий к заказу"}
            labelView="outer"
            maxLength={96}
            showCounter={true}
            error={false}
          />
        )}
      />
      <Gap size={"s"} />
      <Controller
        name="agreement"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Checkbox
            {...field}
            block={true}
            size="m"
            checked={field.value}
            label="Согласен с политикой конфиденциальности и обработки персональных данных"
            error={false}
          />
        )}
      />
      <Gap size={"s"} />
      <Button
        aria-label="next"
        size="m"
        view="primary"
        onClick={handleSubmit(onSubmit)}
        disabled={!agreementState}
      >
        Дальше
      </Button>
    </GenericWrapper>
  );
};
