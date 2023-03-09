import { FC } from "react";
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  TypeSelector,
} from "@pbe/react-yandex-maps";
import { Gap } from "@alfalab/core-components/gap";
import { Typography } from "@alfalab/core-components/typography";

import "./ContactUs.css";
import { GenericWrapper } from "@alfalab/core-components/generic-wrapper";

export const ContactUs: FC = () => {
  const defaultState = {
    center: [55.694567, 37.661781],
    zoom: 15,
    controls: [],
  };
  return (
    <GenericWrapper
      grow
      column
      justifyContent="center"
      alignItems="start"
      className="contacts-container"
    >
      <h1 className="contacts-container__title">Контакты</h1>
      <Typography.Text
        view="primary-large"
        weight="bold"
        tag="span"
        color="primary"
      >
        +7 906 061 60 20
        <br />
        info@alfabankstore.ru
        <Gap size={"s"} />
        г. Москва, пр-т Андропова, 18 корп. 3
        <Gap size={"s"} />
        <b>пн-чт:</b>
        <br />
        10:00—19:00
        <br />
        <b>пт:</b>
        <br />
        10:00—17:30
        <Gap size={"s"} />
        Принимаем к оплате карты Visa, Mastercard, МИР.
      </Typography.Text>
      <Gap size={"l"} />
      <YMaps>
        <Map
          defaultState={defaultState}
          className="contacts-container__map-container"
        >
          <Placemark
            modules={["geoObject.addon.balloon"]}
            geometry={[55.694567, 37.661781]}
            properties={{
              balloonContentBody: "Штаб-квартира на Технопарке",
            }}
          />
          <ZoomControl />
          <TypeSelector />
        </Map>
      </YMaps>
    </GenericWrapper>
  );
};
