import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ten: "",
    email: "",
    so_dien_thoai: "",
    dia_chi: "",
    ngay_sinh: "",
    gioi_tinh: "",
    chuc_vu: "",
    ngay_bat_dau: "",
    luong: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Tạo nhân viên thành công");
        navigate("/admin/employee");
      } else {
        const data = await res.json();
        alert("Lỗi khi tạo nhân viên:", data.message);
      }
    } catch (error) {
      alert("Lỗi khi kết nối tới server:", error);
    }
  };

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit} className="grid grid-cols-4">
        <div>
          <p className="flex flex-col justify-center gap-2">
            <label htmlFor="ten">Tên:</label>
            <input
              type="text"
              id="ten"
              name="ten"
              value={formData.ten}
              onChange={handleChange}
              required
              className="outline-none border border-black text-center px-2 py-1 rounded"
            />
          </p>

          <p className="flex flex-col justify-center gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="outline-none border border-black text-center px-2 py-1 rounded"
            />
          </p>

          <p className="flex flex-col justify-center gap-2">
            <label htmlFor="so_dien_thoai">Số Điện Thoại:</label>
            <input
              type="tel"
              id="so_dien_thoai"
              name="so_dien_thoai"
              value={formData.so_dien_thoai}
              onChange={handleChange}
              required
              className="outline-none border border-black text-center px-2 py-1 rounded"
            />
          </p>

          <p className="flex flex-col justify-center gap-2">
            <label htmlFor="dia_chi">Địa Chỉ:</label>
            <input
              type="text"
              id="dia_chi"
              name="dia_chi"
              value={formData.dia_chi}
              onChange={handleChange}
              required
              className="outline-none border border-black text-center px-2 py-1 rounded"
            />
          </p>

          <p className="flex flex-col justify-center gap-2">
            <label htmlFor="chuc_vu">Chức Vụ:</label>
            <input
              type="text"
              id="chuc_vu"
              name="chuc_vu"
              value={formData.chuc_vu}
              onChange={handleChange}
              required
              className="outline-none border border-black text-center px-2 py-1 rounded"
            />
          </p>

          <p className="flex flex-col justify-center gap-2">
            <label htmlFor="luong">Lương:</label>
            <input
              type="number"
              id="luong"
              name="luong"
              value={formData.luong}
              onChange={handleChange}
              required
              className="outline-none border border-black text-center px-2 py-1 rounded"
            />
          </p>
        </div>

        <div></div>

        <div>
          <p className="flex flex-col justify-center gap-2">
            <label htmlFor="ngay_sinh">Ngày Sinh:</label>
            <input
              type="date"
              id="ngay_sinh"
              name="ngay_sinh"
              value={formData.ngay_sinh}
              onChange={handleChange}
              required
              className="outline-none border border-black text-center px-2 py-1 rounded"
            />
          </p>

          <p className="flex flex-col justify-center gap-2">
            <label htmlFor="ngay_bat_dau">Ngày Bắt Đầu:</label>
            <input
              type="date"
              id="ngay_bat_dau"
              name="ngay_bat_dau"
              value={formData.ngay_bat_dau}
              onChange={handleChange}
              required
              className="outline-none border border-black text-center px-2 py-1 rounded"
            />
          </p>

          <div className="mt-5 flex items-center gap-3">
            <label htmlFor="gioi_tinh">Giới Tính:</label>
            <select
              id="gioi_tinh"
              name="gioi_tinh"
              value={formData.gioi_tinh}
              onChange={handleChange}
              required
              className="outline-none border border-black text-center rounded"
            >
              <option value="" disabled>
                Chọn Giới Tính
              </option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div className="flex flex-col justify-center h-full">
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              Tạo nhân viên
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployee;
