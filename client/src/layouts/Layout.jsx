import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MainNav from "../components/MainNav";
import FooterPage from "../components/FooterPage";
import { getToken } from "../libs/tokenHotel";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const playload = getToken(); // Lấy token từ hàm tiện ích
    if (!playload) {
      navigate("/login"); // Chuyển hướng nếu không có token
      return;
    }

    if (playload.role === "user") {
      navigate("/user"); // Chuyển hướng người dùng với vai trò 'user'
    } else if (playload.role === "admin") {
      navigate("/admin"); // Chuyển hướng người dùng với vai trò 'admin'
    }
  }, [navigate]);

  return (
    <>
      <MainNav />

      <div>
        <Outlet />
      </div>

      <FooterPage />
    </>
  );
};

export default Layout;
