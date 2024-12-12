import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Booking = () => {
  return (
    <div className="py-3 px-1">
      <div className="flex gap-5">
        <NavLink
          to=""
          className={({ isActive }) => (isActive ? "text-red-500" : "")}
          end
        >
          Đặt phòng
        </NavLink>
        <NavLink
          to="confirm"
          className={({ isActive }) => (isActive ? "text-red-500" : "")}
        >
          Xác nhận phòng
        </NavLink>
        <NavLink
          to="get-room"
          className={({ isActive }) => (isActive ? "text-red-500" : "")}
        >
          Nhận phòng
        </NavLink>
      </div>
      <div className="border-t-2 mt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Booking;
