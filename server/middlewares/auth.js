const jwt = require("jsonwebtoken");
const customer = require("../models/customer");

exports.checkAuthen = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res.status(401).json({ message: "Không có Token!" });
    }
    const token = headerToken.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.send({ message: "Token Invalid", error: error });
  }
};

exports.checkRole = async (req, res, next) => {
  try {
    const checkRole = req.user.role;
    // console.log(req.user.role);
    if (checkRole.role !== "admin") {
      return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
    }

    next();
  } catch (error) {
    res.send({ message: "Token Invalid", error: error });
  }
};
