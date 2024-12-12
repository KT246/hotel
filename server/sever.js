// Step 1
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");
const { readdirSync } = require("fs");

require("dotenv").config();

const app = express();

// Kết nối đến cơ sở dữ liệu
connectDB();

// Middleware
app.use(morgan("dev")); // Logger middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Đọc các route từ thư mục routes và thêm vào ứng dụng
readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Step 2
// Lắng nghe trên cổng từ biến môi trường hoặc cổng mặc định
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
