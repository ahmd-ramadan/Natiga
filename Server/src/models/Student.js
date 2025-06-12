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
    place: {
      type: Number,
      required: true
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
      required: true,
    },
    so: {
      type: Number,
      required: true,
    },
    be: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
