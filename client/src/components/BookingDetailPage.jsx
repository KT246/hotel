import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormatDate, FormatNumber } from "../libs/Format";

const BookingDetailPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch(`http://localhost:5001/api/booking/${id}`);
      const dataObj = await response.json();
      setBooking(dataObj.data[0]);
    };

    fetchRooms();
  }, []);

  if (!booking) {
    return <div>....loading</div>;
  }

  // console.log(booking);
  return (
    <div className="h-[69.7vh] bg-gray-50 p-1">
      <h1 className="text-2xl font-semibold pb-4">Chi tiết đơn hàng</h1>
      <div className="grid grid-cols-2 gap-2">
        <div className="w-full h-[160px] ">
          <img src="/phong-index.jpg" alt="" className="w-full h-full" />
        </div>
        <div className="ms-3">
          <p className="mb-2">Thông tin khách hàng:</p>
          <p className="text-gray-500">Họ tên: {booking.khach_hang.ten}</p>
          <p className="text-gray-500">
            Số điện thoại: {booking.khach_hang.so_dien_thoai}
          </p>
          <p className="text-gray-500">
            Địa chỉ:
            <span className="ps-2">{booking.khach_hang.dia_chi}</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="ms-2">
          <p className="my-2">Thông tin phòng:</p>
          <p className="text-gray-500">Phòng số: {booking.phong.so_phong}</p>
          <p className="text-gray-500">Loại phòng: {booking.phong.ten_phong}</p>
          <p className="text-gray-500">
            Giá phòng: {FormatNumber(booking.phong.gia_dem)}/ đêm
          </p>
          <p className="text-gray-500">
            Giường nghỉ: {booking.phong.so_giuong} giường
          </p>
          <p className="text-gray-500">
            Ngày đặt: {FormatDate(booking.ngay_dat_phong)}
          </p>
          <p className="text-gray-500">
            Ngày trả: {FormatDate(booking.ngay_di)}
          </p>
          <p className="text-gray-500 w-full truncate">
            Phương thức thanh toán: {booking.phuong_thuc_thanh_toan}
          </p>
          <p className="text-gray-500">
            status:{" "}
            {booking.trang_thai === "da_xac_nhan"
              ? "Đã xác nhận"
              : "Đã thanh toán"}
          </p>
        </div>
        <div>
          <p className="my-2">Cơ sở vật chất</p>
          <ul className="text-gray-500 list-disc h-[200px] overflow-y-auto">
            {booking.phong.tien_nghi[0].split(",").map((tn, i) => (
              <li key={i}>{tn}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;
