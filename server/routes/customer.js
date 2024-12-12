const express = require("express");
const route = express.Router();
const { read, update_pf, updatePassword } = require("../controllers/customer");

// route.post("/bills", create);
route.get("/customer/:id", read);
route.put("/customer/profile/:id", update_pf);
route.put("/customer/password/:id", updatePassword);

module.exports = route;
