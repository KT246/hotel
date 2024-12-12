import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormatDate } from "../../libs/Format";
import { useNavigate } from "react-router-dom";

const UpdateCheckin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkin, setCheckin] = useState({ ngay_di: "", booking_id: "" });
  const [formData, setFormData] = useState(null);

  const handleChange = (e) => {
    setCheckin({
      ...checkin,
      [e.target.name]: e.target.value,
      booking_id: formData._id,
    });
  };

  const fetcher = async () => {
    const response = await fetch(`http://localhost:5001/api/booking/${id}`);
    const dataObj = await response.json();
    setFormData(dataObj.data[0]);
  };

  console.log(formData);
  console.log(checkin);

  const playLoad = () => {
    fetcher();
  };

  useEffect(() => {
    playLoad();
  }, []);

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5001/api/booking/go/${checkin.booking_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ngay_di: checkin.ngay_di,
          }),
        }
      );
      const data = await res.text();
      if (res.ok) {
        alert(data);
        navigate("/admin/checkin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit}>
        <p className="mt-2">
          Tên khách hàng:
          <input
            type="text"
            value={formData.khach_hang.ten}
            readOnly
            className="border text-center text-gray-600 outline-none rounded"
          />
        </p>
        <p className="mt-2">
          Số điện thoại:
          <input
            type="text"
            value={formData.khach_hang.so_dien_thoai}
            readOnly
            className="border text-center text-gray-600 outline-none rounded"
          />
        </p>
        <p className="mt-2">
          Số phòng:
          <input
            type="text"
            value={formData.phong.so_phong}
            readOnly
            className="border text-center text-gray-600 outline-none rounded"
          />
        </p>
        <p className="mt-2">
          Tên phòng:
          <input
            type="text"
            value={formData.phong.ten_phong}
            readOnly
            className="border text-center text-gray-600 outline-none rounded"
          />
        </p>
        <p className="mt-2">
          Số ngày ở:
          <input
            type="text"
            value={formData.so_dem}
            readOnly
            className="border text-center text-gray-600 outline-none rounded"
          />
        </p>
        <p className="mt-2">
          Giá/đêm:
          <input
            type="text"
            value={formData.phong.gia_dem}
            readOnly
            className="border text-center text-gray-600 outline-none rounded"
          />
        </p>
        <p className="mt-2">
          Trạng thái:
          <input
            type="text"
            value={"Đã nhận phòng"}
            readOnly
            className="border text-center text-gray-600 outline-none rounded"
          />
        </p>
        <p>
          <span>Ngày nhận:</span>
          <input
            type="date"
            value={FormatDate(formData.ngay_den)}
            readOnly
            className="border outline-none rounded mt-3 ms-5"
          />
        </p>
        <p>
          <span>Ngày trả:</span>
          <input
            type="date"
            value={FormatDate(formData.ngay_di)}
            readOnly
            className="border outline-none rounded mt-3 ms-5"
          />
        </p>
        <p>
          <span>Chọn lại ngày đi:</span>
          <input
            type="date"
            name="ngay_di"
            onChange={handleChange}
            className="border outline-none rounded mt-3 ms-5"
          />
        </p>
        <button
          type="submit"
          className="bg-green-500 text-white px-2 rounded mt-5"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default UpdateCheckin;
