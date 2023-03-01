import { FC, useCallback, useEffect } from "react";
import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { Spinner } from "@alfalab/core-components/spinner";
import "./CustomDesign.css";
import { CardGroup } from "../../components/card-group";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { customDesignActions } from "./customDesignSlice";
import {
  hasErrorSelector,
  isLoadingSelector,
  productGroupSelector,
} from "./customDesignSelectors";
import { ErrorBoundary } from "../error-boundary";

export const CustomDesign: FC = () => {
  const dispatch = useAppDispatch();
  const productGroup = useAppSelector(productGroupSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const hasError = useAppSelector(hasErrorSelector);

  useEffect(() => {
    dispatch(customDesignActions.request());
  }, []);

  const cardGroup = productGroup.map(({ id, title, description, products }) => (
    <CardGroup
      id={id}
      key={id}
      title={title}
      description={description}
      products={products}
    />
  ));
  if (isLoading) {
    return <Spinner visible={true} size="m" />;
  }
  if (hasError) {
    return <ErrorBoundary />;
  }
  return (
    <div className="custom-design-container">
      <div className="custom-design__title">Свой дизайн</div>
      <Typography.TitleResponsive
        className="custom-design__subtitle"
        tag="div"
        view="small"
      >
        Выберите вещь, а затем — цвет, размер и стикер. Перенесём стикер на вещь
        как на фото
      </Typography.TitleResponsive>
      <Gap size="l" />
      <div>{cardGroup}</div>
    </div>
  );
};
