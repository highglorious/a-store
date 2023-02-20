import { createBrowserRouter } from "react-router-dom";
import { Root } from "./root";
import { Cart } from "../pages/cart";
import { ContactUs } from "../pages/contact-us";
import { CustomDesign } from "../pages/custom-design";
import { Home } from "../pages/home";
import { MadeInAlfa } from "../pages/made-in-alfa/";
import { ErrorBoundary } from "../pages/error-boundary";
import { Product } from "../pages/product";

export const routesConfig = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorBoundary />,
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
