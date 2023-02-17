import { FC } from "react";
import "./CustomDesign.css";
import { Typography } from "@alfalab/core-components/typography";
import data from "./groups.json";
import { CardGroup } from "../../components/card-group";
import { Gap } from "@alfalab/core-components/gap";

export const CustomDesign: FC = () => {
  const { groups } = data;
  let cardGroups = groups.map(({ id, title, description, products }) => (
    <CardGroup
      key={id}
      title={title}
      description={description}
      products={products}
    />
  ));

  return (
    <div className="custom-design-container">
      <div className="custom-design__title">Свой дизайн</div>
      <Typography.TitleResponsive
        className="custom-design__subtitle"
        tag="div"
        view="small"
      >
        Выберите вещь, а затем — цвет, размер и стикер. Перенесём стикер на вещь
        как на фото
      </Typography.TitleResponsive>
      <Gap size="l" />
      <div>{cardGroups}</div>
    </div>
  );
};
