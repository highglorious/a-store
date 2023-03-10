import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { Button } from "@alfalab/core-components/button";
import { Spinner } from "@alfalab/core-components/spinner";
import "./Product.css";
import { Gallery } from "../../components/gallery";
import formatCurrency from "../../utils/formatCurrency";
import { ProductForm } from "../../components/product-form";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { productActions } from "./productSlice";
import {
  colorSelector,
  hasErrorSelector,
  isLoadingSelector,
  itemProductSelector,
  modelSelector,
  sizeSelector,
  stickerNumberSelector,
} from "./productSelectors";
import { cartActions } from "../../components/cart/cartSlice";

export const Product: FC = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const {
    id,
    images,
    preview,
    title,
    price,
    description,
    sizes,
    colors,
    stickerNumbers,
    models,
    availability,
  } = useAppSelector(itemProductSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const hasError = useAppSelector(hasErrorSelector);
  const size = useAppSelector(sizeSelector);
  const color = useAppSelector(colorSelector);
  const model = useAppSelector(modelSelector);
  const stickerNumber = useAppSelector(stickerNumberSelector);

  useEffect(() => {
    dispatch(productActions.request(productId!));
  }, [productId, dispatch]);

  if (isLoading) {
    return <Spinner visible={true} size="m" />;
  }

  if (hasError) {
    throw new Error("Fetch error");
  }
  const handleAddToCart = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        preview,
        price,
        color,
        size,
        model,
        stickerNumber,
        quantity: 1,
      })
    );
  };

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
          <Button
            size="m"
            view="primary"
            disabled={!availability}
            onClick={handleAddToCart}
          >
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
