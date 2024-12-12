import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useLogout } from "../libs/tokenHotel";

const SettingPage = () => {
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-gray-100">
      <div className="px-72 flex gap-4 relative py-3">
        <div className="bg-gray-50 absolute top-3 w-[160px] ">
          <h3 cla className="text-blue-500 bg-gray-200 w-full py-1 text-center">
            Cài đặt
          </h3>
          <div className="flex flex-col gap-2 py-2  ">
            <NavLink
              to={"/user/setting"}
              className={({ isActive }) =>
                isActive ? " text-red-500 px-2 " : " px-2"
              }
              end
            >
              Tài khoản
            </NavLink>
            <NavLink
              to={"booking"}
              className={({ isActive }) =>
                isActive ? " text-red-500  px-2" : "  px-2"
              }
            >
              Đặt phòng của tôi
            </NavLink>
            <button
              onClick={handleLogout}
              className=" bg-red-500 py-1 text-gray-100 hover:bg-red-700 hover:text-gray-50 rounded"
            >
              Thoát
            </button>
          </div>
        </div>
        <div className="ms-44 w-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
