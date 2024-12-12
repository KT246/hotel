import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidbar from "../components/admin/Sidbar";
import { getToken } from "../libs/tokenHotel";
import { useNavigate } from "react-router-dom";

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const playload = getToken();
  useEffect(() => {
    if (!playload) {
      navigate("/login");
    }
    if (playload.role !== "admin") {
      navigate("/user");
    }
  }, []);
  // console.log(playload);
  return (
    <div className="flex h-screen">
      <Sidbar />
      <div className="overflow-y-auto w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAdmin;
