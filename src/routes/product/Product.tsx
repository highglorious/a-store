import { FC } from "react";
import { Gallery } from "../../components/Gallery";
import "./Product.css";
import data from "./custom-products.json";
import { Typography } from "@alfalab/core-components/typography";
import formatCurrency from "../../utils/formatCurrency";
import { useParams } from "react-router-dom";
import { ProductForm } from "../../components/product-form";
import { Gap } from "@alfalab/core-components/gap";
import { Button } from "@alfalab/core-components/button";

type ProductProps = {
  id: number;
  preview: string;
  images: string[];
  title: string;
  subtitle?: string;
  price: number;
  description: string;
  colors?: string[];
  sizes?: string[];
  stickerNumbers?: number[];
  models?: string[];
  availability: boolean;
};

export const Product: FC = () => {
  const { productId } = useParams();

  const product: ProductProps = data.products.filter(
    (product) => product.id === parseInt(productId!)
  )[0];

  const {
    images,
    title,
    price,
    description,
    sizes,
    colors,
    stickerNumbers,
    models,
    availability,
  } = product;

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
          <Gap size="m" />
          <Typography.TitleResponsive
            className="product-block__price"
            view="medium"
            weight="bold"
            tag="div"
            color="primary"
          >
            {formatCurrency(price)}
          </Typography.TitleResponsive>
          <Gap size="s" />
          <ProductForm
            sizes={sizes}
            colors={colors}
            models={models}
            stickerNumbers={stickerNumbers}
          />
          <Gap size="m" />
          <Button size="m" view="primary" disabled={!availability}>
            {availability ? "В корзину" : "Нет в наличии"}
          </Button>
          <Gap size="m" />
          <Typography.TitleResponsive
            className="product-block__description"
            view="xsmall"
            weight="regular"
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
