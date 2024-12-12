import React, { useState, useRef } from "react";
import RoomPage from "../components/RoomPage";
import { NavLink } from "react-router-dom";
import { BiCabinet } from "react-icons/bi";
import { MdOutlineBedroomParent } from "react-icons/md";
import { RiPriceTag2Line } from "react-icons/ri";
import { FormatNumber } from "../libs/Format";

const HomePage = () => {
  const [tenPhong, setTenPhong] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null); // Thêm tham chiếu tới ô input
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState(false);
  // Xử lý khi nhấn phím Enter
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định
    if (!tenPhong) {
      alert("Vui lòng nhập tên phòng!");
      return;
    }
    setSearch(true);
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5001/api/room/search/${tenPhong}`
      );
      if (!response.ok) {
        throw new Error("Lỗi khi kết nối tới server");
      }

      const data = await response.json();
      setRooms(data.data);
      console.log("Thông tin phòng:", data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin phòng:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(rooms);

  // Xử lý nhập liệu
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setTenPhong(value);

    if (value) {
      try {
        const response = await fetch(
          `http://localhost:5001/api/suggestions?query=${value}`
        );
        if (!response.ok) {
          throw new Error("Lỗi khi kết nối tới server");
        }

        const data = await response.json();
        setSuggestions(data.suggestions); // Cập nhật danh sách gợi ý
      } catch (error) {
        console.error("Lỗi khi lấy gợi ý:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]); // Xóa gợi ý nếu ô trống
    }
  };

  // Xử lý khi chọn một gợi ý
  const handleSuggestionClick = (suggestion) => {
    setTenPhong(suggestion);
    setSuggestions([]); // Ẩn danh sách gợi ý sau khi chọn
    inputRef.current.focus(); // Focus lại ô input
  };

  return (
    <div className="pb-20">
      <div className="w-full h-[90vh] relative">
        <img src="quynhonhotel.jpg" alt="" className="w-full h-full" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="flex justify-center items-center h-full">
            <div className="bg-white px-20 py-10">
              <div className="text-center">
                <h3 className="text-2xl text-gray-900 font-semibold">
                  Khách sạn và nhà ở tư nhân
                </h3>
                <p className="text-blue-700">
                  Tìm kiếm chỗ ở để so sánh giá cả và ưu đãi tuyệt vời với việc
                  hủy miễn phí.
                </p>
              </div>
              <form action="#" onSubmit={handleSubmit} className="pt-10 flex">
                <input
                  ref={inputRef} // Gán ref cho ô input
                  type="text"
                  name="ten_phong"
                  value={tenPhong}
                  onChange={handleInputChange}
                  placeholder="Tìm kiếm phòng..."
                  className="w-full border border-gray-500 rounded-l px-2 py-1 outline-none"
                />
                <button
                  type="submit"
                  className="w-20 bg-blue-500 text-center text-white"
                >
                  search
                </button>
              </form>
              {suggestions.length > 0 && (
                <ul className="absolute bg-white border w-[200px] top-[375px] left-[470px] border-gray-300 mt-1 max-h-40 overflow-auto z-10">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {search ? (
        <div className="px-20 pb-20">
          <h3 className="text-2xl border-l-4 border-black ps-2 leading-none my-10">
            Kết quả tìm kiếm phòng
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {rooms && rooms.length > 0 ? (
              rooms.map((room, i) => (
                <div
                  key={i}
                  className="flex border-2 border-gray-500 rounded-tr"
                >
                  <div className="w-[350px] h-[200px] relative">
                    <img
                      src={`data:${room.hinh_anh[3]?.contentType};base64,${btoa(
                        new Uint8Array(room.hinh_anh[3]?.data?.data).reduce(
                          (data, byte) => data + String.fromCharCode(byte),
                          ""
                        )
                      )}`}
                      alt=""
                      className="w-full h-full border-r-2 border-gray-500"
                    />
                    <NavLink
                      to={
                        room.trang_thai === "trong"
                          ? `../detail/${room._id}`
                          : undefined
                      }
                      className={`absolute bottom-0 w-full text-center py-1 ${
                        room.trang_thai === "trong"
                          ? "text-gray-100 bg-black bg-opacity-50 cursor-pointer"
                          : "text-gray-300 bg-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {room.trang_thai === "trong"
                        ? "Xem hình ảnh và thông tin chi tiết"
                        : "Không khả dụng"}
                    </NavLink>
                  </div>
                  <div className="relative w-[350px] h-[200px]">
                    <div className="px-2">
                      <h3 className="text-xl font-semibold pb-1">
                        {room.ten_phong}
                      </h3>
                      <p className="flex items-center gap-1 pt-1">
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
                        <span
                          className={`text-white px-2 py-px ${
                            room.trang_thai === "trong"
                              ? "bg-green-500"
                              : room.trang_thai === "dang thue"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {room.trang_thai === "trong"
                            ? "Trống"
                            : room.trang_thai === "dang thue"
                            ? "Đang thuê"
                            : "Bảo trì"}
                        </span>
                      </p>
                    </div>
                    <NavLink
                      to={
                        room.trang_thai === "trong"
                          ? `../payment/${room._id}`
                          : undefined
                      }
                      className={`absolute bottom-0 w-full text-center py-1 ${
                        room.trang_thai === "trong"
                          ? "bg-blue-500 text-gray-100 cursor-pointer"
                          : "bg-gray-400 text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {room.trang_thai === "trong"
                        ? "Đặt phòng ngay"
                        : "Không khả dụng"}
                    </NavLink>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p>Không tìm thấy phòng</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <RoomPage />
      )}
    </div>
  );
};

export default HomePage;
