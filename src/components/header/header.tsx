import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { ListMIcon } from "@alfalab/icons-glyph/ListMIcon";
import { Link } from "react-router-dom";
import "./header.css";
import { SidePanelProps } from "../../routes/root/Root";
import { IconButton } from "@alfalab/core-components/icon-button";

export const Header = ({ handleView }: Pick<SidePanelProps, "handleView">) => {
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
