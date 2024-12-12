import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken } from "../libs/tokenHotel";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const playload = getToken();

  useEffect(() => {
    if (playload) navigate("/user");
  }, [playload, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      // const { token } = res.data;
      const data = await res.json();
      localStorage.setItem("token", data.token);
      // console.log(data.playload.role);
      if (res.ok) {
        alert("Đăng nhập thành công!");
        if (data.playload.role === "user") {
          navigate("/user");
        } else {
          navigate("/admin");
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login error");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="flex justify-center items-center h-[73.8vh]">
        <div className="bg-white px-5 py-8">
          <h3 className="text-blue-500 text-xl font-semibold">Đăng nhập</h3>
          <p className="text-sm py-1">
            Vì sự an toàn, vui lòng đăng nhập để xem thông tin chi tiết của bạn.
          </p>
          <form onSubmit={handleLogin}>
            Email
            <br />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[1px] border-gray-400 rounded w-full h-8 px-3 py-2 mb-3"
              required
            />
            <br />
            Mật khẩu
            <br />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[1px] border-gray-400 rounded w-full h-8 px-3 py-2"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white my-5 w-full py-2 rounded"
            >
              Đăng nhập
            </button>
          </form>
          <div className="flex justify-between">
            <NavLink to="/register">
              <p className="text-sm text-blue-500">Tạo một tài khoản</p>
            </NavLink>
            <NavLink to="/forgot-password">
              <p className="text-sm text-blue-500">Quên mật khẩu?</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
