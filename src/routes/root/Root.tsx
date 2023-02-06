import React, { useState } from "react";
import "./Root.css";
import { Outlet } from "react-router-dom";

import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { SidePanel } from "../../components/side-panel";

export type SidePanelProps = {
  view: boolean;
  handleView: () => void;
};

export const Root = () => {
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
    </div>
  );
};
