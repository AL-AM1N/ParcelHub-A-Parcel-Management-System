import React from "react";
import { Link, Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import logo from "../assets/logo.png";

const AuthLayout = () => {
  return (
    <div className="bg-base-200 max-w-375 mx-auto min-h-screen">
      <div>
        <Link to="/">
          <img className="w-50 h-16" src={logo} alt="ParcelHub logo" />
        </Link>
      </div>
      <div className="hero-content mx-auto flex-col lg:flex-row-reverse">
        <div className="flex-1 place-items-center">
          <img src={authImage} className="max-w-sm rounded-lg" />
        </div>
        <div className="flex-1 place-items-center ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
