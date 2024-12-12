import React, { useEffect, useState } from "react";
import { FormatDate, FormatNumber } from "../../../libs/Format";

const Lists = () => {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState();
  const fecter = async () => {
    const res = await fetch("http://localhost:5001/api/employee");
    const Datas = await res.json();
    setData(Datas.data);
  };
  const playLoad = () => {
    fecter();
  };
  useEffect(() => {
    playLoad();
  }, []);

  const handleRemove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/employee/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Employee deleted");
        playLoad();
      } else {
        alert("Error");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <table className="w-full border border-collapse ">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border p-1">Tên nhân viên</th>
            <th className="border p-1">Số điện thoại</th>
            <th className="border p-1">Email</th>
            <th className="border p-1">Giới tính</th>
            <th className="border p-1">Ngày sinh</th>
            <th className="border p-1">Ngày bắt đầu</th>
            <th className="border p-1">Địa chỉ</th>
            <th className="border p-1">Chức vụ</th>
            <th className="border p-1">Lương</th>
            <th className="border p-1">Cập nhật</th>
            <th className="border p-1">Xóa</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {datas.map((item, index) => (
            <tr key={index}>
              <td className="border text-center p-2">{item.ten}</td>
              <td className="border text-center p-2">{item.so_dien_thoai}</td>
              <td className="border text-center p-2">{item.email}</td>
              <td className="border text-center p-2">{item.gioi_tinh}</td>
              <td className="border text-center p-2">
                {FormatDate(item.ngay_sinh)}
              </td>
              <td className="border text-center p-2">
                {FormatDate(item.ngay_bat_dau)}
              </td>
              <td className="border text-center p-2 w-60">{item.dia_chi}</td>
              <td className="border text-center p-2 ">{item.chuc_vu}</td>
              <td className="border text-center p-2">
                {FormatNumber(item.luong)}
              </td>
              <td className="border text-center p-2">
                <a
                  href={`/admin/employee/update/${item._id}`}
                  className="w-full text-white bg-blue-500 rounded px-1 "
                >
                  Cập nhật
                </a>
              </td>
              <td className="border text-center p-2">
                <button
                  type="button"
                  className="w-full text-white bg-red-500 rounded"
                  onClick={() => handleRemove(item._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lists;
