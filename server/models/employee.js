const mongoose = require("mongoose");

const NhanVienSchema = new mongoose.Schema(
  {
    ten: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    so_dien_thoai: {
      type: String,
      required: true,
    },
    dia_chi: {
      type: String,
      required: true,
    },
    ngay_sinh: {
      type: Date,
      required: false,
    },
    gioi_tinh: {
      type: String,
      enum: ["Nam", "Nữ", "Khác"],
      required: false,
    },
    chuc_vu: {
      type: String,
      required: true,
    },
    ngay_bat_dau: {
      type: Date,
      required: true,
    },
    luong: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("nhanVien", NhanVienSchema);
