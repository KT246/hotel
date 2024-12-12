const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    khach_hang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "khachhang",
      required: true,
    },
    phong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "phong",
      required: true,
    },
    ngay_dat_phong: {
      type: Date,
      default: Date.now,
      required: true,
    },
    ngay_den: {
      type: Date,
      required: true,
    },
    ngay_di: {
      type: Date,
      required: true,
    },
    so_dem: {
      type: Number,
      required: true,
    },
    gia_tong: {
      type: Number,
      required: true,
    },
    trang_thai: {
      type: String,
      required: true,
      default: "cho_xac_nhan",
    },
    phuong_thuc_thanh_toan: {
      type: String,
      default: "Thanh toán sau khi trả phòng (Tiền mặt)",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("datphong", bookingSchema);

module.exports = Booking;
