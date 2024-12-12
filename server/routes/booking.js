const express = require("express");
const route = express.Router();
const {
  create_online,
  create_offline,
  list,
  read,
  update,
  remove,
  update_active,
  update_getRoom,
  go,
  checkout,
} = require("../controllers/booking");

route.post("/booking/online", create_online);
route.post("/booking/offline", create_offline);
route.get("/booking", list);
route.get("/booking/:id", read);
route.delete("/booking/:id", remove);
route.put("/booking/:id", update);
route.put("/booking/active/:id", update_active);
route.put("/booking/get-room/:id", update_getRoom);
route.put("/booking/go/:id", go);
route.put("/booking/checkout/:id", checkout);

module.exports = route;
