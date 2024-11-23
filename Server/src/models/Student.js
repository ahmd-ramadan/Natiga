const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    ar: {
      type: Number,
      required: true,
    },
    en: {
      type: Number,
      required: true,
    },
    ma: {
      type: Number,
      required: true,
    },
    sc: {
      type: Number,
      required: this.year > 3,
    },
    so: {
      type: Number,
      required: this.year > 3,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
