const bills = require("../models/bills");
const booking = require("../models/booking");
const room = require("../models/room");
const customer = require("../models/customer");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    await bills.create(req.body);
    res.status(200).send("create bills successful");
  } catch (error) {
    res.status(500).send({ message: "Sever error", error: error });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await bills.find({}).exec();
    res.status(200).send({ message: "get list bills successful", data: data });
  } catch (error) {
    res.status(500).send({ message: "Sever error", error: error });
  }
};

exports.read = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await bills.findOne({ _id: id }).exec();
    res.status(200).send({ message: "ok", data: data });
  } catch (error) {
    res.status(500).send({ message: "Sever error", error: error });
  }
};
