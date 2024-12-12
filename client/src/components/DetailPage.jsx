import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FormatNumber } from "../libs/Format";

const DetailPage = () => {
  const [select, setSelect] = useState(false);
  const [src, setSrc] = useState("/phong-index.jpg");
  const [rooms, setRooms] = useState(null);

  const { id } = useParams();

  // Hàm fetch dữ liệu từ API
  const fetcher = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/room/${id}`);
      const dataObj = await res.json();
      if (res.ok) {
        setRooms(dataObj.data[0]);
      } else {
        console.error("Error fetching data:", dataObj.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(rooms);

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    fetcher();
  }, [id]);

  // Nếu dữ liệu chưa tải xong hoặc không hợp lệ
  if (!rooms) {
    return <div>Loading...</div>;
  }

  // Hàm xử lý chọn hình ảnh
  const handleSelect = (src) => {
    setSelect(!select);
    setSrc(src);
  };

  const tien_nghi = rooms?.tien_nghi[0]?.split(",");
  console.log(tien_nghi);
  return (
    <div className="bg-gray-200 relative">
      {" "}
      {/* Hiển thị hình ảnh được chọn */}
      <div
        className={`absolute top-0 left-0 bg-gray-950 bg-opacity-30 w-full h-full z-10 flex justify-center items-center ${
          select ? "" : "hidden"
        }`}
      >
        <div className="w-[50vw] h-[50vh] relative">
          <img src={src} alt="" className="w-full h-full" />
          <button
            onClick={() => handleSelect("")}
            className="absolute top-0 right-0 border border-blue-500 text-blue-500 bg-white bg-opacity-50 outline-none leading-none px-2 py-1"
          >
            Đóng
          </button>
        </div>
      </div>
      {/* Nội dung chi tiết */}
      <div className="px-20 py-5 relative">
        {/* Hình ảnh */}
        <div className="w-full grid grid-cols-5 gap-2 bg-gray-50 rounded overflow-hidden">
          <div className="h-[43.1vh] col-span-2">
            <img
              src={`data:${rooms.hinh_anh[0].contentType};base64,${btoa(
                new Uint8Array(rooms.hinh_anh[0].data.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              alt=""
              className="w-full h-full cursor-pointer"
              onClick={() =>
                handleSelect(
                  `data:${rooms.hinh_anh[0].contentType};base64,${btoa(
                    new Uint8Array(rooms.hinh_anh[0].data.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  )}`
                )
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-2 col-span-3">
            {rooms.hinh_anh.slice(1).map((img, i) => (
              <div key={i} className="h-[21vh]">
                <img
                  src={`data:${img.contentType};base64,${btoa(
                    new Uint8Array(img.data?.data || []).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  )}`}
                  alt={img.alt || ""}
                  className="h-full w-full cursor-pointer"
                  onClick={() =>
                    handleSelect(
                      `data:${img.contentType};base64,${btoa(
                        new Uint8Array(img.data?.data || []).reduce(
                          (data, byte) => data + String.fromCharCode(byte),
                          ""
                        )
                      )}`
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="bg-gray-50 rounded mt-5 px-3 py-1">
          <h3 className="font-semibold text-xl border-b-2 pb-2 border-gray-300">
            Thông tin phòng
          </h3>
          <div className="grid grid-cols-4">
            <div>
              <p className="py-1 text-lg">Tên phòng</p>
              <p className="text-blue-500">{rooms.ten_phong}</p>
            </div>
            <div>
              <p className="py-1 text-lg">Số người</p>
              <p className="text-blue-500">{rooms.so_nguoi}</p>
            </div>
            <div>
              <p className="py-1 text-lg">Số giường</p>
              <p className="text-blue-500">{rooms.so_giuong}</p>
            </div>
            <div>
              <p className="py-1 text-lg">Hướng nhìn</p>
              <p className="text-blue-500">{rooms.huong_nhin}</p>
            </div>
          </div>
        </div>

        {/* Cơ sở vật chất */}
        <div className="bg-gray-50 rounded mt-5 px-3 py-1">
          <h3 className="font-semibold text-xl border-b-2 pb-2 border-gray-300">
            Cơ sở vật chất
          </h3>
          <div className="grid grid-cols-3">
            {tien_nghi.map((c, i) => (
              <p key={i} className="flex items-center pt-2">
                <IoCheckmarkOutline />
                {c}
              </p>
            ))}
          </div>
        </div>

        {/* Giá và đặt phòng */}
        <div className="bg-gray-50 rounded mt-5 px-3 py-1 flex items-center justify-between">
          <div className="flex flex-col justify-center gap-1">
            <p className="text-xl">Giá: {FormatNumber(rooms.gia_dem)}/đêm</p>
            <p className="bg-green-500 px-3 text-center text-white">
              {rooms.trang_thai === "trong" ? "trống" : ""}
            </p>
          </div>
          <NavLink
            to={`../payment/${rooms._id}`}
            className="text-white bg-blue-500 py-1 px-3"
          >
            Đặt phòng
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
