import React, { useEffect } from "react";
import MainNav from "../components/MainNav";
import FooterPage from "../components/FooterPage";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getToken } from "../libs/tokenHotel";

const LayoutUser = () => {
  const navigate = useNavigate();
  const playload = getToken();
  useEffect(() => {
    if (!playload) {
      navigate("/login");
    }
    if (playload.role !== "user") {
      navigate("/admin");
    }
  }, []);
  console.log(playload);
  return (
    <>
      <MainNav />

      <div className=" relative">
        <Outlet />
      </div>

      <FooterPage />
    </>
  );
};

export default LayoutUser;
