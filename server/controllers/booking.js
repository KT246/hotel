const booking = require("../models/booking");
const customer = require("../models/customer");
const room = require("../models/room");

exports.create_online = async (req, res) => {
  try {
    await booking.create(req.body);
    console.log(req.body);
    res.send({ message: "Create booking successful" });
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.create_offline = async (req, res) => {
  const {
    ten,
    email,
    so_dien_thoai,
    dia_chi,
    ngay_sinh,
    gioi_tinh,
    phong,
    ngay_den,
    ngay_di,
    so_dem,
    gia_tong,
  } = req.body;

  try {
    console.log(req.body);

    const phong_id = await room.findOne({ so_phong: phong }).exec();

    // Kiểm tra khách hàng tồn tại

    const emailExist = await customer.findOne({ email: email }).exec();
    if (emailExist) {
      throw new Error("Email đã tồn tại");
    }

    // Nếu không tồn tại, tạo khách hàng mới
    if (!emailExist) {
      khach_hang = await customer.create({
        ten,
        email,
        password: "",
        so_dien_thoai,
        dia_chi,
        ngay_sinh,
        gioi_tinh,
      });
    }

    // Tạo booking
    await booking.create({
      khach_hang: khach_hang._id,
      phong: phong_id._id,
      ngay_den,
      ngay_di,
      so_dem,
      gia_tong,
      trang_thai: "da_nhan_phong",
    });

    // Cập nhật trạng thái phòng
    await room
      .findOneAndUpdate(
        { _id: phong_id._id },
        { $set: { trang_thai: "dang thue" } },
        { new: true }
      )
      .exec();

    res.send({ message: "Create booking successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Server error: ${error.message}` });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await booking
      .find()
      .populate("khach_hang")
      .populate("phong")
      .exec();
    // console.log(data);
    res.send({ message: "Create booking successful", data: data });
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await booking
      .find({ _id: id })
      .populate("khach_hang")
      .populate("phong")
      .exec();
    console.log(id);
    res.send({ message: "Create booking successful", data: data });
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);
    await booking
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            trang_thai: "da_xac_nhan",
          },
        },
        { new: true }
      )
      .exec();
    res.send("Xác nhận đặt phòng thành công! ");
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.update_getRoom = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await booking.findOne({ _id: id }).exec();
    // console.log(data);
    const ngayDi = new Date(data.ngay_di);
    const ngayDen = Date.now();
    const dat = ngayDi - ngayDen;
    const soNgay = Math.ceil(dat / (1000 * 60 * 60 * 24));
    // console.log(soNgay);

    await booking
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            so_dem: soNgay,
            ngay_den: ngayDen,
            trang_thai: "da_nhan_phong",
          },
        },
        {
          new: true,
        }
      )
      .exec();
    await room
      .findOneAndUpdate(
        { _id: data.phong },
        {
          $set: { trang_thai: "dang thue" },
        },
        {
          new: true,
        }
      )
      .exec();
    res.send("update booking successful");
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.go = async (req, res) => {
  const id = req.params.id;
  try {
    const { ngay_di } = req.body;
    const update = await booking.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ngay_di,
        },
      },
      {
        new: true,
      }
    );

    const Phong = await room.findOne({ _id: update.phong });

    const giaDem = Phong.gia_dem;
    const Den = new Date(update.ngay_den);
    const Di = new Date(update.ngay_di);
    const dat = Di - Den;
    const soNgay = Math.ceil(dat / (1000 * 60 * 60 * 24));
    console.log(soNgay);

    await booking
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            so_dem: soNgay,
            gia_tong: soNgay * giaDem,
          },
        }
      )
      .exec();
    res.send("Đã đặt phòng thành công!");
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.update_active = async (req, res) => {
  const id = req.params.id;
  try {
    await booking
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            trang_thai: "da_xac_nhan",
          },
        }
      )
      .exec();
    res.send({ message: "Đã đặt phòng thành công!" });
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.checkout = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await booking.findOne({ _id: id });
    await room
      .findOneAndUpdate(
        { _id: data.phong },
        {
          $set: {
            trang_thai: "trong",
          },
        }
      )
      .exec();

    await booking
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            trang_thai: "da_hoan_thanh",
          },
        },
        {
          new: true,
        }
      )
      .exec();
    res.send("Đã trả phòng thành công!");
  } catch (error) {
    res.send(`Sever error: ${error}`);
  }
};

exports.remove = async (req, res) => {
  try {
    //
    const id = req.params.id;
    const data = await booking.findOne({ _id: id }).exec();
    await room
      .findOneAndUpdate(
        { _id: data.phong },
        {
          $set: {
            trang_thai: "trong",
          },
        },
        { new: true }
      )
      .exec();
    await booking.findOneAndDelete({ _id: id }).exec();
    res.send("Hủy thành công!");
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};
