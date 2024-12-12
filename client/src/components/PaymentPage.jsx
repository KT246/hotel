import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormatNumber } from "../libs/Format";
import { getToken } from "../libs/tokenHotel";

const PaymentPage = () => {
  const [select, setSelect] = useState("Thanh toán khi trả phòng (Tiền mặt)");
  const [ngayDat, setNgayDat] = useState("");
  const [ngayTra, setNgayTra] = useState("");
  const [gia, setGia] = useState(0);
  const [soNgay, setSoNgay] = useState(0);
  const [err, setErr] = useState("");
  const [rooms, setRooms] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();
  const inFo = getToken();

  // Hàm fetch dữ liệu từ API
  const fetchRoomData = async () => {
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

  useEffect(() => {
    fetchRoomData();
  }, [id]);

  const handleDateChange = (type, value) => {
    if (type === "ngayDat") {
      setNgayDat(value);
      if (value > ngayTra) {
        setErr("Ngày đặt phải nhỏ hơn ngày trả");
        setGia(0);
      } else {
        setErr("");
        calculateCost(value, ngayTra);
      }
    } else if (type === "ngayTra") {
      setNgayTra(value);
      if (ngayDat > value) {
        setErr("Ngày trả phải lớn hơn ngày đặt");
        setGia(0);
      } else {
        setErr("");
        calculateCost(ngayDat, value);
      }
    }
  };

  const calculateCost = (startDate, endDate) => {
    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24);
    setSoNgay(days > 0 ? days : 0);
    setGia(days > 0 ? 500000 * days : 0);
  };

  const handlePaymentChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    if (value !== "Thanh toán khi trả phòng") {
      setErr(`Chưa hỗ trợ phương thức => ${value}`);
    } else {
      setErr("");
    }
  };

  if (!rooms) {
    return <div>Loading...</div>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/booking/online", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          khach_hang: inFo.id,
          phong: rooms._id,
          ngay_den: ngayDat,
          ngay_di: ngayTra,
          gia_tong: gia,
          so_dem: soNgay,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate("/user");
      } else {
        alert("Đặt phòng thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-200 px-32">
      <div className="h-[73.3vh] bg-white">
        <h1 className="text-xl ps-14 py-4 font-semibold border-b mb-1">
          Thanh Toán
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2">
          <RoomDetails room={rooms} />
          <CustomerDetails inFo={inFo} />
          <BookingDetails
            ngayDat={ngayDat}
            ngayTra={ngayTra}
            err={err}
            gia={gia}
            onDateChange={handleDateChange}
            onPaymentChange={handlePaymentChange}
            select={select}
          />
          <Summary gia={gia} soNgay={soNgay} />
        </form>
      </div>
    </div>
  );
};

const RoomDetails = ({ room }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        <div className="w-[250px] h-[110px] place-self-end">
          <img
            src={`data:${room.hinh_anh[0].contentType};base64,${btoa(
              new Uint8Array(room.hinh_anh[0].data.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )}`}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="text-sm">
          <p className="text-lg">{room.ten_phong}</p>
          <p>Số phòng: {room.so_phong}</p>
          <p>Giá: {FormatNumber(room.gia_dem)}/đêm</p>
          <p>Hướng nhìn: {room.huong_nhin}</p>
          <p>Giường: {room.so_giuong} giường</p>
        </div>
      </div>
    </div>
  );
};

const CustomerDetails = ({ inFo }) => {
  return (
    <div className="text-sm">
      <p>Họ và tên: khamtay kongmanh</p>
      <p>Số điện thoại: +44681545466</p>
      <p>Email: {inFo?.email}</p>
      <p>Địa chỉ: {inFo?.address}</p>
    </div>
  );
};

const BookingDetails = ({
  ngayDat,
  ngayTra,
  err,
  gia,
  onDateChange,
  onPaymentChange,
  select,
}) => {
  return (
    <div className="px-14 col-span-2 mt-2">
      <p className="my-3">Phương thức thanh toán:</p>
      <div>
        <PaymentOption
          value="Thanh toán khi trả phòng"
          checked={select === "Thanh toán khi trả phòng"}
          onChange={onPaymentChange}
        />
        <PaymentOption
          value="Thanh toán bằng thẻ tín dụng"
          onChange={onPaymentChange}
        />
        <PaymentOption
          value="Thanh toán bằng smart banking"
          onChange={onPaymentChange}
        />
        <p className="text-red-500">{err}</p>
      </div>
      <div className="grid grid-cols-2 place-items-center mt-5">
        <DateInput
          label="Ngày đặt"
          value={ngayDat}
          onChange={(e) => onDateChange("ngayDat", e.target.value)}
        />
        <DateInput
          label="Ngày trả"
          value={ngayTra}
          onChange={(e) => onDateChange("ngayTra", e.target.value)}
        />
      </div>
    </div>
  );
};

const PaymentOption = ({ value, checked, onChange }) => {
  return (
    <div>
      <input
        type="radio"
        name="payment"
        value={value}
        className="mt-1"
        checked={checked}
        onChange={onChange}
      />
      <span className="ps-2">{value}</span>
      <br />
    </div>
  );
};

const DateInput = ({ label, value, onChange }) => {
  return (
    <p>
      <span className="block">{label}:</span>
      <input
        type="date"
        className="w-[200px] h-[30px]"
        value={value}
        onChange={onChange}
      />
    </p>
  );
};

const Summary = ({ gia, soNgay }) => {
  return (
    <div className="border-t col-span-2 flex justify-between px-10 py-3 mt-3">
      <div className="flex items-center gap-5">
        <span className="text-lg">Tổng tiền</span>
        <input
          type="text"
          readOnly
          value={FormatNumber(gia)}
          className="outline-none border rounded py-1 px-2"
        />
      </div>
      <div className="flex items-center gap-5">
        <span className="text-lg">Số ngày</span>
        <input
          type="number"
          readOnly
          value={soNgay}
          className="outline-none border rounded py-1 px-2"
        />
      </div>
      <input
        type="submit"
        value="Thanh toán"
        className="bg-blue-500 px-3 py-1 text-white cursor-pointer"
      />
    </div>
  );
};

export default PaymentPage;
