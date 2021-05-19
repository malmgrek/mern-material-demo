const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String },
  rating: { type: Number },
  userId: {type: String}
})

module.exports = Item = mongoose.model("items", schema);
