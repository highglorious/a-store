import { FC } from "react";
import "./MadeInAlfa.css";
import { Typography } from "@alfalab/core-components/typography";
import data from "./products.json";
import { Card } from "../../components/card";

export const MadeInAlfa: FC = () => {
  const { products } = data;
  let cards = products.map(({ id, preview, title, price, availability }) => (
    <Card
      key={id}
      preview={preview}
      title={title}
      price={price}
      availability={availability}
      path={"/"}
    />
  ));

  return (
    <div className="made-in-alfa-container">
      <div className="made-in-alfa__title">Сделано в Альфе</div>

      <Typography.TitleResponsive tag="div" view="small">
        Хотим каждую из этих вещей! Себе, родным и друзьям
      </Typography.TitleResponsive>

      <div className="card-container">{cards}</div>
    </div>
  );
};
