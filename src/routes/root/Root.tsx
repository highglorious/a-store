import React from "react";
import "./Root.css";
import { Outlet } from "react-router-dom";

import { Footer } from "../../components/footer";
import { Header } from "../../components/header";

export const Root = () => {
  return (
    <div className="root">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
