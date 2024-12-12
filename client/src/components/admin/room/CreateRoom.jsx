import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    so_phong: "",
    ten_phong: "",
    gia_dem: "",
    so_nguoi: "",
    so_giuong: "",
    trang_thai: "",
    huong_nhin: "",
    tien_nghi: [],
  });

  console.log(formData);

  const [errSel, setErrSel] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };
  useEffect(() => {
    if (images.length > 6) {
      setErrSel(true);
    }
  });
  const handleRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setErrSel(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        tien_nghi: checked
          ? [...prev.tien_nghi, value]
          : prev.tien_nghi.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  console.log(images);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    images.forEach((file) => {
      formDataToSubmit.append("images", file);
    });

    console.log(formDataToSubmit);
    try {
      const res = await fetch("http://localhost:5001/api/room", {
        method: "POST",
        body: formDataToSubmit,
      });
      const data = await res.text();
      if (data) {
        alert(data);
        navigate("/admin/room");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <div>
            <p className="border-l-4 border-blue-500 leading-none ps-2 my-2">
              Hình phòng
            </p>
            <p className="text-[12px] text-red-500 leading-none">
              <i>Tối đa 7 hình</i>
            </p>
          </div>
          <button
            type="submit"
            className="uppercase me-10 bg-blue-500 text-white px-2 py-px rounded"
          >
            Tạo phòng
          </button>
        </div>
        <div className="flex gap-3 py-3">
          {images.map((ims, i) => (
            <div key={i} className="relative w-40 h-32">
              <img
                src={URL.createObjectURL(ims)}
                alt={`room-image-${i}`}
                className="w-full h-full border-2 border-dashed"
              />

              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute top-0 left-0 bg-blue-500 rounded-br text-sm text-white px-1"
              >
                Xóa
              </button>
            </div>
          ))}
          {!errSel && (
            <label
              htmlFor="file-upload"
              className="w-40 h-32 flex justify-center items-center text-3xl cursor-pointer border-2 border-dashed z-10"
            >
              +
            </label>
          )}
        </div>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleImageChange}
          hidden
        />
        {errSel && (
          <p className="text-red-500 text-sm">Không được tải quá 7 hình ảnh!</p>
        )}
        <p className="border-l-4 border-blue-500 leading-none ps-2 my-2">
          Thông tin phòng
        </p>
        <div className="grid grid-cols-3 gap-5 mt-5 px-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="so_phong">Số phòng</label>
            <input
              required
              type="number"
              name="so_phong"
              value={formData.so_phong}
              onChange={handleChange}
              className="outline-none border border-black rounded p-1 text-center"
            />
            <label htmlFor="ten_phong" className="mt-3">
              Tên phòng
            </label>
            <input
              required
              type="text"
              name="ten_phong"
              value={formData.ten_phong}
              onChange={handleChange}
              className="outline-none border border-black rounded p-1 text-center"
            />
            <label htmlFor="gia_dem" className="mt-3">
              Giá/đêm
            </label>
            <input
              required
              type="number"
              name="gia_dem"
              value={formData.gia_dem}
              onChange={handleChange}
              className="outline-none border border-black rounded p-1 text-center"
            />
            <label htmlFor="so_nguoi" className="mt-3">
              Số người
            </label>
            <input
              required
              type="number"
              name="so_nguoi"
              value={formData.so_nguoi}
              onChange={handleChange}
              className="outline-none border border-black rounded p-1 text-center"
            />
            <label htmlFor="so_giuong" className="mt-3">
              Số giường
            </label>
            <input
              required
              type="number"
              name="so_giuong"
              value={formData.so_giuong}
              onChange={handleChange}
              className="outline-none border border-black rounded p-1 text-center"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="trang_thai">Trạng thái:</label>
              <select
                required
                name="trang_thai"
                value={formData.trang_thai}
                onChange={handleChange}
                className="mt-1 outline-none border py-1 border-black rounded cursor-pointer text-center w-full"
              >
                <option value="" disabled>
                  Chọn trạng thái
                </option>
                <option value="trong">trống</option>
                <option value="dang thue">đang thuê</option>
                <option value="bao tri">bảo trì</option>
              </select>
            </div>
            <div>
              <label htmlFor="huong_nhin">Hướng nhìn:</label>
              <select
                required
                name="huong_nhin"
                value={formData.huong_nhin}
                onChange={handleChange}
                className="mt-1 outline-none border py-1 border-black rounded cursor-pointer text-center w-full"
              >
                <option value="" disabled>
                  Chọn hướng nhìn
                </option>
                <option value="biển">biển</option>
                <option value="đường phố">đường phố</option>
                <option value="núi">núi</option>
                <option value="rừng">rừng</option>
              </select>
            </div>
          </div>
          <div>
            <p>Tiện nghi cơ bản:</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Tủ lạnh mini"
                  checked={formData.tien_nghi.includes("Tủ lạnh mini")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Tủ lạnh mini</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Bộ ấm đun nước và tách trà/cà phê"
                  checked={formData.tien_nghi.includes(
                    "Bộ ấm đun nước và tách trà/cà phê"
                  )}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Bộ ấm đun nước và tách trà/cà phê</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Bàn làm việc"
                  checked={formData.tien_nghi.includes("Bàn làm việc")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Bàn làm việc</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Wi-Fi miễn phí"
                  checked={formData.tien_nghi.includes("Wi-Fi miễn phí")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Wi-Fi miễn phí</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Dịch vụ phòng"
                  checked={formData.tien_nghi.includes("Dịch vụ phòng")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Dịch vụ phòng</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Két sắt an toàn"
                  checked={formData.tien_nghi.includes("Két sắt an toàn")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Két sắt an toàn</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Đèn đọc sách cạnh giường"
                  checked={formData.tien_nghi.includes(
                    "Đèn đọc sách cạnh giường"
                  )}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Đèn đọc sách cạnh giường</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Quạt trần hoặc quạt đứng"
                  checked={formData.tien_nghi.includes(
                    "Quạt trần hoặc quạt đứng"
                  )}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Quạt trần hoặc quạt đứng</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Bộ đồ ngủ và dép đi trong phòng"
                  checked={formData.tien_nghi.includes(
                    "Bộ đồ ngủ và dép đi trong phòng"
                  )}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Bộ đồ ngủ và dép đi trong phòng</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Gương toàn thân"
                  checked={formData.tien_nghi.includes("Gương toàn thân")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Gương toàn thân</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Bộ vệ sinh cá nhân (bàn chải, kem đánh răng, dầu gội, sữa tắm)"
                  checked={formData.tien_nghi.includes(
                    "Bộ vệ sinh cá nhân (bàn chải, kem đánh răng, dầu gội, sữa tắm)"
                  )}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>
                  Bộ vệ sinh cá nhân (bàn chải, kem đánh răng, dầu gội, sữa tắm)
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Nước uống miễn phí (chai nước)"
                  checked={formData.tien_nghi.includes(
                    "Nước uống miễn phí (chai nước)"
                  )}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Nước uống miễn phí (chai nước)</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Ổ cắm điện đa năng"
                  checked={formData.tien_nghi.includes("Ổ cắm điện đa năng")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Ổ cắm điện đa năng</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Bộ đồ dùng may vá cơ bản"
                  checked={formData.tien_nghi.includes(
                    "Bộ đồ dùng may vá cơ bản"
                  )}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Bộ đồ dùng may vá cơ bản</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="Kệ hoặc giá treo quần áo"
                  checked={formData.tien_nghi.includes(
                    "Kệ hoặc giá treo quần áo"
                  )}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Kệ hoặc giá treo quần áo</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRoom;
