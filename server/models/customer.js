const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    ten: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    so_dien_thoai: {
      type: String,
      required: true,
      unique: true,
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
      required: false,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("khachhang", customerSchema);

module.exports = Customer;
