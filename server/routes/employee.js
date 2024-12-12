const express = require("express");
const route = express.Router();
const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/employee");

route.post("/employee", create);
route.get("/employee", list);
route.get("/employee/:id", read);
route.delete("/employee/:id", remove);
route.put("/employee/:id", update);

module.exports = route;
