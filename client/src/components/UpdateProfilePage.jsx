import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const [ten, setTen] = useState("");
  const [so_dien_thoai, setso_dien_thoai] = useState("");
  const [dia_chi, setDia_chi] = useState("");
  const { id } = useParams(); // Lấy ID từ URL

  const fetcher = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/customer/${id}`);
      const result = await res.json();
      if (res.ok) {
        setTen(result?.data?.ten);
        setso_dien_thoai(result?.data?.so_dien_thoai);
        setDia_chi(result?.data?.dia_chi);
      } else {
        console.error("Lỗi khi tải dữ liệu:", result.message);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi gọi API:", error);
    }
  };

  useEffect(() => {
    fetcher();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5001/api/customer/profile/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ten, so_dien_thoai, dia_chi }),
        }
      );
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        navigate("/user/setting");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
    }
  };

  return (
    <div className="h-[69.7vh]">
      <form onSubmit={handleSubmit} className="bg-white px-3 py-1">
        <h3 className="text-center py-2">Cập nhật thông tin</h3>
        <div>
          <label>
            Họ và tên
            <br />
            <input
              type="text"
              name="ten"
              value={ten}
              onChange={(e) => setTen(e.target.value)}
              className="outline-none border-gray-500 border px-2 w-full rounded mt-2 py-2"
            />
          </label>
          <br />
          <label>
            Số điện thoại
            <br />
            <input
              type="text"
              name="so_dien_thoai"
              value={so_dien_thoai}
              onChange={(e) => setso_dien_thoai(e.target.value)}
              className="outline-none border-gray-500 border px-2 w-full rounded mt-2 py-2"
            />
          </label>
          <br />
          <label>
            Địa chỉ
            <br />
            <textarea
              name="dia_chi"
              value={dia_chi}
              onChange={(e) => setDia_chi(e.target.value)}
              className="w-full outline-none border-gray-500 border px-2 rounded mt-2 py-2"
            ></textarea>
          </label>
        </div>
        <br />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
