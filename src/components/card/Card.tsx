import { Typography } from "@alfalab/core-components/typography";
import { FC } from "react";
import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";
import "./Card.css";

export type CardProps = {
  preview: string;
  title: string;
  price: number;
  availability: boolean;
  path: string;
};

export const Card: FC<CardProps> = ({
  preview,
  title,
  price,
  availability,
  path,
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
      <Typography.TitleResponsive
        className="card-wrapper__price"
        view="medium"
        weight="bold"
        tag="div"
        color="primary"
        id="target"
      >
        {availability ? formatCurrency(price) : "Нет в наличии"}
      </Typography.TitleResponsive>
    </Link>
  );
};
