import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { ListMIcon } from "@alfalab/icons-glyph/ListMIcon";
import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
  return (
    <div className="header">
      <Link style={{ textDecoration: "none" }} to={`/`} className="title">
        <Typography.Title tag="h1" weight="bold" view="medium" color="accent">
          A-Store
        </Typography.Title>
      </Link>
      <div className="menu">
        <ListMIcon viewBox="0 0 24 24 " width={32} height={32} />
        <Gap direction="horizontal" size="s"></Gap>
        <Typography.Title tag="h1" weight="bold" view="medium">
          меню
        </Typography.Title>
      </div>
    </div>
  );
};
