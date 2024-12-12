import React, { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";

const UpdateRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errSel, setErrSel] = useState(false);

  const [formData, setFormData] = useState({
    so_phong: "",
    ten_phong: "",
    gia_dem: "",
    so_nguoi: "",
    so_giuong: "",
    trang_thai: "",
    huong_nhin: "",
    tien_nghi: [],
    images: [],
  });

  const fetcher = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/room/${id}`);
      if (res.ok) {
        const dataObj = await res.json();
        setFormData({
          so_phong: dataObj.data[0]?.so_phong || "",
          ten_phong: dataObj.data[0]?.ten_phong || "",
          gia_dem: dataObj.data[0]?.gia_dem || "",
          so_nguoi: dataObj.data[0]?.so_nguoi || "",
          so_giuong: dataObj.data[0]?.so_giuong || "",
          trang_thai: dataObj.data[0]?.trang_thai || "",
          huong_nhin: dataObj.data[0]?.huong_nhin || "",
          tien_nghi: dataObj.data[0]?.tien_nghi?.[0]?.split(",") || [],
          images: dataObj.data[0]?.hinh_anh || [],
        });
      } else {
        console.log("Lỗi khi tải dữ liệu phòng");
      }
    } catch (error) {
      console.error("Lỗi server:", error);
    }
  };

  console.log(formData);
  useEffect(() => {
    fetcher();
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 6) {
      setErrSel(true);
    } else {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => {
          formDataToSubmit.append("images", file);
        });
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    try {
      const res = await fetch(`http://localhost:5001/api/room/${id}`, {
        method: "PUT",
        body: formDataToSubmit, // Sử dụng FormData
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        navigate("/admin/room");
      } else {
        alert("Lỗi khi tạo phòng: " + data.message);
      }
    } catch (error) {
      alert("Lỗi khi kết nối tới server:" + error);
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
              <i>Tối đa 6 hình</i>
            </p>
          </div>
          <button
            type="submit"
            className="uppercase me-10 bg-blue-500 text-white px-2 py-px rounded"
          >
            Cập nhật phòng
          </button>
        </div>
        <div className="flex gap-3 py-3">
          {formData.images.map((room, i) => (
            <div key={i} className="relative w-40 h-32">
              <img
                src={`data:${room.contentType};base64,${btoa(
                  new Uint8Array(room.data.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                )}`}
                alt={`room-image-${i}`}
                className="w-full h-full border-2 border-dashed"
              />
            </div>
          ))}
        </div>

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
                name="huong_nhin"
                value={formData.huong_nhin}
                onChange={handleChange}
                className="mt-1 outline-none border py-1 border-black rounded cursor-pointer text-center w-full"
              >
                <option value="" disabled>
                  Chọn hướng nhìn
                </option>
                <option value="bien">biển</option>
                <option value="duong pho">đường phố</option>
                <option value="nui">núi</option>
                <option value="rung">rừng</option>
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
                  value="tu_lanh_mini"
                  checked={formData.tien_nghi.includes("tu_lanh_mini")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Tủ lạnh mini</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="am_tra_ca_phe"
                  checked={formData.tien_nghi.includes("am_tra_ca_phe")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Bộ ấm đun nước và tách trà/cà phê</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="ban_lam_viec"
                  checked={formData.tien_nghi.includes("ban_lam_viec")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Bàn làm việc</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="wifi_mien_phi"
                  checked={formData.tien_nghi.includes("wifi_mien_phi")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Wi-Fi miễn phí</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="dich_vu_phong"
                  checked={formData.tien_nghi.includes("dich_vu_phong")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Dịch vụ phòng</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="ket_sat_an_toan"
                  checked={formData.tien_nghi.includes("ket_sat_an_toan")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Két sắt an toàn</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="den_doc_sach"
                  checked={formData.tien_nghi.includes("den_doc_sach")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Đèn đọc sách cạnh giường</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="quat_tran"
                  checked={formData.tien_nghi.includes("quat_tran")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Quạt trần hoặc quạt đứng</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="bo_do_ngu_dep"
                  checked={formData.tien_nghi.includes("bo_do_ngu_dep")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Bộ đồ ngủ và dép đi trong phòng</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="guong_toan_than"
                  checked={formData.tien_nghi.includes("guong_toan_than")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Gương toàn thân</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="bo_ve_sinh_ca_nhan"
                  checked={formData.tien_nghi.includes("bo_ve_sinh_ca_nhan")}
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
                  value="nuoc_uong"
                  checked={formData.tien_nghi.includes("nuoc_uong")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Nước uống miễn phí (chai nước)</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="o_cam_da_nang"
                  checked={formData.tien_nghi.includes("o_cam_da_nang")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Ổ cắm điện đa năng</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="bo_dung_may_va"
                  checked={formData.tien_nghi.includes("bo_dung_may_va")}
                  onChange={handleChange}
                  className="w-4 h-4 focus:bg-inherit"
                />
                <span>Bộ đồ dùng may vá cơ bản</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  name="tien_nghi"
                  value="ke_treo_quan_ao"
                  checked={formData.tien_nghi.includes("ke_treo_quan_ao")}
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

export default UpdateRoom;
