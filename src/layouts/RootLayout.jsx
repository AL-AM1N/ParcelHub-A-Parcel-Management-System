import React from "react";
import { Outlet } from "react-router";
import NavBar from "../pages/Shared/NavBar/NavBar";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="max-w-375 mx-auto">
      <div className="p-4">
        <NavBar></NavBar>
      </div>

      <Outlet></Outlet>
      
      <div className="p-4">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
