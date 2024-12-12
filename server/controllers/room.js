const room = require("../models/room");

exports.create = async (req, res) => {
  const files = req.files;
  try {
    const {
      so_phong,
      ten_phong,
      tien_nghi,
      trang_thai,
      gia_dem,
      so_giuong,
      so_nguoi,
      huong_nhin,
    } = req.body;

    const newRoom = await room.create({
      so_phong: so_phong,
      ten_phong: ten_phong,
      tien_nghi: tien_nghi,
      trang_thai: trang_thai,
      gia_dem: gia_dem,
      so_giuong: so_giuong,
      so_nguoi: so_nguoi,
      huong_nhin: huong_nhin,
    });

    const Imagaes = files.map((file) => ({
      name: file.originalname,
      data: file.buffer,
      contentType: file.mimetype,
    }));

    newRoom.hinh_anh = Imagaes;

    await newRoom.save();

    res.send("Tạo phòng thành công!");
  } catch (error) {
    console.error("Lỗi server:", error);
    res.status(500).send({ message: `Lỗi server: ${error.message}` });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await room.find({}).exec();
    // console.log(data);
    res.send({ message: "Get list success", data: data });
  } catch (error) {
    res.status(500).send("Sever error");
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await room.find({ _id: id }).exec();
    res.send({ message: "Get room success", data: data });
  } catch (error) {
    res.status(500).send("Sever error");
  }
};
exports.read_name_room = async (req, res) => {
  try {
    const id = req.params.id;
    // Sử dụng $regex để tìm kiếm tên phòng có chứa id, không phân biệt hoa thường
    const data = await room
      .find({ ten_phong: { $regex: id, $options: "i" } })
      .exec();

    if (data.length === 0) {
      return res.status(404).send({ message: "No rooms found" });
    }

    res.send({ message: "Get room success", data: data });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      so_phong,
      ten_phong,
      tien_nghi,
      trang_thai,
      huong_nhin,
      gia_dem,
      so_giuong,
      so_nguoi,
    } = req.body;
    const data = await room.findOne({ _id: id });

    if (!data) {
      return res.status(404).send({ message: "Phòng không tồn tại!" });
    }
    // Cập nhật thông tin phòng
    const updatedRoom = await room.findByIdAndUpdate(
      id,
      {
        so_phong,
        ten_phong,
        tien_nghi,
        trang_thai,
        huong_nhin,
        gia_dem,
        so_giuong,
        so_nguoi,
      },
      { new: true } // Trả về bản ghi đã cập nhật
    );

    res.send({
      message: "Cập nhật phòng thành công!",
    });
  } catch (error) {
    console.error("Lỗi server:", error);
    res.status(500).send({ message: `Lỗi server: ${error.message}` });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await room.findOne({ _id: id }).exec();

    if (data.tinh_trang === "dang_thue") {
      return res.send({ message: "Phòng đang thuê không thể xóa được." });
    }
    await room.findOneAndDelete({ _id: id }).exec();
    res.send({ message: "Đã xóa phòng và hình ảnh thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Lỗi server." });
  }
};

exports.suggestions = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ suggestions: [] });
    }

    // Tìm kiếm các phòng trong MongoDB
    const suggestions = await room
      .find({
        ten_phong: { $regex: query, $options: "i" }, // Tìm kiếm không phân biệt hoa thường
      })
      .limit(10) // Giới hạn kết quả trả về

      .exec();

    // Trả về danh sách tên phòng
    res.json({ suggestions: suggestions.map((phong) => phong.ten_phong) });
  } catch (error) {
    console.error("Lỗi khi tìm kiếm phòng:", error);
    res.status(500).send({ message: "Lỗi server." });
  }
};
