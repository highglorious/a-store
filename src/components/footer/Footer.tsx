import { FC } from "react";
import { Typography } from "@alfalab/core-components/typography";
import "./Footer.css";
export const Footer: FC = () => {
  return (
    <div className="footer">
      <Typography.Text view="primary-medium" color="tertiary" weight="bold">
        © ООО «Альфа Фьюче Пипл», 2023
      </Typography.Text>
    </div>
  );
};
