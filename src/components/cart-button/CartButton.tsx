import { FC, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ShoppingBagMIcon } from "@alfalab/icons-glyph/ShoppingBagMIcon";
import { Badge } from "@alfalab/core-components/badge";
import { SuperEllipse } from "@alfalab/core-components/icon-view/super-ellipse";
import { Amount } from "@alfalab/core-components/amount";
import { Tooltip } from "@alfalab/core-components/tooltip";
import "./CartButton.css";
import { CartPanelProps } from "../cart-panel";
import { useAppSelector } from "../../hooks";
import { itemsCartSelector } from "../cart/cartSelectors";
import { totalCostOfItems } from "../../utils/totalCostOfItems";

export const CartButton: FC<Pick<CartPanelProps, "handleView">> = ({
  handleView,
}) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const cartItems = useAppSelector(itemsCartSelector);

  const totalNumberOfItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = useMemo(() => totalCostOfItems(cartItems), [cartItems]);

  return totalPrice > 0 && pathname !== "/order" ? (
    <div data-testid="cart-button" className="cart-button" onClick={handleView}>
      <Tooltip
        open={open}
        content={<Amount value={totalPrice} minority={1} currency="RUB" />}
        position="left"
        onOpen={handleOpen}
        onClose={handleClose}
        fallbackPlacements={["bottom", "top"]}
        view="hint"
      >
        <SuperEllipse
          border={true}
          size={80}
          topAddons={
            <Badge view="count" height={24} content={totalNumberOfItems} />
          }
        >
          <ShoppingBagMIcon />
        </SuperEllipse>
      </Tooltip>
    </div>
  ) : null;
};
