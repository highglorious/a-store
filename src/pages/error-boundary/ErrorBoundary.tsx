import { FC } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import "./ErrorBoundary.css";

export const ErrorBoundary: FC = () => {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-page ">
        <h1>Ой! {error.status}</h1>
        <p>Такой страницы больше нет</p>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
      </div>
    );
  } else {
    return (
      <div className="error-page ">
        <h1>Ой!</h1>
        <p>Что-то пошло не так.</p>
      </div>
    );
  }
};
