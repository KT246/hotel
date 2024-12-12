import React, { useState, useEffect } from "react";
import { FormatDate, FormatNumber } from "../../libs/Format";

const CheckIn = () => {
  const [booking, setBooking] = useState([]);
  const fetcher = async () => {
    const response = await fetch("http://localhost:5001/api/booking");
    const dataObj = await response.json();
    setBooking(dataObj.data);
  };
  useEffect(() => {
    fetcher();
  }, []);

  if (!booking) {
    return <div>Loading...</div>;
  }

  const handleRemove = async (i) => {
    const response = await fetch(`http://localhost:5001/api/booking/${i}`, {
      method: "DELETE",
    });
    const data = await response.text();
    if (response.ok) {
      alert(data);
      fetcher();
    }
  };
  const handleUpdate = async (i) => {
    const response = await fetch(
      `http://localhost:5001/api/booking/checkout/${i}`,
      {
        method: "PUT",
      }
    );
    const data = await response.text();
    if (response.ok) {
      alert(data);
      fetcher();
    }
  };

  console.log(booking);
  return (
    <div className="px-1">
      <h1 className="border-b-2 text-xl text-center  py-2">CheckIn</h1>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border p-1">Tên khách hàng</th>
            <th className="border p-1">Số điện thoại</th>
            <th className="border p-1">Số phòng</th>
            <th className="border p-1">Ngày nhận phòng</th>
            <th className="border p-1">Số ngày ở</th>
            <th className="border p-1">Giá/đêm</th>
            <th className="border p-1">Check-out</th>
            <th className="border p-1">Cập nhật</th>
            <th className="border p-1">Xóa</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {booking.map((bking, i) =>
            bking.trang_thai === "da_nhan_phong" ? (
              <tr key={i}>
                <td className="border text-center p-2">
                  {bking.khach_hang.ten}
                </td>
                <td className="border text-center p-2">
                  {bking.khach_hang.so_dien_thoai}
                </td>
                <td className="border text-center p-2">
                  {bking.phong.so_phong}
                </td>
                <td className="border text-center p-2">
                  {FormatDate(bking.ngay_den)}
                </td>
                <td className="border text-center p-2">{bking.so_dem}</td>
                <td className="border text-center p-2">
                  {FormatNumber(bking.phong.gia_dem)}
                </td>
                <td className="border text-center p-2">
                  <button
                    onClick={() => handleUpdate(bking._id)}
                    className="w-full text-white bg-green-500 rounded px-1"
                  >
                    Xác nhận
                  </button>
                </td>
                <td className="border text-center p-2">
                  <a
                    href={`update/${bking._id}`}
                    className="w-full text-white bg-blue-500 rounded px-1 block"
                  >
                    Cập nhật
                  </a>
                </td>
                <td className="border text-center p-2">
                  <button
                    onClick={() => handleRemove(bking._id)}
                    className="w-full text-white bg-red-500 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CheckIn;
