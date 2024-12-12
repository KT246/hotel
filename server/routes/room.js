const express = require("express");
const mt = require("multer");
const router = express.Router();
const {
  create,
  suggestions,
  list,
  read,
  read_name_room,
  update,
  remove,
} = require("../controllers/room");
const upload = mt();

router.post("/room", upload.array("images", 10), create);
router.get("/room", list);
router.get("/room/:id", read);
router.get("/room/search/:id", read_name_room);
router.put("/room/:id", upload.array("images", 10), update);
router.delete("/room/:id", remove);
router.get("/suggestions", suggestions);

module.exports = router;
