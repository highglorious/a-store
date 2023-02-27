import { FC, useEffect, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { SidePanelResponsive } from "@alfalab/core-components/side-panel/responsive";
import { Gap } from "@alfalab/core-components/gap";
import { Button } from "@alfalab/core-components/button";
import { GenericWrapper } from "@alfalab/core-components/generic-wrapper";
import "./CartPanel.css";
import { Cart } from "../cart";
import { itemsCartSelector } from "../cart/cartSelectors";
import { useAppSelector } from "../../hooks";

export type CartPanelProps = {
  view: boolean;
  handleView: () => void;
};

export const CartPanel: FC<CartPanelProps> = ({ view, handleView }) => {
  const cartItems = useAppSelector(itemsCartSelector);

  useEffect(() => {
    if (cartItems.length === 0 && view) {
      handleView();
    }
  }, [cartItems.length, view, handleView]);

  const handleClick = (e: MouseEvent<Element>) => {
    if ((e.target as Element).id === "target") handleView();
  };

  return (
    <div onClick={handleClick}>
      <SidePanelResponsive
        className="cart-panel"
        open={view}
        onClose={handleView}
        size="s"
        placement={"right"}
        nativeScrollbar={true}
      >
        <SidePanelResponsive.Header
          hasCloser={true}
          sticky={false}
          title="Ваш заказ"
        />
        <SidePanelResponsive.Content>
          <Cart />
        </SidePanelResponsive.Content>
        <SidePanelResponsive.Footer sticky={false}>
          <GenericWrapper>
            <Gap size="s" />
            <Link className="link-button" to={"/order"}>
              <Button size="m" view="primary" onClick={handleView}>
                Дальше
              </Button>
            </Link>
          </GenericWrapper>
        </SidePanelResponsive.Footer>
      </SidePanelResponsive>
    </div>
  );
};
