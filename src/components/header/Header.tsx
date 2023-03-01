import { FC } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@alfalab/core-components/typography";
import { ListMIcon } from "@alfalab/icons-glyph/ListMIcon";
import "./Header.css";
import { SidePanelProps } from "../side-panel";

export const Header: FC<Pick<SidePanelProps, "handleView">> = ({
  handleView,
}) => {
  return (
    <div className="header">
      <Link className="title" to={`/`}>
        <Typography.Title tag="h1" weight="bold" view="medium" color="accent">
          A-Store
        </Typography.Title>
      </Link>
      <div className="menu">
        <ListMIcon
          viewBox="0 0 24 24 "
          width={32}
          height={32}
          onClick={handleView}
          className="menu__icon menu__icon_show-pointer"
        />
        <Typography.Title
          tag="h1"
          weight="bold"
          view="medium"
          onClick={handleView}
          className="menu__title menu__title_show-pointer"
        >
          меню
        </Typography.Title>
      </div>
    </div>
  );
};
