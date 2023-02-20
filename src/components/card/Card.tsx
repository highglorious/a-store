import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@alfalab/core-components/typography";
import "./Card.css";
import formatCurrency from "../../utils/formatCurrency";

export type CardProps = {
  preview: string;
  title: string;
  price: number;
  availability: boolean;
  path: string;
};

export const Card: FC<PropsWithChildren<CardProps>> = ({
  preview,
  title,
  price,
  availability,
  path,
  children,
}) => {
  return (
    <Link className="card-wrapper" to={path} data-testid="product-card">
      <img className="card-wrapper__image" src={preview} alt={title} />
      <Typography.TitleResponsive
        className="card-wrapper__title"
        view="small"
        tag="div"
        color="primary"
      >
        {title}
      </Typography.TitleResponsive>
      {children}
      <Typography.TitleResponsive
        className="card-wrapper__price"
        view="medium"
        weight="bold"
        tag="div"
        color="primary"
      >
        {availability ? formatCurrency(price) : "Нет в наличии"}
      </Typography.TitleResponsive>
    </Link>
  );
};
