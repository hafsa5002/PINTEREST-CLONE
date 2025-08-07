// models/boardModel.js
const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user who owns this board
      required: true,
    },
    pins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pin", // Reference to pins saved in this board
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Board", boardSchema);
