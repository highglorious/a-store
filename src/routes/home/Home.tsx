import { Link } from "react-router-dom";
import "./Home.css";
import customDesignImage from "./custom-design-link-img.jpeg";
import madeInAlfaImage from "./made-in-alfa-link-img.jpeg";
import { Typography } from "@alfalab/core-components/typography";
import { FC } from "react";

export const Home: FC = () => {
  return (
    <div className="home-container">
      <Link className="link-wrapper" to={"made-in-alfa"}>
        <img
          className="link-wrapper__image link-wrapper__image_hover"
          src={madeInAlfaImage}
          alt="Сделано в Альфе"
        />
        <Typography.TitleResponsive
          view="medium"
          weight="bold"
          tag="div"
          color="primary"
          id="target"
          className="link-wrapper__text"
        >
          Сделано в Альфе
        </Typography.TitleResponsive>
      </Link>
      <Link className="link-wrapper" to={"custom-design"}>
        <img
          className="link-wrapper__image link-wrapper__image_hover"
          src={customDesignImage}
          alt="Свой дизайн"
        />
        <Typography.TitleResponsive
          view="medium"
          weight="bold"
          tag="div"
          color="primary"
          id="target"
          className="link-wrapper__text"
        >
          Свой дизайн
        </Typography.TitleResponsive>
      </Link>
    </div>
  );
};
