import { createBrowserRouter } from "react-router-dom";
import { Root } from "./root";
import { Cart } from "./cart";
import { ContactUs } from "./contact-us";
import { CustomDesign } from "./custom-design";
import { Home } from "./home";
import { MadeInAlfa } from "./made-in-alfa/";
import { ErrorPage } from "./error-page";
import { Product } from "./product";

export const routesConfig = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "made-in-alfa",
        element: <MadeInAlfa />,
      },
      {
        path: "custom-design",
        element: <CustomDesign />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "product/:productId",
        element: <Product />,
      },
    ],
  },
];
const router = createBrowserRouter(routesConfig);
export default router;
