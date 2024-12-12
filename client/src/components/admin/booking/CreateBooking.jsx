import React, { useState, useEffect } from "react";
import { FormatNumber } from "../../../libs/Format";
import { useNavigate } from "react-router-dom";

const CreateCustomerBooking = () => {
  const navigate = useNavigate();
  const [room, setroom] = useState([]);
  const [formData, setFormData] = useState({
    ten: "",
    email: "",
    so_dien_thoai: "",
    dia_chi: "",
    ngay_sinh: "",
    gioi_tinh: "",
    phong: "",
    ngay_den: "",
    ngay_di: "",
    so_dem: 0,
    gia_tong: 0,
  });

  const getRoom = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/room`);
      const dataObj = await response.json();
      setroom(dataObj.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateDays = () => {
    const { ngay_den, ngay_di } = formData;
    if (ngay_den && ngay_di) {
      const date1 = new Date(ngay_den);
      const date2 = new Date(ngay_di);
      const timeDifference = date2 - date1;
      const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
      setFormData((prevData) => ({
        ...prevData,
        so_dem: dayDifference >= 0 ? dayDifference : 0,
      }));
    }
  };
  const calculateTotal = () => {
    const { phong, so_dem } = formData;
    if (phong && so_dem > 0) {
      const selectedRoom = room.find((r) => r.so_phong === parseInt(phong));
      if (selectedRoom) {
        setFormData((prevData) => ({
          ...prevData,
          gia_tong: selectedRoom.gia_dem * so_dem,
        }));
      }
    }
  };

  const playLoad = () => {
    getRoom();
  };

  useEffect(() => {
    calculateTotal();
  }, [formData.so_dem, formData.phong, room]);

  useEffect(() => {
    calculateDays();
  }, [formData.ngay_den, formData.ngay_di]);

  useEffect(() => {
    playLoad();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Customer and Booking data:", formData);

    try {
      const res = await fetch("http://localhost:5001/api/booking/offline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate("/admin/checkin");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Lỗi xảy ra: " + error.message);
      console.error(error);
    }
  };

  console.log(formData);
  return (
    <div className="p-2">
      <form onSubmit={handleSubmit} className="grid grid-cols-4">
        <div>
          <h2 className="border-s-4 border-blue-500 leading-none ps-1 mb-3">
            Thông tin khách hàng
          </h2>
          <p className="flex flex-col gap-1 mb-2">
            <label htmlFor="ten">Tên:</label>
            <input
              className=" outline-none border border-black px-2 py-1 rounded text-center"
              type="text"
              name="ten"
              value={formData.ten}
              onChange={handleChange}
              required
            />
          </p>

          <p className="flex flex-col gap-1 mb-2">
            <label htmlFor="email">Email:</label>
            <input
              className=" outline-none border border-black px-2 py-1 rounded text-center"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </p>
          <p className="flex flex-col gap-1 mb-2">
            <label htmlFor="so_dien_thoai">Số điện thoại:</label>
            <input
              className=" outline-none border border-black px-2 py-1 rounded text-center"
              type="text"
              name="so_dien_thoai"
              value={formData.so_dien_thoai}
              onChange={handleChange}
              required
            />
          </p>

          <p className="flex flex-col gap-1 mb-2">
            <label htmlFor="dia_chi">Địa chỉ:</label>
            <input
              className=" outline-none border border-black px-2 py-1 rounded text-center"
              type="text"
              name="dia_chi"
              value={formData.dia_chi}
              onChange={handleChange}
              required
            />
          </p>

          <p className="flex flex-col gap-1 mb-2">
            <label htmlFor="ngay_sinh">Ngày sinh:</label>
            <input
              className=" outline-none border border-black px-2 py-1 rounded text-center"
              type="date"
              name="ngay_sinh"
              value={formData.ngay_sinh}
              onChange={handleChange}
            />
          </p>

          <div className="mt-5">
            <label htmlFor="gioi_tinh">Giới tính:</label>
            <select
              name="gioi_tinh"
              value={formData.gioi_tinh}
              onChange={handleChange}
              className="outline-none border border-black ms-2 rounded text-center"
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
        <div></div>
        <div>
          <h2 className="border-s-4 border-blue-500 leading-none ps-1 mb-3">
            Thông tin đặt phòng
          </h2>
          <div className="mb-3">
            <label htmlFor="phong">Phòng:</label>
            <select
              className=" outline-none border border-black ms-3 rounded text-center"
              type="number"
              name="phong"
              value={formData.phong}
              onChange={handleChange}
              require
            >
              <option value="" disabled selected>
                Chọn phòng
              </option>
              {room.map((room, i) =>
                room.trang_thai === "trong" ? (
                  <option key={i} value={room.so_phong}>
                    {room.so_phong}
                  </option>
                ) : null
              )}
            </select>
          </div>
          <p className="flex flex-col gap-1 mb-2">
            <label htmlFor="ngay_den">Ngày đến:</label>
            <input
              className=" outline-none border border-black px-2 py-1 rounded text-center"
              type="date"
              name="ngay_den"
              value={formData.ngay_den}
              onChange={handleChange}
              required
            />
          </p>
          <p className="flex flex-col gap-1 mb-2">
            <label htmlFor="ngay_di">Ngày đi:</label>
            <input
              className=" outline-none border border-black px-2 py-1 rounded text-center"
              type="date"
              name="ngay_di"
              value={formData.ngay_di}
              onChange={handleChange}
              required
            />
          </p>
          <p className="flex flex-col gap-1 mb-2">
            <label htmlFor="so_dem">Số đêm:</label>
            <input
              className=" outline-none border border-black px-2 py-1 rounded text-center"
              type="number"
              name="so_dem"
              value={formData.so_dem}
              readOnly
            />
          </p>
          <p className="flex flex-col gap-1 mb-2">
            <label htmlFor="gia_tong">Giá tổng:</label>
            <input
              type="number"
              name="gia_tong"
              value={formData.gia_tong}
              onChange={handleChange}
              required
              readOnly
              hidden
            />
            <input
              type="text"
              value={FormatNumber(formData.gia_tong)}
              readOnly
              className=" outline-none border border-black px-2 py-1 rounded text-center"
            />
          </p>
        </div>
        <div></div>
        <button
          type="submit"
          className="bg-blue-500 px-3 py-2 text-white rounded w-full mt-10"
        >
          Tạo khách hàng và đặt phòng
        </button>
      </form>
    </div>
  );
};

export default CreateCustomerBooking;
