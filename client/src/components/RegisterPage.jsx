import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ten: "",
    email: "",
    password: "",
    confirmPassword: "",
    so_dien_thoai: "",
    dia_chi: "",
    ngay_sinh: "",
    gioi_tinh: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Đã có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  return (
    <div className="bg-gray-100 w-full">
      <div className="flex justify-center items-center h-[80vh]">
        <div className="bg-white px-5 py-8">
          <h3 className="text-blue-500 text-xl font-semibold">
            Đăng ký thành viên
          </h3>
          <form onSubmit={handleSubmit} className="w-[800px]">
            <div className="flex gap-2 w-full">
              <div className="w-full">
                <br />
                Tên
                <br />
                <input
                  required
                  type="text"
                  name="ten"
                  value={formData.ten}
                  onChange={handleChange}
                  className="border-[1px] border-gray-400 rounded w-full h-8 px-3 py-2 mb-3"
                />
                <br />
                Email
                <br />
                <input
                  required
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-[1px] border-gray-400 rounded w-full h-8 px-3 py-2 mb-3"
                />
                <br />
                Mật khẩu
                <br />
                <input
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border-[1px] border-gray-400 rounded w-full h-8 px-3 py-2 mb-3"
                />
                <br />
                Xác nhận mật khẩu
                <br />
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border-[1px] border-gray-400 rounded w-full h-8 px-3 py-2 mb-3"
                />
              </div>
              <div className="w-full">
                <br />
                Số điện thoại
                <br />
                <input
                  required
                  type="text"
                  name="so_dien_thoai"
                  value={formData.so_dien_thoai}
                  onChange={handleChange}
                  className="border-[1px] border-gray-400 rounded w-full h-8 px-3 py-2 mb-3"
                />
                <br />
                Địa chỉ
                <br />
                <input
                  required
                  type="text"
                  name="dia_chi"
                  value={formData.dia_chi}
                  onChange={handleChange}
                  className="border-[1px] border-gray-400 rounded w-full h-8 px-3 py-2 mb-3"
                />
                <br />
                Ngày sinh
                <br />
                <input
                  required
                  type="date"
                  name="ngay_sinh"
                  value={formData.ngay_sinh}
                  onChange={handleChange}
                  className="border-[1px] border-gray-400 rounded w-full h-8 px-3 py-2 mb-3"
                />
                <br />
                Giới tính
                <br />
                <select
                  name="gioi_tinh"
                  value={formData.gioi_tinh}
                  onChange={handleChange}
                  className="border-[1px] border-gray-400 rounded w-full h-8 px-3 mb-3"
                >
                  <option value="" disabled selected>
                    Chọn giới tính
                  </option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
            </div>
            <br />
            <div className="flex gap-2 w-[450px]">
              <input required type="checkbox" className="w-5 h-5" />
              <span className="text-sm text-wrap">
                Tôi chấp nhận nhận các thông tin cập nhật
              </span>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white my-5 w-full py-2 rounded"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
