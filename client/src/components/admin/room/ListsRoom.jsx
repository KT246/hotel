import React, { useState, useEffect } from "react";
import { FormatNumber } from "../../../libs/Format";
import { Link } from "react-router-dom";

const ListsRoom = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("http://localhost:5001/api/room");
      const dataObj = await response.json();
      setRooms(dataObj.data);
    };

    fetchRooms();
  }, []);
  // console.log(images);
  console.log(rooms);
  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/room/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRooms(rooms.filter((room) => room._id !== id));
        alert("Xóa thành công");
      } else {
        alert("Xóa thất bại");
      }
    } catch (error) {
      alert("Lỗi khi xóa phòng:", error);
    }
  };

  return (
    <div>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border p-1">Hình phòng</th>
            <th className="border p-1">Số phòng</th>
            <th className="border p-1">Tên phòng</th>
            <th className="border p-1">Số người</th>
            <th className="border p-1">Số giường</th>
            <th className="border p-1">Giá/đêm</th>
            <th className="border p-1">Hướng nhìn</th>
            <th className="border p-1">Trạng thái</th>
            <th className="border p-1">Cập nhật</th>
            <th className="border p-1">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id} onChange={() => handleChange(room._id)}>
              <td className="border text-center p-2 w-40 h-28">
                <img
                  src={`data:${room.hinh_anh[0].contentType};base64,${btoa(
                    new Uint8Array(room.hinh_anh[0].data.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  )}`}
                  alt={""}
                  className="w-full h-full"
                />
              </td>
              <td className="border text-center p-2">{room.so_phong}</td>
              <td className="border text-center p-2">{room.ten_phong}</td>
              <td className="border text-center p-2">{room.so_nguoi}</td>
              <td className="border text-center p-2">{room.so_giuong}</td>
              <td className="border text-center p-2">
                {FormatNumber(room.gia_dem)}
              </td>
              <td className="border text-center p-2">{room.huong_nhin}</td>
              <td
                className={`border text-center p-2 ${
                  room.trang_thai === "available"
                    ? "text-green-500"
                    : room.trang_thai === "booked"
                    ? "text-blue-500"
                    : "text-yellow-600"
                }`}
              >
                {room.trang_thai === "trong"
                  ? "Trống"
                  : room.trang_thai === "dang thue"
                  ? "Đang thuê"
                  : "Bảo trì"}
              </td>
              <td className="border text-center p-2">
                <Link
                  to={`/admin/room/update/${room._id}`}
                  className="w-full text-white bg-blue-500 rounded px-1"
                >
                  Cập nhật
                </Link>
              </td>
              <td className="border text-center p-2">
                <button
                  type="button"
                  onClick={() => handleRemove(room._id)}
                  className="w-full text-white bg-red-500 rounded"
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

export default ListsRoom;
