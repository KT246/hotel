const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    dat_phong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "datphong",
      required: true,
    },
    ngay_thanh_toan: {
      type: Date,
      default: Date.now,
      required: true,
    },
    tong_tien: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Hoadon", invoiceSchema);

module.exports = Invoice;
