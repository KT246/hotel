const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    so_phong: {
      type: Number,
      required: true,
    },
    name_phong: {
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
    hinh_anh: {
      type: [File],
      required: false,
    },
    phuong_nhin: {
      type: String,
      required: false,
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
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  ten: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
    enum: ["Nam", "Nữ", "Khác"],
    required: false,
  },
  ngay_tao: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

const bookingSchema = new mongoose.Schema(
  {
    khach_hang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    phong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
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
      enum: ["pending", "confirmed", "cancelled", "completed"],
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;

const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    khach_hang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    dat_phong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    ngay_lap: {
      type: Date,
      default: Date.now,
      required: true,
    },
    ngay_thanh_toan: {
      type: Date,
      required: false,
    },
    tong_tien: {
      type: Number,
      required: true,
    },
    trang_thai: {
      type: String,
      enum: ["unpaid", "paid", "cancelled"],
      required: true,
      default: "unpaid",
    },
    chi_tiet: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    ten: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
