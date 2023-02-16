import { FC, useState } from "react";
import { SelectResponsive } from "@alfalab/core-components/select/responsive";
import "./ProductForm.css";
import { Gap } from "@alfalab/core-components/gap";

export type CustomProductFormProps = {
  colors?: string[];
  sizes?: string[];
  stickerNumbers?: number[];
  models?: string[];
};

export const ProductForm: FC<CustomProductFormProps> = ({
  sizes,
  colors,
  stickerNumbers,
  models,
}) => {
  return (
    <div className="product-form-container">
      {models && (
        <>
          <SelectResponsive
            size="s"
            options={models.map((v, i) => {
              return { key: `${i}`, content: `${v}` };
            })}
            block={true}
            label="модель"
            labelView="outer"
          />
          <Gap size="xs" />
        </>
      )}

      {colors && (
        <>
          <SelectResponsive
            size="s"
            options={colors.map((v, i) => {
              return { key: `${i}`, content: `${v}` };
            })}
            block={true}
            label="цвет"
            labelView="outer"
          />
          <Gap size="xs" />
        </>
      )}
      {sizes && (
        <>
          <SelectResponsive
            size="s"
            options={sizes.map((v, i) => {
              return { key: `${i}`, content: `${v}` };
            })}
            block={true}
            label="размер"
            labelView="outer"
          />
          <Gap size="xs" />
        </>
      )}

      {stickerNumbers && (
        <>
          <SelectResponsive
            size="s"
            options={stickerNumbers.map((v, i) => {
              return { key: `${i}`, content: `${v}` };
            })}
            block={true}
            label="номер стикера"
            labelView="outer"
          />
          <Gap size="xs" />
        </>
      )}
    </div>
  );
};
