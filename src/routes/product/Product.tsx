import { FC } from "react";
import { Gallery } from "../../components/Gallery";
import "./Product.css";
import data from "./custom-products.json";
import { Typography } from "@alfalab/core-components/typography";
import formatCurrency from "../../utils/formatCurrency";
import { useParams } from "react-router-dom";

export const Product: FC = () => {
  const { productId } = useParams();
  const { images, title, price, description } = data.customProducts.filter(
    (product) => product.id === parseInt(productId!)
  )[0];
  return (
    <div className="product-container">
      <div className="product-block-wrapper">
        <div className="product-block">
          <Gallery images={images} />
        </div>
        <div className="product-block">
          <Typography.TitleResponsive
            className="product-block__title"
            view="small"
            weight="medium"
            tag="h1"
            color="primary"
          >
            {title}
          </Typography.TitleResponsive>
          <Typography.TitleResponsive
            className="product-block__price"
            view="medium"
            weight="bold"
            tag="div"
            color="primary"
          >
            {formatCurrency(price)}
          </Typography.TitleResponsive>
          <Typography.TitleResponsive
            className="product-block__description"
            view="xsmall"
            weight="medium"
            tag="div"
            color="primary"
          >
            {description}
          </Typography.TitleResponsive>
        </div>
      </div>
    </div>
  );
};
