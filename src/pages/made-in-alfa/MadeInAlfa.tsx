import { FC, useCallback, useEffect, useMemo } from "react";
import { Typography } from "@alfalab/core-components/typography";
import { Spinner } from "@alfalab/core-components/spinner";
import { Skeleton } from "@alfalab/core-components/skeleton";
import "./MadeInAlfa.css";
import { Card } from "../../components/card";
import { madeInAlfaActions } from "./madeInAlfaSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  hasErrorSelector,
  isLoadingSelector,
  productListSelector,
} from "./madeInAlfaSelectors";
import { ErrorBoundary } from "../../pages/error-boundary";

export const MadeInAlfa: FC = () => {
  const dispatch = useAppDispatch();
  const productList = useAppSelector(productListSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const hasError = useAppSelector(hasErrorSelector);

  useEffect(() => {
    dispatch(madeInAlfaActions.request());
  }, []);

  const cards = useMemo(
    () =>
      productList.map(({ id, preview, title, price, availability }) => (
        <Card
          key={id}
          preview={preview}
          title={title}
          price={price}
          availability={availability}
          path={`/product/${id}`}
        />
      )),
    [productList]
  );

  if (isLoading) {
    return <Spinner visible={true} size="m" />;
  }

  if (hasError) {
    return <ErrorBoundary />;
  }

  return (
    <div className="made-in-alfa-container">
      <div className="made-in-alfa-container__title">Сделано в Альфе</div>

      <Typography.TitleResponsive tag="div" view="small">
        Хотим каждую из этих вещей! Себе, родным и друзьям
      </Typography.TitleResponsive>

      <div className="made-in-alfa-container__card-container">{cards}</div>
    </div>
  );
};
