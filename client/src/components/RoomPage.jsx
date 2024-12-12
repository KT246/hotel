import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineBedroomParent } from "react-icons/md";
import { BiCabinet } from "react-icons/bi";
import { RiHomeLine, RiPriceTag2Line } from "react-icons/ri";
import { FormatNumber } from "../libs/Format";

const RoomPage = () => {
  const [rooms, setRooms] = useState([]);

  const fetcher = async () => {
    const res = await fetch("http://localhost:5001/api/room");
    const dataObj = await res.json();
    if (res.ok) {
      setRooms(dataObj.data);
    }
  };
  useEffect(() => {
    fetcher();
  }, []);

  if (!rooms) {
    return <div>Loading...</div>;
  }
  console.log(rooms);
  return (
    <div className="px-20 pb-20">
      <h3 className="text-2xl border-l-4 border-black ps-2 leading-none my-10">
        Phòng có sẵn - khách sạn
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {rooms.map((room, i) =>
          room.trang_thai === "trong" ? (
            <div key={i} className=" flex border-2 border-gray-500 rounded-tr">
              <div className="w-[350px] h-[200px] relative">
                <img
                  src={`data:${room.hinh_anh[3].contentType};base64,${btoa(
                    new Uint8Array(room.hinh_anh[3].data.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  )}`}
                  alt=""
                  className="w-full h-full border-r-2 border-gray-500"
                />
                <NavLink
                  to={`../detail/${room._id}`}
                  className={
                    " absolute bottom-0 w-full text-center text-gray-100 bg-black bg-opacity-50 py-1"
                  }
                >
                  Xem hình ảnh và thông tin chi tiết
                </NavLink>
              </div>
              <div className=" relative w-[350px] h-[200px]">
                <div className="px-2">
                  <h3 className="text-xl font-semibold pb-1">
                    {room.ten_phong}
                  </h3>
                  <p className="flex items-center gap-1 pt-1 ">
                    <BiCabinet size={20} />
                    Hướng nhìn: {room.huong_nhin}
                  </p>
                  <p className="flex items-center gap-1 pt-1">
                    <MdOutlineBedroomParent size={20} />
                    <span className="w-full whitespace-nowrap truncate">
                      {room.so_giuong} giường đơn hoặc {room.so_nguoi} người
                    </span>
                  </p>
                  <p className="flex items-center gap-1 pt-1">
                    <RiPriceTag2Line size={20} />
                    Giá: {FormatNumber(room.gia_dem)}/đêm
                  </p>
                  <p className="flex items-center gap-1 p-1">
                    Trạng thái:{" "}
                    <span className="text-white bg-green-500 px-2 py-px">
                      Trống
                    </span>
                  </p>
                </div>

                <NavLink
                  to={`../payment/${room._id}`}
                  className={
                    " absolute bottom-0 w-full text-center bg-blue-500 text-gray-100 py-1"
                  }
                >
                  Đặt phòng ngay
                </NavLink>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default RoomPage;
