const Customer = require("../models/customer");
const bcrypt = require("bcrypt");

exports.read = async (req, res) => {
  const id = req.params.id;
  try {
    // Tìm khách hàng theo id và chỉ lấy các trường 'ten' và 'so_dien_thoai'
    const data = await Customer.findOne(
      { _id: id },
      "ten so_dien_thoai dia_chi"
    );
    if (!data) {
      return res.status(404).send({ message: "Không tìm thấy khách hàng!" });
    }
    // Trả về thông tin tên và số điện thoại
    console.log(data);
    res.send({ data: data });
  } catch (error) {
    res.status(500).send(`Server error: ${error}`);
  }
};

exports.update_pf = async (req, res) => {
  const id = req.params.id;
  try {
    // Cập nhật thông tin khách hàng
    const data = await Customer.findByIdAndUpdate(
      id, // Tìm khách hàng theo ID
      { $set: req.body }, // Cập nhật các trường trong body request
      { new: true } // Trả về đối tượng đã cập nhật
    );

    if (!data) {
      return res.status(404).send({ message: "Không tìm thấy khách hàng!" });
    }

    res.send({ message: "Cập nhật thông tin thành công!", data });
  } catch (error) {
    res.status(500).send(`Server error: ${error}`);
  }
};

exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const id = req.params.id;

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).send({ message: "Không tìm thấy khách hàng!" });
    }

    // So sánh mật khẩu hiện tại với mật khẩu trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(currentPassword, customer.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Mật khẩu hiện tại không chính xác!" });
    }

    // Mã hóa mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Cập nhật mật khẩu mới trong cơ sở dữ liệu
    customer.password = hashedPassword;
    await customer.save();

    res.send({ message: "Cập nhật mật khẩu thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Lỗi máy chủ: ${error.message}` });
  }
};
