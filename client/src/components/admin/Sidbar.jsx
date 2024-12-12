import React from "react";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../libs/tokenHotel";

const Sidbar = () => {
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="w-52 border-r-2 border-blue-600">
      <div className="text-center py-5">
        <h3 className="text-xl text-blue-500 font-semibold pb-5">
          LUXURI HOTEL
        </h3>
        <div className="flex flex-col gap-1">
          <NavLink
            to={"/admin"}
            className={({ isActive }) =>
              isActive
                ? "w-full px-3 py-1 bg-blue-500 text-white hover:text-xl"
                : "w-full px-3 py-1 hover:bg-blue-500 hover:text-white hover:text-xl"
            }
            end
          >
            Trang chủ
          </NavLink>
          <NavLink
            to={"room"}
            className={({ isActive }) =>
              isActive
                ? "w-full px-3 py-1 bg-blue-500 text-white hover:text-xl"
                : "w-full px-3 py-1 hover:bg-blue-500 hover:text-white hover:text-xl"
            }
          >
            Phòng
          </NavLink>
          <NavLink
            to={"booking"}
            className={({ isActive }) =>
              isActive
                ? "w-full px-3 py-1 bg-blue-500 text-white hover:text-xl"
                : "w-full px-3 py-1 hover:bg-blue-500 hover:text-white hover:text-xl"
            }
          >
            Đặt phòng
          </NavLink>
          <NavLink
            to={"employee"}
            className={({ isActive }) =>
              isActive
                ? "w-full px-3 py-1 bg-blue-500 text-white hover:text-xl"
                : "w-full px-3 py-1 hover:bg-blue-500 hover:text-white hover:text-xl"
            }
          >
            Nhân viên
          </NavLink>
          <NavLink
            to={"checkin"}
            className={({ isActive }) =>
              isActive
                ? "w-full px-3 py-1 bg-blue-500 text-white hover:text-xl"
                : "w-full px-3 py-1 hover:bg-blue-500 hover:text-white hover:text-xl"
            }
          >
            Check in
          </NavLink>
          <NavLink
            to={"checkout"}
            className={({ isActive }) =>
              isActive
                ? "w-full px-3 py-1 bg-blue-500 text-white hover:text-xl"
                : "w-full px-3 py-1 hover:bg-blue-500 hover:text-white hover:text-xl"
            }
          >
            Check out
          </NavLink>
        </div>
        <button
          onClick={handleLogout}
          className="mt-80 bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidbar;
