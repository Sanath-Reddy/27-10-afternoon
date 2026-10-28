const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    usn:  { type: String, required: true, unique: true },
    email: { type: String, required: true },
    department: {
      type: String,
      enum: ["CSE", "ISE", "ECE", "ME"],
      default: "CSE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
