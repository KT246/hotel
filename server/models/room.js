const mongoose = require("mongoose");

const PhongSchema = new mongoose.Schema(
  {
    so_phong: {
      type: Number,
      required: true,
    },
    ten_phong: {
      type: String,
      required: true,
    },
    tien_nghi: {
      type: [String],
      required: true,
    },
    trang_thai: {
      type: String,
      required: true,
    },
    huong_nhin: {
      type: String,
      required: true,
    },
    gia_dem: {
      type: Number,
      required: true,
    },
    so_giuong: {
      type: Number,
      required: true,
    },
    so_nguoi: {
      type: Number,
      required: true,
    },
    hinh_anh: [{ name: String, data: Buffer, contentType: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("phong", PhongSchema);
