const express = require("express");
const route = express.Router();
const { create, list, read } = require("../controllers/bills");
const { checkAuthen, checkRole } = require("../middlewares/auth");

route.post("/bills", create);
route.get("/bills", checkAuthen, checkRole, list);
route.get("/bills/:id", checkAuthen, read);

module.exports = route;
