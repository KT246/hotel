const auth = require("../models/customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");

exports.register = async (req, res) => {
  try {
    const {
      ten,
      email,
      password,
      so_dien_thoai,
      dia_chi,
      ngay_sinh,
      gioi_tinh,
    } = req.body;
    console.log(req.body);
    // 1. check emil
    const checkEmail = await auth.find({ email: email }).exec();
    if (checkEmail.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    const data = await auth.create({
      ten,
      email,
      password: hashPassword,
      so_dien_thoai,
      dia_chi,
      ngay_sinh,
      gioi_tinh,
    });
    res.send({ message: "Đăng ký thành công!" });
  } catch (error) {
    res.status(500).send({ message: "Sever error", error: error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // 1. Kiểm tra email
    const user = await Customer.findOne({ email }).exec();
    if (!user) {
      return res.status(400).send({ message: "Email không đúng!" });
    }

    // 2. Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Mật khẩu không đúng!" });
    }

    // 3. Payload
    const playload = {
      id: user._id,
      name: user.ten,
      email: user.email,
      address: user.dia_chi,
      role: user.role, // Hoặc các thuộc tính cần thiết khác
    };
    console.log(playload);

    // 4. Tạo token
    jwt.sign(
      playload,
      process.env.SECRET_KEY, // Đảm bảo rằng SECRET_KEY có trong file .env
      { expiresIn: "1h" }, // Token có hạn sử dụng là 1 ngày
      (err, token) => {
        if (err) {
          return res.status(500).send({ message: `Lỗi máy chủ ${err}` });
        }

        res.json({ playload, token }); // Trả về token cho client
      }
    );
  } catch (error) {
    res.status(500).send({ message: `Lỗi máy chủ ${error}` });
  }
};
