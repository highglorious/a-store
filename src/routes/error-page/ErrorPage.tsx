import { FC } from "react";
import "./ErrorPage.css";
export const ErrorPage: FC = () => {
  //const error: ReturnType<typeof useRouteError> = useRouteError();
  //console.error(error);

  return (
    <div className="error-page">
      <h1>Ой! Ошибка</h1>
    </div>
  );
};
