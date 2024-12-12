import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePasswordPage = () => {
  const { id } = useParams(); // Lấy ID từ URL  const navigate = useNavigate();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5001/api/customer/password/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
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
    }
  };

  return (
    <div className="h-[69.7vh]">
      <form onSubmit={handleSubmit} className="bg-white px-3 py-1">
        <h3 className="text-center py-2">Cập nhật mật khẩu</h3>
        <div>
          <label>
            Mật khẩu hiện tại
            <br />
            <input
              type="password"
              name="current_password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="outline-none border-gray-500 border px-1 w-full rounded mt-2 py-1"
            />
          </label>
          <br />
          <label>
            Mật khẩu mới
            <br />
            <input
              type="password"
              name="new_password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="outline-none border-gray-500 border px-1 w-full rounded mt-2 py-1"
            />
          </label>
          <br />
          <label>
            Nhập lại mật khẩu mới
            <br />
            <input
              type="password"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="outline-none border-gray-500 border px-1 w-full rounded mt-2 py-1"
            />
          </label>
          <br />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-5"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
