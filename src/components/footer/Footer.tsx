import { Typography } from "@alfalab/core-components/typography";
import { FC } from "react";
import "./Footer.css";
export const Footer: FC = () => {
  return (
    <div className="footer">
      <Typography.Text view="primary-medium" color="tertiary" weight="bold">
        © ООО «Альфа Фьюче Пипл», 2022
      </Typography.Text>
    </div>
  );
};
