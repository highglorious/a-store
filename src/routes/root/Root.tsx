import React, { FC, useState } from "react";
import "./Root.css";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { SidePanel } from "../../components/side-panel";

export const Root: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleSidePanelOpen = () => setOpen(!open);

  return (
    <div className="page-container ">
      <Header handleView={handleSidePanelOpen} />
      <SidePanel view={open} handleView={handleSidePanelOpen} />
      <div className="page-content">
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};
