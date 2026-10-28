const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title:      { type: String, required: true },
    code:       { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    credits:    { type: Number, min: 1, max: 5 },
    department: {
      type: String,
      enum: ["CSE", "ISE", "ECE", "ME"],
      default: "CSE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
