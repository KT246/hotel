import React, { useState, useEffect } from "react";
import { FormatNumber, FormatDate } from "../../libs/Format";

const CheckOut = () => {
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
  return (
    <div className="px-1">
      <h1 className="border-b-2 text-xl text-center  py-2">CheckOut</h1>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border p-1">Tên khách hàng</th>
            <th className="border p-1">Số điện thoại</th>
            <th className="border p-1">Số phòng</th>
            <th className="border p-1">Ngày nhận phòng</th>
            <th className="border p-1">Ngày thanh toán</th>
            <th className="border p-1">Số ngày ở</th>
            <th className="border p-1">Phương thức thanh toán</th>
            <th className="border p-1">Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((bking, i) =>
            bking.trang_thai === "da_hoan_thanh" ? (
              <tr>
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
                <td className="border text-center p-2">
                  {FormatDate(bking.ngay_di)}
                </td>
                <td className="border text-center p-2">{bking.so_dem}</td>
                <td className="border text-center p-2">
                  {bking.phuong_thuc_thanh_toan}
                </td>
                <td className="border text-center p-2">
                  {FormatNumber(bking.gia_tong)}
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CheckOut;
