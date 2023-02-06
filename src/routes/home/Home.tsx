import { Link } from "react-router-dom";
import "./Home.css";
import rightPic from "./Frame_45.jpeg";
import leftPic from "./Frame_46.jpeg";
import { Typography } from "@alfalab/core-components/typography";

export const Home = () => {
  return (
    <div className="home-container">
      <Link className="link-wrapper" to={"made-in-alfa"}>
        <img
          className="link-wrapper__image link-wrapper__image_hover"
          src={leftPic}
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
          src={rightPic}
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
