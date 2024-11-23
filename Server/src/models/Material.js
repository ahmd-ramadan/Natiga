const mongoose = require("mongoose");
const materialSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    percent: {
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

module.exports = mongoose.model("Material", materialSchema);
