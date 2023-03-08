/* eslint-disable testing-library/no-debugging-utils */
import "@testing-library/jest-dom";
import preview from "jest-preview";
import { fireEvent, render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { OrderForm } from ".";
import { OrderFormValues } from "../../pages/order";
import { defaultFormValues, formSchema } from "../../pages/order/Order";
import { renderWithProviders } from "../../utils/test-utils";
import { store } from "../../store";
import { yupResolver } from "@hookform/resolvers/yup";

const RenderWithFormProvider = () => {
  const methods = useForm<OrderFormValues>({
    defaultValues: defaultFormValues,
    resolver: yupResolver(formSchema),
  });
  return (
    <FormProvider {...methods}>
      <OrderForm />
    </FormProvider>
  );
};

describe("OrderForm Component Test", () => {
  test("should render form with fields and button", async () => {
    renderWithProviders(<RenderWithFormProvider />, { store });

    expect(screen.getByLabelText("ФИО")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Телефон")).toBeInTheDocument();
    expect(screen.getByLabelText("Адрес")).toBeInTheDocument();
    expect(screen.getByText("Доставка")).toBeInTheDocument();
    expect(screen.getByText("Комментарий к заказу")).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { checked: false })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "next" })).toBeInTheDocument();
  });

  test("should display required error when inputs is empty", async () => {
    renderWithProviders(<RenderWithFormProvider />, { store });

    await fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(
      await screen.findAllByText("Обязательное поле для заполнения")
    ).toHaveLength(3);
  });

  test("should display required error when change delivery state", async () => {
    renderWithProviders(<RenderWithFormProvider />, { store });

    await fireEvent.click(screen.getByRole("radio", { name: /России/i }));
    await fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(
      await screen.findAllByText("Обязательное поле для заполнения")
    ).toHaveLength(4);
  });

  test("should display matching error when email is invalid", async () => {
    renderWithProviders(<RenderWithFormProvider />, { store });

    fireEvent.input(screen.getByRole("textbox", { name: /E-mail/i }), {
      target: {
        value: "invalid-email",
      },
    });

    await fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(
      await screen.findByText("Поле заполнено некорректно")
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /E-mail/i })).toHaveValue(
      "invalid-email"
    );
  });

  test("should not display matching or requred error when inputs is valid", async () => {
    renderWithProviders(<RenderWithFormProvider />, { store });

    await fireEvent.click(screen.getByRole("radio", { name: /России/i }));

    fireEvent.input(screen.getByRole("textbox", { name: /ФИО/i }), {
      target: {
        value: "Ivanov Viacheslav",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: /E-mail/i }), {
      target: {
        value: "valid@email.com",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: /Телефон/i }), {
      target: {
        value: "9999999999",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: /Адрес/i }), {
      target: {
        value: "680051, Хабаровск, Суворва 71 - 45",
      },
    });

    await fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(
      screen.queryAllByText("Обязательное поле для заполнения")
    ).toHaveLength(0);

    expect(
      screen.queryByText("Поле заполнено некорректно")
    ).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /E-mail/i })).toHaveValue(
      "valid@email.com"
    );
    expect(
      screen.queryByText("Используйте только буквы, пробел и символ -")
    ).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /ФИО/i })).toHaveValue(
      "Ivanov Viacheslav"
    );
    expect(screen.queryByText("Введен неполный номер")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Телефон/i })).toHaveValue(
      "+7 999 999-99-99"
    );
    expect(screen.getByRole("textbox", { name: /Адрес/i })).toHaveValue(
      "680051, Хабаровск, Суворва 71 - 45"
    );
  });

  test("should display matching error when phone number is invalid", async () => {
    renderWithProviders(<RenderWithFormProvider />, { store });

    fireEvent.input(screen.getByRole("textbox", { name: /Телефон/i }), {
      target: {
        value: "99999",
      },
    });

    await fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(
      await screen.findByText("Введен неполный номер")
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Телефон/i })).toHaveValue(
      "+7 999 99"
    );
  });

  test("should not display required error when agreement is not checked", async () => {
    renderWithProviders(<RenderWithFormProvider />, { store });

    await fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(
      screen.getByRole("checkbox", { checked: false })
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Необходимо Ваше согласие")
    ).toBeInTheDocument();
  });

  test("should display matching error when fullname is invalid", async () => {
    renderWithProviders(<RenderWithFormProvider />, { store });

    fireEvent.input(screen.getByRole("textbox", { name: /ФИО/i }), {
      target: {
        value: "99999 @@ ^%",
      },
    });

    await fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(
      await screen.findByText("Используйте только буквы, пробел и символ -")
    ).toBeInTheDocument();
  });
});
