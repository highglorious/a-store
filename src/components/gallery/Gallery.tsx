import { FC, useMemo, useState } from "react";
import "./Gallery.css";
import { ProductType } from "../../types/api";

type GalleryProps = Pick<ProductType, "images">;

export const Gallery: FC<GalleryProps> = ({ images }) => {
  const [viewImage, setViewImage] = useState<number>(0);

  const listImages = useMemo(
    () =>
      images?.map((image, index) => (
        <img
          data-testid="list-img"
          className={
            "gallery__list-image" +
            (index === viewImage ? " gallery__list-image_active" : "")
          }
          key={index}
          src={image}
          alt={`custom design ${index}`}
          onClick={() => previewImageHandler(index)}
        />
      )),
    [images, viewImage]
  );

  const previewImageHandler = (index: number) => {
    setViewImage(index);
  };

  return (
    <div className="gallery-container">
      <img
        data-testid="preview-img"
        className="gallery__preview-image"
        src={images?.at(viewImage)}
        alt={"preview selected custom design"}
      />
      <div className="gallery__list-image-container">{listImages}</div>
    </div>
  );
};
