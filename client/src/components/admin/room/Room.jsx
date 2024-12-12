import React from "react";
import { NavLink } from "react-router-dom";

import { Outlet } from "react-router-dom";

const Room = () => {
  return (
    <div className="py-3 px-1">
      <div className="flex gap-5">
        <NavLink
          to=""
          className={({ isActive }) => (isActive ? "text-red-500" : "")}
          end
        >
          List
        </NavLink>
        <NavLink
          to="create"
          className={({ isActive }) => (isActive ? "text-red-500" : "")}
        >
          Tao
        </NavLink>
      </div>
      <div className="border-t-2 mt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Room;
