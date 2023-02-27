import React, { FC, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import "./Root.css";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { SidePanel } from "../../components/side-panel";
import { CartButton } from "../../components/cart-button";
import { CartPanel } from "../../components/cart-panel";

export const Root: FC = () => {
  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(false);
  const [cartPanelOpen, setCartPanelOpen] = useState<boolean>(false);

  const handleSidePanelOpen = () => setSidePanelOpen(!sidePanelOpen);
  const handleCartPanelOpen = () => setCartPanelOpen(!cartPanelOpen);

  return (
    <div className="page-container ">
      <Header handleView={handleSidePanelOpen} />

      <SidePanel view={sidePanelOpen} handleView={handleSidePanelOpen} />
      <CartPanel view={cartPanelOpen} handleView={handleCartPanelOpen} />
      <div className="page-content">
        <Outlet />
      </div>
      <Footer />
      <CartButton handleView={handleCartPanelOpen} />
      <ScrollRestoration />
    </div>
  );
};
