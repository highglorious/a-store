/* eslint-disable testing-library/no-debugging-utils */
import "@testing-library/jest-dom";
import preview from "jest-preview";
import { fireEvent, render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { OrderForm } from ".";
import { OrderFormValues } from "../../pages/order";

const RenderWithFormProvider = () => {
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
  return (
    <FormProvider {...methods}>
      <OrderForm />
    </FormProvider>
  );
};

describe("OrderForm Component Test", () => {
  test("should render form with fields and button", async () => {
    render(<RenderWithFormProvider />);

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
});
