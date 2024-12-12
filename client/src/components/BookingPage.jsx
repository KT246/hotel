import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FormatDate } from "../libs/Format";

const BookingPage = () => {
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("http://localhost:5001/api/booking");
      const dataObj = await response.json();
      setBooking(dataObj.data);
    };

    fetchRooms();
  }, []);
  const handleRemove = async (id) => {
    const response = await fetch(`http://localhost:5001/api/booking/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("Hủy đặt phòng thành công!");
    }
  };
  // console.log(booking);
  return (
    <div className="bg-white h-[69.8vh] overflow-auto p-2">
      <h3 className="text-center">Đặt phòng của tôi</h3>

      {booking &&
        booking.map((bking, i) => (
          <div
            key={i}
            className="flex bg-blue-500  text-white rounded mt-2 h-12 "
          >
            <div className="w-32 bg-black bg-opacity-40 text-center rounded-l">
              <p> Tên phòng</p>
              <p className="text-sm">{bking.phong.ten_phong}</p>
            </div>
            <div className="  flex justify-between w-full px-3">
              <div>
                <p>Ngày</p>
                <p className="text-sm whitespace-nowrap w-[330px] truncate">
                  Tứ 4 ngày {FormatDate(bking.ngay_den)} Check in {"->"} Tứ 7
                  ngày {FormatDate(bking.ngay_di)} Check in
                </p>
              </div>
              <div className="text-center">
                <p>Số phòng</p>
                <p className="text-sm">{bking.phong.so_phong}</p>
              </div>
              {bking.trang_thai === "da_xac_nhan" ? (
                <div className="flex items-center justify-center gap-3 ">
                  <span className=" bg-green-500 bg-opacity-90 px-2  rounded">
                    Đã xác nhận
                  </span>
                  <NavLink
                    to={`../detail/${bking._id}`}
                    className={`bg-gray-50 hover:bg-gray-100 hover:text-gray-950 px-1 text-gray-900 rounded`}
                  >
                    Chi tiết
                  </NavLink>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 ">
                  <span className=" bg-red-500 bg-opacity-90 px-2 rounded">
                    Chờ xác nhận
                  </span>
                  <button
                    onClick={handleRemove(bking._id)}
                    type="button"
                    className={`bg-gray-50 hover:bg-gray-100 px-3 hover:text-gray-950 text-gray-900 rounded`}
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookingPage;
