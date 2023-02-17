import { Typography } from "@alfalab/core-components/typography";
import { FC } from "react";
import { Card, CardProps } from "../card";
import "./CardGroup.css";

type extraCardProps = {
  id: number;
  subtitle: string;
  stickerNumbers: number[];
};

export type CardGroupProps = {
  title: string;
  description: string;
  products: (Omit<CardProps, "path"> & extraCardProps)[];
};

export const CardGroup: FC<CardGroupProps> = ({
  title,
  description,
  products,
}) => {
  let cards = products.map(
    ({ id, preview, title, price, availability, subtitle, stickerNumbers }) => (
      <Card
        key={id}
        preview={preview}
        title={title}
        price={price}
        availability={availability}
        path={`/product/${id}`}
      >
        <Typography.TitleResponsive
          className="card__subtitle"
          tag="div"
          view="xsmall"
          color="tertiary"
        >
          {subtitle}
        </Typography.TitleResponsive>
        <div className="card__item-qty">
          Есть такой стикер и еще {stickerNumbers.length - 1}
        </div>
      </Card>
    )
  );

  return (
    <div className="card-group-container">
      <div className="card-group__title">{title}</div>
      <Typography.TitleResponsive tag="div" view="small">
        {description}
      </Typography.TitleResponsive>
      <div className="card-container">{cards}</div>
    </div>
  );
};
