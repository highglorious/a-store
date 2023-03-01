import { FC } from "react";
import { Select, SelectProps } from "@alfalab/core-components/select";
import { Gap } from "@alfalab/core-components/gap";
import "./ProductForm.css";
import { colorVariant, ProductType } from "../../types/api";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  colorSelector,
  modelSelector,
  sizeSelector,
  stickerNumberSelector,
} from "../../pages/product/productSelectors";
import { productActions } from "../../pages/product";

export type CustomProductType = Pick<
  ProductType,
  "colors" | "sizes" | "stickerNumbers" | "models"
>;

export const ProductForm: FC<CustomProductType> = ({
  sizes,
  colors,
  stickerNumbers,
  models,
}) => {
  const dispatch = useAppDispatch();
  const color = useAppSelector(colorSelector);
  const size = useAppSelector(sizeSelector);
  const model = useAppSelector(modelSelector);
  const stickerNumber = useAppSelector(stickerNumberSelector);

  const modelOptions = models?.map((v, i) => {
    return { key: `${i}`, value: v, content: v };
  });
  const colorOptions = colors?.map((v, i) => {
    return {
      key: `${i}`,
      value: v,
      content: colorVariant[v as keyof typeof colorVariant],
    };
  });
  const sizeOptions = sizes?.map((v, i) => {
    return { key: `${i}`, value: v, content: v };
  });
  const stickerNumberOptions = stickerNumbers?.map((v, i) => {
    return { key: `${i}`, value: v, content: `${v}` };
  });

  const handleChangeColor: SelectProps["onChange"] = (payload) => {
    dispatch(productActions.setColor(payload?.selected?.value));
  };
  const handleChangeSize: SelectProps["onChange"] = (payload) => {
    dispatch(productActions.setSize(payload?.selected?.value));
  };
  const handleChangeModel: SelectProps["onChange"] = (payload) => {
    dispatch(productActions.setModel(payload?.selected?.value));
  };
  const handleChangeStickerNumber: SelectProps["onChange"] = (payload) => {
    dispatch(productActions.setStickerNumber(payload?.selected?.value));
  };

  return (
    <div className="product-form-container">
      {modelOptions && (
        <>
          <Select
            size="s"
            options={modelOptions}
            block={true}
            label="модель"
            labelView="outer"
            onChange={handleChangeModel}
            selected={modelOptions.find((x) => x.value === model)?.key}
          />
          <Gap size="xs" />
        </>
      )}

      {colorOptions && (
        <>
          <Select
            size="s"
            options={colorOptions}
            block={true}
            label="цвет"
            labelView="outer"
            onChange={handleChangeColor}
            selected={colorOptions.find((x) => x.value === color)?.key}
          />
          <Gap size="xs" />
        </>
      )}
      {sizeOptions && (
        <>
          <Select
            size="s"
            options={sizeOptions}
            block={true}
            label="размер"
            labelView="outer"
            onChange={handleChangeSize}
            selected={sizeOptions.find((x) => x.value === size)?.key}
          />
          <Gap size="xs" />
        </>
      )}

      {stickerNumberOptions && (
        <>
          <Select
            size="s"
            options={stickerNumberOptions}
            block={true}
            label="номер стикера"
            labelView="outer"
            onChange={handleChangeStickerNumber}
            selected={
              stickerNumberOptions.find((x) => x.value === stickerNumber)?.key
            }
          />
          <Gap size="xs" />
        </>
      )}
    </div>
  );
};
