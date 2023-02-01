import { Typography } from "@alfalab/core-components/typography";
import "./footer.css";
export const Footer = () => {
  return (
    <div className="footer">
      <Typography.Text view="primary-medium" color="tertiary" weight="bold">
        © ООО «Альфа Фьюче Пипл», 2022
      </Typography.Text>
    </div>
  );
};
