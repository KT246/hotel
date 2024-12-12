import React, { useEffect, useState } from "react";
import { FormatDate, FormatNumber } from "../../../libs/Format";
const ConfirmPage = () => {
  const [booking, setBooking] = useState([]);
  const fetcher = async () => {
    const response = await fetch("http://localhost:5001/api/booking");
    const dataObj = await response.json();
    setBooking(dataObj.data);
  };
  const playLoad = () => {
    fetcher();
  };

  useEffect(() => {
    playLoad();
  }, []);

  const handleUpdate = async (id) => {
    const res = await fetch(`http://localhost:5001/api/booking/${id}`, {
      method: "PUT",
    });
    const data = await res.text();
    if (res.ok) {
      alert(data);
      playLoad();
    }
  };

  return (
    <div>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border p-1">Tên khách hàng</th>
            <th className="border p-1">Số điện thoại</th>
            <th className="border p-1">Giới Tính</th>
            <th className="border p-1">Số phòng</th>
            <th className="border p-1">Ngày Đặt phòng</th>
            <th className="border p-1">Ngày đến</th>
            <th className="border p-1">Ngày trả phòng</th>
            <th className="border p-1">Số ngày ở</th>
            <th className="border p-1">Phương thức thanh toán</th>
            <th className="border p-1">Tổng tiền</th>
            <th className="border p-1">Chờ xác nhận</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {booking.map((bking, i) =>
            bking.trang_thai === "cho_xac_nhan" ? (
              <tr key={i}>
                <td className="border text-center p-2">
                  {bking.khach_hang.ten}
                </td>
                <td className="border text-center p-2">
                  {bking.khach_hang.so_dien_thoai}
                </td>
                <td className="border text-center p-2">
                  {bking.khach_hang.gioi_tinh}
                </td>
                <td className="border text-center p-2">
                  {bking.phong.so_phong}
                </td>
                <td className="border text-center p-2">
                  {FormatDate(bking.ngay_dat_phong)}
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
                <td className="border text-center p-2">
                  <button
                    onClick={() => handleUpdate(bking._id)}
                    className="bg-green-500 w-full text-white rounded"
                  >
                    Xac nhan
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

export default ConfirmPage;
