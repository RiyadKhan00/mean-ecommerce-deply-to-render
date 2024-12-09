import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="d-flex w-100 vh-100 ">
      <div className="d-flex col-5 justify-content-center align-items-center bg-black h-100 text-white">
        <h2 className="fw-bolder fs-1 w-75 text-center">
          Welcom to Ecommerce Shopping
        </h2>
      </div>
      <div className="d-flex col-7 justify-content-center align-items-center h-100 ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
